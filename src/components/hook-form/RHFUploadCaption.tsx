import Typography from "@mui/material/Typography";

import { fData } from "utils/formatNumber";

export default function RHFUploadCaption() {
  const maxSize = fData(3000000);
  return (
    <Typography
      variant="caption"
      sx={{ mt: 2, display: "flex", justifyContent: "center", color: "text" }}
    >
      {`"photo.maxSize", ${maxSize}`}
    </Typography>
  );
}
