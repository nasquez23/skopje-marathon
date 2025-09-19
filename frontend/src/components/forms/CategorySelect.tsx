import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import type { Category } from "../../types/participant";
import { formatCategory } from "../../lib/format";

interface CategorySelectProps {
  value: Category | "";
  onChange: (category: Category | "") => void;
  includeAll?: boolean;
  label?: string;
  fullWidth?: boolean;
  required?: boolean;
}

export default function CategorySelect({
  value,
  onChange,
  includeAll = true,
  label = "Category",
  fullWidth = true,
  required = false,
}: CategorySelectProps) {
  const categories: Category[] = ["_5KM", "_10KM", "HALF_MARATHON", "MARATHON"];

  return (
    <TextField
      select
      name="category"
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value as Category | "")}
      fullWidth={fullWidth}
      required={required}
    >
      {includeAll && <MenuItem value="">All</MenuItem>}
      {categories.map((category) => (
        <MenuItem key={category} value={category}>
          {formatCategory(category)}
        </MenuItem>
      ))}
    </TextField>
  );
}
