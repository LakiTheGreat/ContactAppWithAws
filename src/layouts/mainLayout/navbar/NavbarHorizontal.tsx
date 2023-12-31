import { memo } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";

import { HEADER } from "../../../config";
import { NavSectionHorizontal } from "../../../components/nav-section";
import useResponsive from "hooks/useResponsive";

import { navConfigFunction } from "./NavConfig";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  transition: theme.transitions.create("top", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  width: "100%",
  position: "fixed",
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1, 0),
  boxShadow: theme.customShadows.z8,

  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

function NavbarHorizontal() {
  const navConfig = navConfigFunction();
  const isMobile = useResponsive("down", "sm");
  return (
    <RootStyle
      sx={{
        top: isMobile
          ? HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT + 140
          : HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      }}
    >
      <Container maxWidth={false}>
        <NavSectionHorizontal navConfig={navConfig} />
      </Container>
    </RootStyle>
  );
}

export default memo(NavbarHorizontal);
