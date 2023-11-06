import { useParams } from "react-router-dom";

import Page from "components/Page";
import ContactForm from "./ContactForm";
import { SingeContactFormValues } from "__mocks__/types";
import mockedContacts from "__mocks__/mockedContacts.json";

export default function EditContact() {
  const { id } = useParams();

  const handleEdit = (value: SingeContactFormValues) => {
    console.log("Edit contact:", value);
  };

  const contactForEdit = mockedContacts.find((contact) => contact._id === id);

  return (
    <Page title="Edit contact">
      <ContactForm
        title="Edit contact"
        onSubmit={handleEdit}
        value={contactForEdit}
      />
    </Page>
  );
}
