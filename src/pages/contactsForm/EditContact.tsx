import { useParams } from "react-router-dom";

import Page from "components/Page";
import ContactForm from "./ContactForm";
import { SingeContactFormValues } from "__mocks__/types";

export default function EditContact() {
  const { id } = useParams();

  const handleEdit = (value: SingeContactFormValues) => {
    console.log("Edit contact:", value);
  };

  return (
    <Page title="Edit contact">
      <ContactForm
        title="Edit contact"
        onSubmit={handleEdit}
        // value={contactForEdit} //PASS DATA
      />
    </Page>
  );
}
