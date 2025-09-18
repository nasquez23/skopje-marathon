import {
  Container,
  Typography,
  Paper,
  Stack,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

export default function Sponsors() {
  return (
    <>
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, textAlign: "center", mb: 3, color: "black" }}
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
    </>
  );
}
