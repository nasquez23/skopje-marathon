import { Box, Typography, Button } from "@mui/material";
import { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  fullHeight?: boolean;
}

export default function EmptyState({
  title = "No results found",
  description,
  action,
  fullHeight = false,
}: EmptyStateProps) {
  return (
    <Box
      textAlign="center"
      py={fullHeight ? 8 : 4}
      minHeight={fullHeight ? "40vh" : "auto"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      {action}
    </Box>
  );
}
