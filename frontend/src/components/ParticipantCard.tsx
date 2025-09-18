import { Card, Grid, Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import type { ParticipantResponse } from "../types/participant";

export default function ParticipantCard({
  participant,
}: {
  participant: ParticipantResponse;
}) {
  return (
    <Grid size={12} key={participant.id}>
      <Card>
        <CardContent>
          <Typography variant="h6">
            {participant.firstName} {participant.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {participant.category} • Start #{participant.startNumber ?? "N/A"}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
