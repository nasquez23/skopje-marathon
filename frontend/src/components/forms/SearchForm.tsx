import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  label?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export default function SearchForm({
  value,
  onChange,
  placeholder = "Search...",
  helperText,
  label = "Search",
  fullWidth = true,
  disabled = false,
  onKeyDown,
}: SearchFormProps) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      fullWidth={fullWidth}
      disabled={disabled}
      onKeyDown={onKeyDown}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      helperText={helperText}
    />
  );
}
