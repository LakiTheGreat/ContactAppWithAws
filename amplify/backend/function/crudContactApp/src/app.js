/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
const { randomUUID } = require("crypto");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

let region = "us-east-1";

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
const s3Client = new S3Client({ region: region });

let tableName = "Contacts";
let bucketName = "images141736-dev";

if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const userIdPresent = true;
const partitionKeyName = "userId";
const partitionKeyType = "S";
const sortKeyName = "contactId";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/contacts";
const UNAUTH = "UNAUTH";
const hashKeyPath = "/:" + partitionKeyName;
const sortKeyPath = hasSortKey ? "/:" + sortKeyName : "";

const PRESIGNED_URL_EXPIRATION_SECONDS = 300;

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
};

//userId = userName from cognito
const getUserIdFromRequest = (req) => {
  const userId =
    req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider.split(
      ":CognitoSignIn:"
    )[1];
  return userId;
};

const getPresignedUrl = async (key, cognitoIdentityId) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      // Key: `public/${key}`,
      Key: `private/${cognitoIdentityId}/${key}`,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: PRESIGNED_URL_EXPIRATION_SECONDS,
    });

    return presignedUrl;
  } catch (error) {
    console.error("Error getting presigned URL:", error);
    throw error;
  }
};
/************************************
 * HTTP Get method to list objects *
 ************************************/

app.get(path, async function (req, res) {
  const userId = getUserIdFromRequest(req);
  const cognitoIdentityId =
    req.apiGateway.event.requestContext.identity.cognitoIdentityId;

  var params = {
    TableName: tableName,
    Select: "ALL_ATTRIBUTES",
    ExpressionAttributeNames: {
      "#key": "userId",
    },
    ExpressionAttributeValues: {
      ":keyValue": userId,
    },
    KeyConditionExpression: "#key = :keyValue",
    ScanIndexsForward: true,
  };

  try {
    const data = await ddbDocClient.send(new QueryCommand(params));
    const itemsWithPresignedUrl = await Promise.all(
      data.Items.map(async (item) => {
        if (item.image !== "") {
          const presignedUrl = await getPresignedUrl(
            item.image,
            cognitoIdentityId
          );
          return { ...item, image: presignedUrl, imageKey: item.image };
        } else {
          return { ...item, image: "", imageKey: "" };
        }
      })
    );
    res.json(itemsWithPresignedUrl);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Could not load items: " + err.message });
  }
});

/************************************
 * HTTP Get method to query objects *
 ************************************/

app.get(path + hashKeyPath, async function (req, res) {
  const condition = {};
  condition[partitionKeyName] = {
    ComparisonOperator: "EQ",
  };

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]["AttributeValueList"] = [
      req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH,
    ];
  } else {
    try {
      condition[partitionKeyName]["AttributeValueList"] = [
        convertUrlType(req.params[partitionKeyName], partitionKeyType),
      ];
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: "Wrong column type " + err });
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition,
  };

  try {
    const data = await ddbDocClient.send(new QueryCommand(queryParams));

    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Could not load items: " + err.message });
  }
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

// /contacts/object/:contactId
app.get(path + "/object" + sortKeyPath, async function (req, res) {
  const userId = getUserIdFromRequest(req);
  const cognitoIdentityId =
    req.apiGateway.event.requestContext.identity.cognitoIdentityId;
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = userId || UNAUTH;
  } else {
    params[partitionKeyName] = userId;
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(
        req.params[sortKeyName],
        sortKeyType
      );
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: "Wrong column type " + err });
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params,
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(getItemParams));
    if (data.Item) {
      if (data.Item.image !== "") {
        const presignedUrl = await getPresignedUrl(
          data.Item.image,
          cognitoIdentityId
        );
        const itemWithPresignedUrl = {
          ...data.Item,
          image: presignedUrl,
          imageKey: data.Item.image,
        };
        res.json(itemWithPresignedUrl);
      } else {
        const itemWithoutPresignedUrl = {
          ...data.Item,
          image: "",
          imageKey: "",
        };
        res.json(itemWithoutPresignedUrl);
      }
    } else {
      res.json(data);
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Could not load items: " + err.message });
  }
});

/************************************
 * HTTP put method for insert object *
 *************************************/

