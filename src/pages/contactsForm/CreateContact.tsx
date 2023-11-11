import { useSnackbar } from "notistack";
import { useEffect } from "react";

import Page from "components/Page";
import ContactForm from "./ContactForm";
import { SingeContactFormValues, UnsavedSingleContact } from "types";
import { useCreateContactMutation } from "api/auth";

export default function CreateContact() {
  const [createContact, { data, isLoading }] = useCreateContactMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleCreate = (value: SingeContactFormValues) => {
    const unsavedContact: UnsavedSingleContact = {
      ...value,
      isFavorite: false,
    };

    createContact(unsavedContact);
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
