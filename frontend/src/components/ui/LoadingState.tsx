import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "medium" | "large";
  fullHeight?: boolean;
}

export default function LoadingState({
  message = "Loading...",
  size = "medium",
  fullHeight = false,
}: LoadingStateProps) {
  const sizeMap = {
    small: 20,
    medium: 40,
    large: 60,
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={fullHeight ? 8 : 4}
      minHeight={fullHeight ? "40vh" : "auto"}
    >
      <CircularProgress size={sizeMap[size]} />
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
