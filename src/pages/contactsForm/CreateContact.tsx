import { useSnackbar } from "notistack";
import Page from "components/Page";
import ContactForm from "./ContactForm";
import { SingeContactFormValues } from "__mocks__/types";
import { useCreateContactMutation } from "api/auth";
import { useEffect } from "react";

export default function CreateContact() {
  const [createContact, { data }] = useCreateContactMutation();
  const { enqueueSnackbar } = useSnackbar();
  const handleCreate = (value: SingeContactFormValues) => {
    createContact(value);
  };
  console.log(data?.data.$metadata.httpStatusCode);

  useEffect(() => {
    data &&
      enqueueSnackbar("Contact successfully created", {
        variant: "success",
      });
  }, [data]);

  return (
    <Page title="Create new contact">
      <ContactForm title="Create new contact" onSubmit={handleCreate} />
    </Page>
  );
}
