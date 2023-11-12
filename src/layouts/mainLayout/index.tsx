import { Outlet } from "react-router-dom";
// import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// import useCollapseDrawer from "hooks/useCollapseDrawer";
import { HEADER } from "config";

// import NavbarVertical from "./navbar/NavbarVertical";
import DashboardHeader from "layouts/header";
import NavbarHorizontal from "./navbar/NavbarHorizontal";

// type MainStyleProps = {
//   collapseClick: boolean;
// };

// const MainStyle = styled("main", {
//   shouldForwardProp: (prop) => prop !== "collapseClick",
// })<MainStyleProps>(({ collapseClick, theme }) => ({
//   height: "100%",
//   flexGrow: 1,
//   paddingTop: HEADER.MOBILE_HEIGHT + 24,
//   paddingBottom: HEADER.MOBILE_HEIGHT + 24,
//   paddingLeft: 16,
//   paddingRight: 16,
//   [theme.breakpoints.up("lg")]: {
//     paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT,
//     paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT,
//     width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
//     transition: theme.transitions.create("margin-left", {
//       duration: theme.transitions.duration.shorter,
//     }),
//     ...(collapseClick && {
//       marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
//     }),
//   },
// }));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  return (
    <>
      <DashboardHeader />

      <NavbarHorizontal />

      <Box
        component="main"
        sx={{
          height: "100%",
          px: { lg: 2 },
          pt: {
            xs: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 180}px`,
            sm: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
          },
          pb: {
            xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
            lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
          },
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