// /contacts
app.put(path, async function (req, res) {
  const userId = getUserIdFromRequest(req);
  if (userIdPresent) {
    req.body["userId"] = userId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body,
  };
  try {
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.json({ success: "put call succeed!", url: req.url, data: data });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

/************************************
 * HTTP post method for insert object *
 *************************************/
// /contacts
app.post(path, async function (req, res) {
  const contactId = randomUUID();
  const userId =
    req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider.split(
      ":CognitoSignIn:"
    )[1];

  if (userIdPresent) {
    req.body["userId"] = userId || UNAUTH;
  }

  const contact = req.body;
  const updatedContact = {
    ...contact,
    contactId,
    userId,
  };

  let putItemParams = {
    TableName: tableName,
    Item: updatedContact,
  };
  try {
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.json({ success: "post call succeed!", url: req.url, data: data });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

/**************************************
 * HTTP remove method to delete object *
 ***************************************/
// /contacts/object/:contactId
app.delete(
  path + "/object" + sortKeyPath,
  // path + "/object" + hashKeyPath + sortKeyPath,
  async function (req, res) {
    const userId = getUserIdFromRequest(req);
    const params = {};

    if (userIdPresent && req.apiGateway) {
      params[partitionKeyName] = userId || UNAUTH;
    } else {
      params[partitionKeyName] = req.params[partitionKeyName];
      try {
        params[partitionKeyName] = convertUrlType(
          req.params[partitionKeyName],
          partitionKeyType
        );
      } catch (err) {
        res.statusCode = 500;
        res.json({ error: "Wrong column type " + err });
        return; // Stop execution if there's an error
      }
    }

    if (hasSortKey) {
      try {
        params[sortKeyName] = convertUrlType(
          req.params[sortKeyName],
          sortKeyType
        );
      } catch (err) {
        res.statusCode = 500;
        res.json({ error: "Wrong column type " + err });
        return; // Stop execution if there's an error
      }
    }

    // Check if the item exists before attempting to delete
    const getItemParams = {
      TableName: tableName,
      Key: params,
    };

    try {
      const getItemResult = await ddbDocClient.send(
        new GetCommand(getItemParams)
      );

      if (!getItemResult.Item) {
        // Item does not exist, handle accordingly
        res.statusCode = 404;
        res.json({ error: "Item not found", url: req.url });
        return; // Stop execution if the item does not exist
      }

      // Item exists, proceed with deletion
      let removeItemParams = {
        TableName: tableName,
        Key: params,
      };

      let data = await ddbDocClient.send(new DeleteCommand(removeItemParams));
      res.json({ url: req.url, data: data });
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url });
    }
  }
);

// /contacts/deleteMany

app.post(path + "/deleteMany", async function (req, res) {
  const userId = getUserIdFromRequest(req);
  const selectedIds = req.body;

  const deleteOneContact = async (userId, contactId) => {
    const params = {
      TableName: tableName,
      Key: {
        [partitionKeyName]: userId || UNAUTH,
        [sortKeyName]: contactId,
      },
    };

    try {
      // Check if the item exists before attempting to delete
      const getItemResult = await ddbDocClient.send(new GetCommand(params));

      if (!getItemResult.Item) {
        // Item does not exist, handle accordingly
        return { success: false, contactId, error: "Item not found" };
      }

      // Item exists, proceed with deletion
      await ddbDocClient.send(new DeleteCommand(params));
      return { success: true, contactId };
    } catch (error) {
      return { success: false, contactId, error: error.message };
    }
  };

  try {
    const results = await Promise.all(
      selectedIds.map((contactId) => deleteOneContact(userId, contactId))
    );

    // Check if all promises were fulfilled successfully
    const allFulfilled = results.every((result) => result.success);

    if (allFulfilled) {
      return res.json({ data: results });
    } else {
      // Some promises were rejected, handle the errors
      const errors = results.filter((result) => !result.success);
      console.error("Error deleting contacts:", errors);
      return res.status(500).json({ error: "Some deletions failed", errors });
    }
  } catch (error) {
    console.error("Error deleting contacts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.post(path + "/deleteMany", async function (req, res) {
//   const userId = getUserIdFromRequest(req);
//   const selectedIds = req.body;

//   // Move the deleteOneContact function declaration above its usage
//   const deleteOneContact = async (userId, contactId) => {
//     const params = {};
//     params[partitionKeyName] = userId || UNAUTH;
//     params[sortKeyName] = contactId;

//     let removeItemParams = {
//       TableName: tableName,
//       Key: params,
//     };
//     return await ddbDocClient.send(new DeleteCommand(removeItemParams));
//   };

//   const deletePromises = selectedIds.map((contactId) =>
//     deleteOneContact(userId, contactId)
//   );

//   try {
//     const results = await Promise.all(deletePromises);
//     return res.json({ data: results });
//   } catch (error) {
//     console.error("Error deleting contacts:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
