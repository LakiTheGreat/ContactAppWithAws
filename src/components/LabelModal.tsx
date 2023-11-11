import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";

import { useCreateLabelMutation } from "api/labels";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export default function LabelModal({ isOpen, handleClose }: Props) {
  const [labelName, setLabelName] = useState<string>("");
  const [createLabel, { data, isLoading }] = useCreateLabelMutation(undefined);

  const handleCreatelabel = () => {
    createLabel(labelName);
  };

  useEffect(() => {
    data && handleClose();
  }, [data]);

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
          width: "500px",
          padding: "20px",
          borderBottom: "solid 20px white",
        }}
      >
        <Stack gap={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create label
          </Typography>
          <TextField
            id="outlined-basic"
            label="Enter label name"
            variant="outlined"
            fullWidth
            onChange={(e) => setLabelName(e.target.value)}
          />
          <Stack direction="row" justifyContent="flex-end" gap={1}>
            <Button
              onClick={handleClose}
              variant="outlined"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <LoadingButton
              onClick={handleCreatelabel}
              variant="contained"
              disabled={!labelName.length}
              loading={isLoading}
            >
              Save
            </LoadingButton>
          </Stack>
        </Stack>
      </Card>
    </Modal>
  );
}
