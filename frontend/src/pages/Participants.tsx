import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CircularProgress, Alert } from "@mui/material";
import PATHS from "../constants/paths";
import { Link as RouterLink } from "react-router-dom";
import { useParticipants } from "../hooks/use-participants";
import type { Category } from "../types/participant";

export default function Participants() {
  const {
    query,
    setQuery,
    category,
    setCategory,
    participants,
    loading,
    error,
  } = useParticipants();

  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 2, color: "black" }}
        >
          Participants
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to={PATHS.PARTICIPANT_REGISTER}
        >
          Register
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>
        <Grid size={2}>
          <TextField
            select
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | "")}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="_5KM">5 km</MenuItem>
            <MenuItem value="_10KM">10 km</MenuItem>
            <MenuItem value="HALF_MARATHON">Half Marathon</MenuItem>
            <MenuItem value="MARATHON">Marathon</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {participants.map((p) => (
            <Grid size={4} key={p.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {p.firstName} {p.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.category} • Start #{p.startNumber ?? "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && participants.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No participants found
          </Typography>
        </Box>
      )}
    </Container>
  );
}
