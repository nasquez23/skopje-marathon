import {
  Paper,
  Typography,
  Divider,
  Stack,
  Box,
  Pagination,
} from "@mui/material";
import type { RaceReviewResponse } from "../types/race";
import type { PageResponse } from "../types/participant";
import RaceReviewCard from "./RaceReviewCard";

export default function RaceReviews({
  reviewsResponse,
  page,
  setPage,
}: {
  reviewsResponse: PageResponse<RaceReviewResponse> | undefined;
  page: number;
  setPage: (page: number) => void;
}) {
  if (!reviewsResponse) return null;

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        Reviews
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={2}>
        {reviewsResponse.content.length === 0 ? (
          <Typography textAlign="center" variant="body1" color="text.secondary" sx={{ pt: 2 }}>
            No reviews yet
          </Typography>
        ) : (
          reviewsResponse?.content.map((review) => (
            <RaceReviewCard key={review.id} rv={review} />
          ))
        )}
      </Stack>
      {reviewsResponse && reviewsResponse.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={reviewsResponse.totalPages}
            page={page + 1}
            onChange={(_, p) => setPage(p - 1)}
          />
        </Box>
      )}
    </Paper>
  );
}
