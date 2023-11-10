import { useSnackbar } from "notistack";
import Page from "components/Page";
import ContactForm from "./ContactForm";
import { SingeContactFormValues } from "__mocks__/types";
import { useCreateContactMutation } from "api/auth";
import { useEffect } from "react";

export default function CreateContact() {
  const [createContact, { data, isLoading }] = useCreateContactMutation();
  const { enqueueSnackbar } = useSnackbar();
  const handleCreate = (value: SingeContactFormValues) => {
    createContact(value);
  };

  const isSuccess = data?.data.$metadata.httpStatusCode === 200;

  useEffect(() => {
    isSuccess &&
      enqueueSnackbar("Contact successfully created", {
        variant: "success",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Page title="Create new contact">
      <ContactForm
        title="Create new contact"
        onSubmit={handleCreate}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </Page>
  );
}
