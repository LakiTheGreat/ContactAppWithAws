/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import { IconButtonAnimate } from "./animate";

type Props = {
  onFavorite: (value: any) => void;
  onDelete: (value: any) => void;
  onEdit: (value: any) => void;
  isFavorite: boolean;
};

type Action = {
  label: string;
  icon: ReactNode;
  handler: (value: any) => void;
};

export default function DataGridRowActions({
  onFavorite,
  onDelete,
  onEdit,
  isFavorite,
}: Props) {
  let actionList: Action[] = [
    {
      label: "favorite",
      icon: isFavorite ? <StarIcon /> : <StarOutlineIcon />,
      handler: onFavorite,
    },
    { label: "delete", icon: <DeleteOutlineIcon />, handler: onDelete },
    { label: "edit", icon: <ModeEditOutlineOutlinedIcon />, handler: onEdit },
  ];

  return (
    <Stack direction="row" flex={1}>
      {actionList.map(({ label, icon, handler }) => (
        <IconButtonAnimate key={label} aria-label={label} onClick={handler}>
          {icon}
        </IconButtonAnimate>
      ))}
    </Stack>
  );
}
