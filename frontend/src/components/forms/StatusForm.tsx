import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Alert, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getErrorMessage, getErrorSeverity } from "../../utils/error-handler";

interface StatusFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  error?: unknown;
  helperText?: string;
  buttonText?: string;
  disabled?: boolean;
}

export default function StatusForm({
  onSubmit,
  isSubmitting = false,
  error,
  helperText = "Example: jane.doe@email.com or REG-1234ABCD",
  buttonText = "Check",
  disabled = false,
}: StatusFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Email or Registration Number"
          name="search"
          placeholder="Enter email or registration number"
          fullWidth
          disabled={disabled}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          helperText={helperText}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting || disabled}
        >
          {isSubmitting ? "Checking..." : buttonText}
        </Button>

        {!!error && (
          <Alert severity={getErrorSeverity(error)}>
            {getErrorMessage(error)}
          </Alert>
        )}
      </Stack>
    </form>
  );
}
