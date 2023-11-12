import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import useOffSetTop from "hooks/useOffSetTop";
import cssStyles from "utils/cssStyles";
import { HEADER } from "config";
import Logo from "components/Logo";
import { signOut } from "api/asyncFunctions/contacts";
import { useAppSelector } from "hooks/storeHooks";
import useResponsive from "hooks/useResponsive";

// ----------------------------------------------------------------------

type RootStyleProps = {
  isOffset: boolean;
};

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isOffset" && prop !== "verticalLayout",
})<RootStyleProps>(({ isOffset, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: "none",

  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("lg")]: {
    width: "100%",
    height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    backgroundColor: theme.palette.background.default,
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardHeader() {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT);

  const isMobile = useResponsive("down", "sm");
  const theme = useTheme();
  const username = useAppSelector((state) => state.user.authUser?.username);

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RootStyle
      isOffset={isOffset}
      sx={{
        height: isMobile ? HEADER.MOBILE_HEIGHT + 140 : HEADER.MOBILE_HEIGHT,
      }}
    >
      <Toolbar
        sx={{
          minHeight: "100% !important",
          px: { lg: 5 },
        }}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%", mt: 1 }}
          gap={1}
        >
          <Stack
            direction={isMobile ? "column" : "row"}
            gap={1}
            alignItems="center"
          >
            <Logo disabledLink sx={{ width: 40, height: 40 }} />
            <Typography color={theme.palette.grey[800]} variant="h3">
              {`ContactApp`}
            </Typography>
            {username && (
              <Typography color={theme.palette.grey[800]} variant="h6">
                {!isMobile ? "- " : ""}
                {`${username}`}
              </Typography>
            )}
          </Stack>
          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </RootStyle>
  );
}
