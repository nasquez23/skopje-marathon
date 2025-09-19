import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Chip, Rating, Stack, Button } from "@mui/material";
import type { RaceResponse } from "../../types/race";

interface RaceCardProps {
  race: RaceResponse;
  onViewDetails: (raceId: string) => void;
  showButton?: boolean;
  buttonText?: string;
}

export default function RaceCard({
  race,
  onViewDetails,
  showButton = true,
  buttonText = "View details",
}: RaceCardProps) {
  return (
    <Card elevation={4} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
            >
              <Chip
                label={race.status}
                color={race.status === "UPCOMING" ? "primary" : "default"}
                size="small"
              />
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
            >
              <Rating value={race.averageRating} precision={0.5} readOnly />
              <Box
                component="span"
                sx={{ fontSize: "0.875rem", color: "text.secondary" }}
              >
                ({race.reviewsCount})
              </Box>
            </Box>
          </Box>
          {showButton && (
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => onViewDetails(race.id)}
            >
              {buttonText}
            </Button>
          )}
        </Stack>
        <Box sx={{ mt: 2 }}>
          <Box
            component="span"
            sx={{ fontSize: "1.25rem", fontWeight: 700 }}
          >
            {race.name} {race.edition}
          </Box>
          <Box
            component="div"
            sx={{ fontSize: "0.875rem", color: "text.secondary", mt: 0.5 }}
          >
            {race.location} • {new Date(race.raceDate).toLocaleDateString()}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
