import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";

import Page from "components/Page";
import ContactForm from "./ContactForm";
import { SingeContactFormValues } from "__mocks__/types";
import { useGetContactByIdQuery } from "api/contacts";
import LoadingScreen from "components/LoadingScreen";

export default function EditContact() {
  const { id } = useParams();
  const { data, isLoading } = useGetContactByIdQuery(id ?? skipToken);

  const handleEdit = (value: SingeContactFormValues) => {
    console.log("Edit contact:", value);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page title="Edit contact">
      <ContactForm
        title="Edit contact"
        onSubmit={handleEdit}
        value={{
          firstName: data[0].firstName,
          lastName: data[0].lastName,
          email: data[0].email,
          phoneNumber: data[0].phoneNumber,
          isFavorite: data[0].isFavorite,
          labels: data[0].labels,
        }}
      />
    </Page>
  );
}
