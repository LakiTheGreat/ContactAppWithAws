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
import { HEADER, NAVBAR } from "config";
// import Logo from "components/Logo";
import Logo from "components/Logo";
import { signOut } from "api/asyncFunctions/contacts";
import { useAppSelector } from "hooks/storeHooks";

// ----------------------------------------------------------------------

type RootStyleProps = {
  isCollapse: boolean;
  isOffset: boolean;
  verticalLayout: boolean;
};

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== "isCollapse" && prop !== "isOffset" && prop !== "verticalLayout",
})<RootStyleProps>(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: "none",
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("lg")]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: "100%",
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  onOpenSidebar: VoidFunction;
  isCollapse?: boolean;
  verticalLayout?: boolean;
};

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}: Props) {
  const isOffset =
    useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  // const isDesktop = useResponsive("up", "lg");
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
      isCollapse={isCollapse}
      isOffset={isOffset}
      verticalLayout={verticalLayout}
    >
      <Toolbar
        sx={{
          minHeight: "100% !important",
          px: { lg: 5 },
        }}
      >
        {/* {isDesktop && verticalLayout && ( */}
        {verticalLayout && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%", mt: 1 }}
            gap={1}
          >
            <Stack direction="row" gap={1} alignItems="center">
              <Logo disabledLink sx={{ width: 40, height: 40 }} />
              <Typography color={theme.palette.grey[800]} variant="h3">
                {`ContactApp`}
              </Typography>
              {username && (
                <Typography color={theme.palette.grey[800]} variant="h6">
                  {`- ${username}`}
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
        )}
        {/* 
        {!isDesktop && (
          <IconButtonAnimate
            aria-label="open"
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )} */}

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </RootStyle>
  );
}
