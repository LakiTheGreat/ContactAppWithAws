import { memo } from "react";
import Stack from "@mui/material/Stack";

import { NavSectionProps } from "../type";
import { NavListRoot } from "./NavList";

const hideScrollbar = {
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
} as const;

function NavSectionHorizontal({ navConfig }: NavSectionProps) {
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ bgcolor: "background.neutral", borderRadius: 1, px: 0.5 }}
      >
        <Stack direction="row" sx={{ ...hideScrollbar, py: 1 }}>
          {navConfig.map((group) => (
            <Stack key={group.subheader} direction="row" flexShrink={0}>
              {group.items.map((list) => (
                <NavListRoot key={list.title} list={list} />
              ))}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default memo(NavSectionHorizontal);
