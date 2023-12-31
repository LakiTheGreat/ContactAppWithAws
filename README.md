# Contact App

This serves as an illustration of an application featuring straightforward business logic. The emphasis throughout the entire project was on leveraging AWS technologies. The focus wasn't directed towards UI/UX or comprehensive functionality, but rather on showcasing the seamless integration of fundamental AWS services—a valuable reference for future projects.

You can test the deployed app on this url: https://master.d1e71nawn2eyw0.amplifyapp.com/

### What AWS services were implemented?

1. Amplify: This versatile tool seamlessly manages various AWS services, providing robust capabilities for authorization, authentication, and CI/CD processes.
2. API Gateway: Integral to the system, it facilitates streamlined access to resources within databases.
3. Cognito: Serving as the user pool manager, Cognito ensures secure and efficient user authentication.
4. IAM: Utilized for crafting roles and policies, IAM enhances access control and security measures.
5. DynamoDB: This dynamic database solution excels in storing and retrieving data swiftly and efficiently.
6. Lambda: At the core of backend services, Lambda offers scalability and an event-driven architecture for optimal performance.
7. CodeCommit: Functioning as the repository for code, CodeCommit integrates seamlessly with Amplify, playing a key role in the CI/CD pipeline.
8. CloudWatch: Monitoring the usage of resources and data in the app.
9. S3: For storing contact images.
10. SNS: For faning out messages to SQS and to process SQS messages.
11. SQS: For queueing messages (decoupling of lambdas for creating contact and sending message to the admin about it).

### Other important technology?

1.  React Toolkit Query: that is used for async calling of Amplify CRUD functions anc caching the results.

In the project directory root folder (CONTACTAPP), you can run:

### `npm install`

and then:

### `npm start`

Open [http://localhost:3000](http://localhost:3000)
