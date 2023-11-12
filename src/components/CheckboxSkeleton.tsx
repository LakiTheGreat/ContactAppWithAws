import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export default function CheckboxSkeleton() {
  const width = 252;
  return (
    <Stack sx={{ pt: 2 }} gap={2}>
      <Skeleton variant="rounded" width={width} height={22} />
      <Skeleton variant="rounded" width={width} height={22} />
      <Skeleton variant="rounded" width={width} height={22} />
      <Skeleton variant="rounded" width={width} height={22} />
      <Skeleton variant="rounded" width={width} height={22} />
    </Stack>
  );
}
