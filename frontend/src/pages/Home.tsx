import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: (t) => t.palette.grey[100],
          py: 6,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Box sx={{ flex: 1 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#6b6bff",
                  color: "white",
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                  Skopje Marathon 2025
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                  Embark on the ultimate test of endurance and determination.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  color="inherit"
                >
                  Register Here
                </Button>
              </Paper>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Card sx={{ borderRadius: 3 }}>
                <CardMedia
                  sx={{ height: 260 }}
                  image="https://images.unsplash.com/photo-1502810190503-8303352d0dd1?q=80&w=1600&auto=format&fit=crop"
                  title="Runner"
                />
              </Card>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, textAlign: "center", mb: 3 }}
        >
          Our Title Sponsors
        </Typography>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Sponsor logos placeholder
          </Typography>
        </Paper>
      </Container>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Box sx={{ flex: 1 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardMedia
                sx={{ height: 260 }}
                image="https://images.unsplash.com/photo-1599050751749-b7b4c8f5b7c5?q=80&w=1600&auto=format&fit=crop"
                title="Training"
              />
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Our Program & Survey
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Learn about our training program and participant survey.
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Stack spacing={2}>
              {[
                "Race Series 2025 Now Open",
                "Charity Entries Are Now Open",
                "Thanks To All For Completing The Survey",
              ].map((title) => (
                <Box key={title}>
                  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Embark on the ultimate test of endurance and
                      determination.
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>

      <Box sx={{ backgroundColor: (t) => t.palette.grey[100], py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, textAlign: "center", mb: 3 }}
          >
            Frequently Asked Questions
          </Typography>
          <Stack spacing={2}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Box key={i}>
                <TextField
                  fullWidth
                  disabled
                  label={`Question ${i}`}
                  value="It will take place in October."
                />
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
