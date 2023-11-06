import { ReactElement, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

const createPromise = (): [Promise<boolean>, (value: boolean) => void] => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let resolver: (value: boolean) => void = () => {};
  const promise = new Promise<boolean>((resolve) => {
    resolver = resolve;
  });
  return [promise, resolver];
};

type ConfirmDialogContent = {
  title: string;
  contentText: string;
  confirmLabel?: string;
  icon?: ReactElement;
  nonWarningModal?: boolean;
};

export default function useConfirmDialog(): [
  (payload: ConfirmDialogContent) => Promise<boolean>,
  () => JSX.Element
] {
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ConfirmDialogContent>();
  const [resolver, setResolver] = useState<{
    resolve: (value: boolean) => void;
  }>();

  const getConfirmation = async (payload: ConfirmDialogContent) => {
    setContent(payload);
    setOpen(true);
    const [promise, resolve] = await createPromise();
    setResolver({ resolve });

    return promise;
  };

  const handleClick = async (status: boolean) => {
    setOpen(false);
    resolver?.resolve(status);
  };

  const Confirmation = () => (
    <Dialog open={open} onClose={() => handleClick(false)}>
      <DialogTitle sx={{ display: "flex", gap: 2, p: 3 }} variant="body1">
        {content?.icon || <DeleteIcon />}

        {content?.title}
      </DialogTitle>
      <DialogContent sx={{ maxWidth: 480, px: 8 }}>
        <DialogContentText fontWeight="600" color="InfoText">
          {content?.contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color={content?.nonWarningModal ? "primary" : "error"}
          variant="contained"
          aria-label="confirm"
          onClick={() => handleClick(true)}
        >
          {content?.confirmLabel || "Confirm"}
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          aria-label="cancel"
          onClick={() => handleClick(false)}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );

  return [getConfirmation, Confirmation];
}
