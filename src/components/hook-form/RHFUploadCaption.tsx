import Typography from "@mui/material/Typography";

export default function RHFUploadCaption() {
  // const maxSize = 3000000;
  return (
    <Typography
      variant="caption"
      textAlign="center"
      sx={{ mt: 2, display: "flex", color: "text" }}
    >
      "Allowed formats: *.jpeg, *.jpg, *.png, *.dng"
      {/* <br /> "Max size" {maxSize} */}
    </Typography>
  );
}
