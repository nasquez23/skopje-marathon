import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        pt: 6,
        pb: 3,
        backgroundColor: "#b6b5df",
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
            <Typography variant="h6" sx={{ fontWeight: 700, color: "black" }}>
              Skopje Marathon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © Skopje Marathon 2025
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <IconButton size="small" aria-label="facebook" color="inherit">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="instagram" color="inherit">
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="twitter" color="inherit">
                <TwitterIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "black" }}>
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
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "black" }}>
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
