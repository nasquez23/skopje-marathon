import { Box, Chip } from "@mui/material";
import type { PaymentStatus } from "../../types/participant";

export default function PaymentStatusChip({
  status,
}: {
  status: PaymentStatus;
}) {
  return (
    <Box sx={{ mt: 2 }}>
      <Chip
        label={status}
        color={
          status === "PAID"
            ? "success"
            : status === "PENDING"
            ? "warning"
            : "error"
        }
        variant={status === "PAID" ? "filled" : "outlined"}
        sx={{ fontWeight: 700 }}
      />
    </Box>
  );
}
