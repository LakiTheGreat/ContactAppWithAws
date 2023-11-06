import { Link as RouterLink } from "react-router-dom";
import { Box, BoxProps } from "@mui/material";

import appLogo from "../assets/logo.svg";

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

export default function Logo({ disabledLink = false, sx }: Props) {
  const logo = (
    <Box
      component="img"
      sx={{ width: 40, height: 40, ...sx }}
      src={appLogo}
      alt="enlight_logo"
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
