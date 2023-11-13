import { useEffect } from "react";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import { useSnackbar } from "notistack";

import { useEditLabelMutation } from "api/labels";
import useResponsive from "hooks/useResponsive";

import { Label, LabelFormValues } from "types";
import LabelForm from "./LabelForm";
interface Props {
  isOpen: boolean;
  handleClose: () => void;
  label: Label | null;
}

export default function EditLabel({ isOpen, handleClose, label }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useResponsive("down", "sm");
  const [editLabel, { data, isLoading, isError }] =
    useEditLabelMutation(undefined);

  const handleEditLabel = (value: LabelFormValues) => {
    if (!label) return;
    editLabel({ ...label, labelName: value.labelName });
  };

  useEffect(() => {
    if (data) {
      enqueueSnackbar("Label was successfully edited.", {
        variant: "success",
      });
      handleClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Label was not updated. Something went wrong!", {
        variant: "error",
      });
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  if (!label) return <></>;

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
          title={"Edit Label"}
          isLoading={isLoading}
          handleClose={handleClose}
          onSubmit={handleEditLabel}
          value={{ labelName: label.labelName }}
        />
      </Card>
    </Modal>
  );
}
