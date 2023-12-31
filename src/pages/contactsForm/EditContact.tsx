import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";

import Page from "components/Page";
import {
  useEditContactMutation,
  useGetContactByIdQuery,
  useUploadImageToS3Mutation,
} from "api/contacts";
import LoadingScreen from "components/LoadingScreen";
import Page404 from "components/Page404";
import { useGetAllLabelsQuery } from "api/labels";

import { SingeContactFormValues, SingleContact } from "types";
import ContactForm from "./ContactForm";
import { imageResizer } from "utils/imageResizer";

export default function EditContact() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading } = useGetContactByIdQuery(id ?? skipToken);
  const { data: labelData, isLoading: labelDataIsLoading } =
    useGetAllLabelsQuery(undefined);

  const [
    editContact,
    { data: editContactData, isLoading: editContactIsLoading },
  ] = useEditContactMutation();

  const [uploadImageToS3, { isLoading: imageIsLoading }] =
    useUploadImageToS3Mutation();

  const handleEdit = async (value: SingeContactFormValues) => {
    if (!data) return;
    if (!value.imageForUpload) {
      const { imageForUpload, imageKey, ...rest } = value;
      const contact: any = {
        ...rest,
        image: value.image.length ? data.imageKey : "", // if image is removed in form
        isFavorite: data.isFavorite,
        userId: data.userId,
        contactId: data.contactId,
      };

      editContact(contact);
    }

    if (value.imageForUpload) {
      const resizedImage = await imageResizer(value.imageForUpload);
      const res = await uploadImageToS3(resizedImage);

      if ("data" in res) {
        const contact: SingleContact = {
          ...value,
          image: res.data,
          isFavorite: data.isFavorite,
          userId: data.userId,
          contactId: data.contactId,
        };

        editContact(contact);
      }
    }
  };

  const isSuccess = editContactData?.data.$metadata.httpStatusCode === 200;
  const somethingIsLoading = imageIsLoading || editContactIsLoading;

  useEffect(() => {
    isSuccess &&
      enqueueSnackbar("Contact successfully edited", {
        variant: "success",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <Page404 />;
  }

  return (
    <Page title="Edit contact">
      <ContactForm
        title="Edit contact"
        onSubmit={handleEdit}
        isLoading={somethingIsLoading}
        isSuccess={isSuccess}
        value={{
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          labels: data?.labels,
          image: data?.image,
          imageKey: data.imageKey,
        }}
        labelObjects={labelData}
        labelDataIsLoading={labelDataIsLoading}
      />
    </Page>
  );
}
