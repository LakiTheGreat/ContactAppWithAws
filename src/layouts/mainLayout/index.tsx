import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import DashboardHeader from "layouts/header";
import NavbarHorizontal from "./navbar/NavbarHorizontal";

import { HEADER } from "config";

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
