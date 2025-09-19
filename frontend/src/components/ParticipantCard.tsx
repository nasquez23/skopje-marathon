import { Card, Grid, Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import type { ParticipantResponse } from "../types/participant";
import { formatCategory } from "../lib/format";

export default function ParticipantCard({
  participant,
}: {
  participant: ParticipantResponse;
}) {
  return (
    <Grid
      size={12}
      key={participant.id}
      sx={{ border: "1px solid black", borderRadius: 2, p: 0.5 }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6">
            {participant.firstName} {participant.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatCategory(participant.category)} • Start #
            {participant.startNumber ?? "N/A"}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
