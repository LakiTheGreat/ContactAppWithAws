import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import useResponsive from "../../../hooks/useResponsive";
import useCollapseDrawer from "../../../hooks/useCollapseDrawer";
import cssStyles from "../../../utils/cssStyles";
// import { NavSectionVertical } from "../../../components/nav-section";
import CollapseButton from "./CollapseButton";
import { NAVBAR } from "../../../config";
import { CONTACTS_ROUTES } from "routes/paths";
import Logo from "components/Logo";
import LabelModal from "components/LabelModal";
import { signOut } from "api/asyncFunctions";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function NavbarVertical({
  isOpenSidebar,
  onCloseSidebar,
}: Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isDesktop = useResponsive("up", "lg");
  // const navConfig = navConfigFunction();

  const handleCreateNewLabel = () => {
    setIsOpen(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Stack>
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,

          flexShrink: 0,
          ...(isCollapse && { alignItems: "center" }),
        }}
      >
        <Stack
          direction={isCollapse ? "column" : "row"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" gap={2} alignItems="center">
            <Logo disabledLink sx={{ width: 33, height: 33 }} />
            {!isCollapse && <Typography variant="h6">Contacts</Typography>}
          </Stack>
          {isDesktop && !isCollapse && (
            <CollapseButton
              aria-label="collapse"
              onToggleCollapse={onToggleCollapse}
              collapseClick={collapseClick}
            />
          )}
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ ml: 3 }}>
        {!isCollapse && (
          <Stack direction="row" gap={1}>
            <Button
              sx={{ width: "fit-content" }}
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => navigate(CONTACTS_ROUTES.new)}
            >
              Create contact
            </Button>
            <Button
              sx={{ width: "fit-content" }}
              variant="outlined"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        )}
      </Stack>

      {/* <NavSectionVertical navConfig={navConfig} isCollapse={isCollapse} /> */}

      {!isCollapse && (
        <Button
          onClick={handleCreateNewLabel}
          startIcon={<AddIcon />}
          variant="text"
        >
          Create new label
        </Button>
      )}
      <LabelModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
      <Box sx={{ flexGrow: 1 }} />
    </Stack>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse
            ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
            : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: "absolute",
        }),
      }}
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: "dashed",
              bgcolor: "background.default",
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
