import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import useResponsive from "hooks/useResponsive";
import useCollapseDrawer from "hooks/useCollapseDrawer";
import { HEADER, NAVBAR } from "config";

import NavbarVertical from "./navbar/NavbarVertical";
import DashboardHeader from "layouts/header";
import NavbarHorizontal from "./navbar/NavbarHorizontal";

type MainStyleProps = {
  collapseClick: boolean;
};

const MainStyle = styled("main", {
  shouldForwardProp: (prop) => prop !== "collapseClick",
})<MainStyleProps>(({ collapseClick, theme }) => ({
  height: "100%",
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  paddingLeft: 16,
  paddingRight: 16,
  [theme.breakpoints.up("lg")]: {
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create("margin-left", {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { collapseClick, isCollapse } = useCollapseDrawer();

  const isDesktop = useResponsive("up", "lg");

  const [open, setOpen] = useState(false);

  const verticalLayout = true;

  if (verticalLayout) {
    return (
      <>
        <DashboardHeader
          onOpenSidebar={() => setOpen(true)}
          verticalLayout={verticalLayout}
        />

        {isDesktop ? (
          <NavbarHorizontal />
        ) : (
          <NavbarVertical
            isOpenSidebar={open}
            onCloseSidebar={() => setOpen(false)}
          />
        )}

        <Box
          component="main"
          sx={{
            height: "100%",
            px: { lg: 2 },
            pt: {
              xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
              lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
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

  return (
    <Box
      sx={{
        display: { lg: "flex" },
        height: "100%",
      }}
    >
      <DashboardHeader
        isCollapse={isCollapse}
        onOpenSidebar={() => setOpen(true)}
      />

      <NavbarVertical
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />

      <MainStyle collapseClick={collapseClick}>
        <Outlet />
      </MainStyle>
    </Box>
  );
}
