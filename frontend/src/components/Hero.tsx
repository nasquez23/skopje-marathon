import {
  Box,
  Container,
  Stack,
  Paper,
  Typography,
  Button,
  Card,
  CardMedia,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Hero() {
  return (
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
  );
}
