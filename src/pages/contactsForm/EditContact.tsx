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

  const isSuccess = false; ///////////////////////////////////////////////////////

  if (isLoading) {
    return <LoadingScreen />;
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
          isFavorite: data.isFavorite,
          labels: data.labels,
        }}
      />
    </Page>
  );
}
