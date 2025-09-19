import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

interface FormCardProps {
  children: ReactNode;
  title?: string;
  elevation?: number;
  sx?: object;
}

export default function FormCard({
  children,
  title,
  elevation = 5,
  sx = {},
}: FormCardProps) {
  return (
    <Paper elevation={elevation} sx={{ p: 4, borderRadius: 3, ...sx }}>
      {title && (
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
}
