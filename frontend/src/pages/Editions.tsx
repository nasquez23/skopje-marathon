import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Chip, Rating, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRaces } from "../hooks/use-races";

export default function Editions() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useRaces();

  return (
    <Container maxWidth="xl" sx={{ my: 6, width: "95%", mx: "auto" }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Skopje Marathon Editions
      </Typography>
      {error && <Typography color="error">Failed to load editions</Typography>}
      {isLoading ? (
        <Typography>Loading…</Typography>
      ) : (
        <Grid container spacing={2}>
          {data?.map((r) => (
            <Grid item xs={12} sm={6} md={4} key={r.id}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {r.name} {r.edition}
                    </Typography>
                    <Chip label={r.status} color={r.status === "UPCOMING" ? "primary" : "default"} size="small" />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {r.location} • {new Date(r.raceDate).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                    <Rating value={r.averageRating} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      ({r.reviewsCount})
                    </Typography>
                  </Box>
                  <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate(`/editions/${r.id}`)}>
                    View details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}


