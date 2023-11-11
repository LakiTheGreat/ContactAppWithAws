import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";

import Page from "components/Page";
import ContactForm from "./ContactForm";

import { useEditContactMutation, useGetContactByIdQuery } from "api/contacts";
import LoadingScreen from "components/LoadingScreen";
import { SingeContactFormValues, SingleContact } from "types";
import Page404 from "components/Page404";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useGetAllLabelsQuery } from "api/labels";

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

  const handleEdit = (value: SingeContactFormValues) => {
    if (!data) return;
    const contact: SingleContact = {
      ...value,
      isFavorite: data.isFavorite,
      userId: data.userId,
      contactId: data.contactId,
    };
    editContact(contact);
  };

  const isSuccess = editContactData?.data.$metadata.httpStatusCode === 200;

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
        isLoading={editContactIsLoading}
        isSuccess={isSuccess}
        value={{
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          labels: data?.labels,
        }}
        labelObjects={labelData}
        labelDataIsLoading={labelDataIsLoading}
      />
    </Page>
  );
}
