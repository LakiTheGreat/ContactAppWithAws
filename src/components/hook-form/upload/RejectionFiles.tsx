import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { FileRejection } from "react-dropzone";

import { CustomFile } from "./type";

type Props = {
  fileRejections: FileRejection[];
};

export default function RejectionFiles({ fileRejections }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: "error.light",
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size }: CustomFile = file;

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {size}
            </Typography>

            {errors.map((error) => (
              <Typography key={error.code} variant="caption" component="p">
                {error.code === "file-too-large"
                  ? `Image size is too big`
                  : `- ${error.message}`}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
}
