import { Box, Rating, Typography } from "@mui/material";
import type { RaceReviewResponse } from "../types/race";

export default function RaceReviewCard({ rv }: { rv: RaceReviewResponse }) {
  return (
    <Box key={rv.id} sx={{ mb: 2, p: 2, border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {rv.userFirstName} {rv.userLastName}
        </Typography>
        <Rating value={rv.rating} readOnly size="small" />
      </Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {rv.comment}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(rv.createdAt).toLocaleString()}
      </Typography>
    </Box>
  );
}
