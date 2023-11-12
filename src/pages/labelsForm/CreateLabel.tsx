import { useEffect } from "react";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import { useSnackbar } from "notistack";

import { useCreateLabelMutation } from "api/labels";
import { LabelFormValues } from "types";
import LabelForm from "./LabelForm";
import useResponsive from "hooks/useResponsive";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export default function CreateLabel({ isOpen, handleClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useResponsive("down", "sm");
  const [createLabel, { data, isLoading, isError }] =
    useCreateLabelMutation(undefined);

  const handleCreatelabel = (value: LabelFormValues) => {
    createLabel(value.labelName);
  };

  useEffect(() => {
    if (data) {
      enqueueSnackbar("Contact successfully created", {
        variant: "success",
      });
      handleClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Contact was not created. Something went wrong!", {
        variant: "error",
      });
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <Card
        sx={{
          position: "relative",
          alignItems: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "90%" : "500px",
          padding: "20px",
          borderBottom: "solid 20px white",
        }}
      >
        <LabelForm
          title={"Create Label"}
          isLoading={isLoading}
          handleClose={handleClose}
          onSubmit={handleCreatelabel}
        />
      </Card>
    </Modal>
  );
}
