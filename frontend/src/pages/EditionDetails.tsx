import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert, Box, Rating } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useAddRaceReview,
  useRaceDetails,
  useRaceReviews,
} from "../hooks/use-races";
import { useAuth } from "../hooks/use-auth";
import RaceReviews from "../components/RaceReviews";
import { getErrorMessage, getErrorSeverity } from "../utils/error-handler";

export default function EditionDetails() {
  const { id } = useParams();
  const { data: race } = useRaceDetails(id ?? null);
  const [page, setPage] = useState(0);
  const size = 5;
  const { data: reviews, refetch } = useRaceReviews(id ?? null, page, size);
  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState("");
  const addReview = useAddRaceReview(id ?? null);
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
    <Container maxWidth="md" sx={{ my: 6, minHeight: "50vh" }}>
      {race && (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {race.name} {race.edition}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {race.location} • {new Date(race.raceDate).toLocaleDateString()} •{" "}
            {race.status}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Rating value={race.averageRating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({race.reviewsCount})
            </Typography>
          </Box>
        </Paper>
      )}

      {isAuthenticated && race?.status === "FINISHED" ? (
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
      ) : race?.status === "UPCOMING" ? (
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

      {race?.status === "FINISHED" && (
        <RaceReviews reviewsResponse={reviews} page={page} setPage={setPage} />
      )}
    </Container>
  );
}
