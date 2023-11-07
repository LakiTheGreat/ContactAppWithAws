import { Helmet } from "react-helmet-async";
import { forwardRef, ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = "", meta, ...other }, ref) => (
    <>
      <Helmet>
        <title>{`${title} | ContactApp`}</title>
        {meta}
      </Helmet>

      <Box ref={ref} {...other} sx={{ height: "100%" }}>
        {children}
      </Box>
    </>
  )
);

export default Page;
