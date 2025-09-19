import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Box, Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import { useRaceDetails } from "../hooks/use-races";
import RaceReviews from "../components/RaceReviews";

export default function EditionDetails() {
  const { id } = useParams();
  const { data: race } = useRaceDetails(id ?? null);

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

      {race && <RaceReviews race={race} />}
    </Container>
  );
}
