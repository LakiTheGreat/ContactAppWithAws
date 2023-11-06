import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export default function LabelModal({ isOpen, handleClose }: Props) {
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
          />
          <Stack direction="row" justifyContent="flex-end" gap={1}>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleClose} variant="contained">
              Save
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Modal>
  );
}
