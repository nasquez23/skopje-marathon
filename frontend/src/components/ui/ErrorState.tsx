import { Alert, Box } from "@mui/material";
import { getErrorMessage, getErrorSeverity } from "../../utils/error-handler";

interface ErrorStateProps {
  error: unknown;
  title?: string;
  fullHeight?: boolean;
  sx?: object;
}

export default function ErrorState({
  error,
  title = "Something went wrong",
  fullHeight = false,
  sx = {},
}: ErrorStateProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      py={fullHeight ? 8 : 4}
      minHeight={fullHeight ? "40vh" : "auto"}
      sx={sx}
    >
      <Alert severity={getErrorSeverity(error)} sx={{ maxWidth: 600 }}>
        {title}: {getErrorMessage(error)}
      </Alert>
    </Box>
  );
}
