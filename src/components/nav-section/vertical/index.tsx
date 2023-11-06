import { List, Box, ListSubheader, useTheme } from "@mui/material";

import { NavSectionProps } from "../type";
import { NavListRoot } from "./NavList";

export default function NavSectionVertical({
  navConfig,
  isCollapse = false,
  ...other
}: NavSectionProps) {
  const theme = useTheme();
  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <List
          key={group.subheader}
          disablePadding
          sx={{ px: 2 }}
          subheader={
            <ListSubheader
              sx={{
                "&.MuiListSubheader-root": {
                  ...theme.typography.overline,
                  opacity: isCollapse ? 0 : 1,
                  paddingTop: theme.spacing(3),
                  paddingLeft: theme.spacing(2),
                  paddingBottom: theme.spacing(1),
                  color: theme.palette.text.primary,
                  transition: theme.transitions.create("opacity", {
                    duration: theme.transitions.duration.shorter,
                  }),
                },
              }}
              component="div"
            >
              {`${group.subheader}`}
            </ListSubheader>
          }
        >
          {group.items.map((list) => (
            <NavListRoot key={list.title} list={list} isCollapse={isCollapse} />
          ))}
        </List>
      ))}
    </Box>
  );
}
