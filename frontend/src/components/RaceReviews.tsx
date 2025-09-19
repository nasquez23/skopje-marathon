import {
  Paper,
  Typography,
  Divider,
  Stack,
  Box,
  Pagination,
  Rating,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import type { RaceResponse } from "../types/race";
import RaceReviewCard from "./cards/RaceReviewCard";
import { useState } from "react";
import { useAddRaceReview, useRaceReviews } from "../hooks/use-races";
import { useAuth } from "../hooks/use-auth";
import { getErrorMessage, getErrorSeverity } from "../utils/error-handler";
import { Link } from "react-router-dom";

export default function RaceReviews({ race }: { race: RaceResponse }) {
  const [page, setPage] = useState(0);
  const size = 5;
  const { data: reviews, refetch } = useRaceReviews(
    race.id ?? null,
    page,
    size,
    race.status === "FINISHED"
  );
  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState("");
  const addReview = useAddRaceReview(race.id ?? null);
  const { isAuthenticated } = useAuth();

  const onSubmit = async () => {
    await addReview.mutateAsync(
      { rating: rating ?? 5, comment },
      {
        onSuccess: () => {
          setComment("");
          setRating(5);
          refetch();
        },
      }
    );
  };

  return (
    <>
      {isAuthenticated && race.status === "FINISHED" ? (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Leave a review
          </Typography>
          {addReview.isError && (
            <Alert severity={getErrorSeverity(addReview.error)} sx={{ mb: 2 }}>
              {getErrorMessage(addReview.error)}
            </Alert>
          )}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Rating value={rating} onChange={(_, v) => setRating(v)} />
            <TextField
              fullWidth
              placeholder="Share your experience…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={addReview.isPending || !comment}
            >
              Submit
            </Button>
          </Stack>
        </Paper>
      ) : race.status === "UPCOMING" ? (
        <Paper
          elevation={2}
          sx={{ p: 3, borderRadius: 3, mb: 3, textAlign: "center" }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Reviews Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Reviews will be available after the race is completed. Check back
            after the event!
          </Typography>
        </Paper>
      ) : (
        <Paper
          elevation={2}
          sx={{ p: 3, borderRadius: 3, mb: 3, textAlign: "center" }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Want to leave a review?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sign in to share your experience and help other runners!
          </Typography>
          <Button component={Link} variant="contained" to="/login">
            Sign In
          </Button>
        </Paper>
      )}

      {race.status === "FINISHED" && reviews && (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Reviews
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            {reviews?.content.length === 0 ? (
              <Typography
                textAlign="center"
                variant="body1"
                color="text.secondary"
                sx={{ pt: 2 }}
              >
                No reviews yet
              </Typography>
            ) : (
              reviews?.content.map((review) => (
                <RaceReviewCard key={review.id} rv={review} />
              ))
            )}
          </Stack>
          {reviews && reviews.totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={reviews.totalPages}
                page={page + 1}
                onChange={(_, p) => setPage(p - 1)}
              />
            </Box>
          )}
        </Paper>
      )}
    </>
  );
}
