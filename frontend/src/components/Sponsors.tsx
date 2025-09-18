import {
  Container,
  Typography,
  Paper,
  Stack,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Avatar,
} from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

const SPONSORS = [
  "https://dobravoda.com.mk/wp-content/uploads/2024/05/image-19-min.png",
  "https://borazastita.rs/wp-content/uploads/2020/03/VODAVODA.png",
  "https://jobs.com.mk/wp-content/uploads/2025/06/logo-peli-1.png",
  "https://kozuvcanka.mk/wp-content/uploads/2025/05/Kozuvcanka-material_full-logo-eng.png",
  "https://izvorska.mk/wp-content/uploads/2024/12/logo350x100EN.png",
  "https://gajba.mk/media/2020/12/skopsko-ipl.png",
  "https://logos-world.net/wp-content/uploads/2020/05/Amstel-Logo.png",
  "https://upload.wikimedia.org/wikipedia/de/thumb/0/08/Becks_Logo.svg/2560px-Becks_Logo.svg.png",
];

export default function Sponsors() {
  return (
    <Container maxWidth="xl" sx={{ my: 6, mx: "auto", width: "95%" }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          textAlign: "center",
          mb: 3,
          color: "text.primary",
        }}
      >
        Our Title Sponsor
      </Typography>
      <Paper
        variant="outlined"
        sx={{ px: 3, py: 2, borderRadius: 4, overflow: "hidden" }}
      >
        <Stack
          direction="row"
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
          sx={{ flexWrap: "wrap" }}
        >
          {SPONSORS.map((src, i) => (
            <Box
              key={i}
              sx={{ height: 40, display: "flex", alignItems: "center" }}
            >
              <img
                src={src}
                alt="sponsor"
                style={{
                  height: 40,
                  width: "auto",
                  opacity: 0.9,
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Stack>
      </Paper>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ mt: 5, alignItems: { xs: "stretch", md: "stretch" } }}
      >
        <Box sx={{ flex: 1, display: { md: "flex" } }}>
          <Card
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              flex: 1,
            }}
          >
            <CardMedia
              sx={{ height: { xs: 300, md: "100%" }, objectFit: "cover" }}
              image="https://i.guim.co.uk/img/media/24c74bce590f4643d5c7315efc736832592c148d/0_4_828_497/master/828.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=d8685d72caed9a41f2bad231b73e6f8d"
              title="Program"
            />
            <CardContent
              sx={{
                position: "absolute",
                inset: 0,
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.6) 100%)",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "primary.contrastText" }}
              >
                Our Program & Survey
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.85, color: "primary.contrastText" }}
              >
                Embark on the ultimate test of endurance and determination.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Stack spacing={2}>
            {[
              { title: "Race Series 2025 Now Open", highlight: true },
              { title: "Charity Entries Are Now Open" },
              { title: "Thanks To All For Completing The Survey" },
            ].map((item) => (
              <Paper
                key={item.title}
                sx={{
                  px: 3,
                  py: 2.5,
                  borderRadius: 4,
                  backgroundColor: item.highlight ? "primary.main" : "grey.100",
                  color: item.highlight ? "primary.contrastText" : "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ pr: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 800,
                      color: item.highlight
                        ? "primary.contrastText"
                        : "text.primary",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: item.highlight ? 0.9 : 1 }}
                    color={item.highlight ? "inherit" : "text.secondary"}
                  >
                    Embark on the ultimate test of endurance and determination
                    with marathons, where each stride is a journey of
                    self‑discovery.
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: item.highlight
                      ? "primary.contrastText"
                      : "primary.contrastText",
                    color: item.highlight ? "primary.main" : "primary.main",
                    width: 36,
                    height: 36,
                  }}
                >
                  <IconButton size="small" aria-label="open">
                    <ArrowOutwardRoundedIcon fontSize="small" />
                  </IconButton>
                </Avatar>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
