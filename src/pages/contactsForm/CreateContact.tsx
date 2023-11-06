import Page from "components/Page";
import ContactForm from "./ContactForm";
import { SingeContactFormValues } from "__mocks__/types";

export default function CreateContact() {
  const handleCreate = (value: SingeContactFormValues) => {
    console.log("Create contact:", value);
  };
  return (
    <Page title="Create new contact">
      <ContactForm title="Create new contact" onSubmit={handleCreate} />
    </Page>
  );
}
