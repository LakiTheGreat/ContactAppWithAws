import { useSnackbar } from "notistack";
import { useEffect } from "react";

import Page from "components/Page";
import { useCreateContactMutation } from "api/contacts";
import { useGetAllLabelsQuery } from "api/labels";

import { SingeContactFormValues, UnsavedSingleContact } from "types";
import ContactForm from "./ContactForm";

export default function CreateContact() {
  const [createContact, { data, isLoading, isError }] =
    useCreateContactMutation();
  const { data: labelData, isLoading: labelDataIsLoading } =
    useGetAllLabelsQuery(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const handleCreate = (value: SingeContactFormValues) => {
    const unsavedContact: UnsavedSingleContact = {
      ...value,
      isFavorite: false,
    };

    createContact(unsavedContact);
  };

  const isSuccess = data;

  useEffect(() => {
    data &&
      enqueueSnackbar("Contact successfully created", {
        variant: "success",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    isError &&
      enqueueSnackbar("Contact was not created. Something went wrong!", {
        variant: "error",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <Page title="Create new contact">
      <ContactForm
        title="Create new contact"
        onSubmit={handleCreate}
        isLoading={isLoading}
        isSuccess={isSuccess}
        labelObjects={labelData}
        labelDataIsLoading={labelDataIsLoading}
      />
    </Page>
  );
}
