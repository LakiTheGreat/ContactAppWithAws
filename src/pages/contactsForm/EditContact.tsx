import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";

import Page from "components/Page";
import ContactForm from "./ContactForm";

import { useGetContactByIdQuery } from "api/contacts";
import LoadingScreen from "components/LoadingScreen";
import { SingeContactFormValues, SingleContact } from "types";
import Page404 from "components/Page404";

export default function EditContact() {
  const { id } = useParams();
  const { data, isLoading } = useGetContactByIdQuery(id ?? skipToken);

  const handleEdit = (value: SingeContactFormValues) => {
    if (!data) return;
    const contact: SingleContact = {
      ...value,
      isFavorite: data.isFavorite,
      userId: data.userId,
      contactId: data.contactId,
    };
    console.log("Edit contact:", value);
  };

  const isSuccess = false; ///////////////////////////////////////////////////////

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
        isLoading={false}
        isSuccess={isSuccess}
        value={{
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          labels: data?.labels,
        }}
      />
    </Page>
  );
}
