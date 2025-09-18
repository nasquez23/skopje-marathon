import {
  Box,
  Container,
  Stack,
  Paper,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowOutwardRounded } from "@mui/icons-material";
import PATHS from "../constants/paths";

export default function Hero() {
  const images = useMemo(
    () => [
      "https://images.ahotu.com/ranb7g3jkfp7loo5qbxtbl4ohimh?w=1920&q=75&f=webp",
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Orlen_Warsaw_Marathon_2014_al._KEN.JPG",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW5PWRUmALDS04NBHOnzyoX7AfCSwjXe0hNA&s",
      "https://images.squarespace-cdn.com/content/v1/5e18bb1a4e7d940d7e0195fa/86ac2cd4-88bd-4e44-a1e2-162cfa4ed236/Copy-of-250427_Eugene-Marathon_Nelson_012_2.jpg",
    ],
    []
  );
  const [index, setIndex] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [images.length]);

  const target = useMemo(() => new Date("2025-10-27T08:45:00").getTime(), []);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const leftRef = useRef<HTMLDivElement | null>(null);
  const [leftHeight, setLeftHeight] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      if (leftRef.current) {
        setLeftHeight(leftRef.current.offsetHeight);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 3, mx: "auto", width: "95%" }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Stack spacing={2} sx={{ flex: 1, minWidth: 280 }} ref={leftRef}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 3,
              backgroundColor: "#6b6bff",
              color: "white",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 1.5,
                lineHeight: 1.05,
                color: "white",
              }}
            >
              Skopje Marathon 2025
            </Typography>
            <Typography
              variant="h6"
              sx={{ opacity: 0.95, mb: 2, color: "white" }}
            >
              Embark on the ultimate test of endurance and determination, where
              each stride is a journey of self‑discovery.
            </Typography>
            <Button
              component={RouterLink}
              to={PATHS.PARTICIPANT_REGISTER}
              variant="contained"
              endIcon={<ArrowOutwardRounded fontSize="small" />}
              sx={{
                color: "black",
                borderRadius: 9999,
                backgroundColor: "white",
              }}
            >
              Register Here
            </Button>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              flex: 1,
              borderRadius: 3,
              py: 3,
              px: 5,
              background: (t) => t.palette.grey[300],
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {[
                { label: "DAYS", value: days },
                { label: "HOURS", value: hours },
                { label: "MINS", value: mins },
                { label: "SECS", value: secs },
              ].map((it) => (
                <Box key={it.label} sx={{ textAlign: "center" }}>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {String(it.value).padStart(2, "0")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {it.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                October 27th, 2025
              </Typography>
              <Typography variant="body2" color="text.secondary">
                At 8:45 AM
              </Typography>
            </Box>
          </Paper>
        </Stack>

        <Box
          sx={{
            flex: 1,
            minWidth: 280,
            height: { xs: "auto", md: leftHeight || "auto" },
          }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              height: { xs: 300, md: leftHeight || "auto" },
            }}
          >
            <img
              src={images[index]}
              alt="Hero"
              style={{
                width: "100%",
                height: leftHeight ? leftHeight : 300,
                objectFit: "cover",
                display: "block",
              }}
            />
            <IconButton
              onClick={() =>
                setIndex((i) => (i - 1 + images.length) % images.length)
              }
              sx={{
                position: "absolute",
                top: "50%",
                left: 8,
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.8)",
              }}
            >
              <ArrowBackIosNewRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              sx={{
                position: "absolute",
                top: "50%",
                right: 8,
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.8)",
              }}
            >
              <ArrowForwardIosRoundedIcon fontSize="small" />
            </IconButton>
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                position: "absolute",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {images.map((_, i) => (
                <FiberManualRecordRoundedIcon
                  key={i}
                  fontSize="small"
                  color={i === index ? "primary" : "disabled"}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
