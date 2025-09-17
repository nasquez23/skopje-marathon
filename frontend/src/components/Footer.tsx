import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        pt: 6,
        pb: 3,
        backgroundColor: (t) => t.palette.grey[100],
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          useFlexGap
          flexWrap="wrap"
        >
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Irish Life Dublin Marathon Countdown
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © Skopje Marathon 2025
            </Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Link href="#" underline="hover" color="inherit">
                Race Series
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Run For Charity
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Rules and Regulations
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Privacy Policy
              </Link>
            </Box>
          </Box>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Contact
            </Typography>
            <Typography variant="body2">office@skopjemarathon.mk</Typography>
            <Typography variant="body2">Skopje, Macedonia</Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
