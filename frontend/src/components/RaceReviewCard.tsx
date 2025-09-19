import { Box, Rating, Typography } from "@mui/material";
import type { RaceReviewResponse } from "../types/race";

export default function RaceReviewCard({ rv }: { rv: RaceReviewResponse }) {
  console.log(rv);
  return (
    <Box key={rv.id}>
      <Rating value={rv.rating} readOnly size="small" />
      <Typography variant="body2">{rv.comment}</Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(rv.createdAt).toLocaleString()}
      </Typography>
    </Box>
  );
}
