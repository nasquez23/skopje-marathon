import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  title?: string;
  action?: ReactNode;
  sx?: object;
}

export default function PageContainer({
  children,
  maxWidth = "xl",
  title,
  action,
  sx = {},
}: PageContainerProps) {
  return (
    <Container maxWidth={maxWidth} sx={{ my: 6, width: "95%", mx: "auto", ...sx }}>
      {(title || action) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          {title && (
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, mb: 2, color: "black" }}
            >
              {title}
            </Typography>
          )}
          {action}
        </Box>
      )}
      {children}
    </Container>
  );
}
