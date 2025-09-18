import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";
import { useAuth } from "../hooks/use-auth";
import PATHS from "../constants/paths";
import { CircularProgress, Drawer, Divider, Stack } from "@mui/material";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  const navLinks = [
    { label: "Home", to: PATHS.HOME },
    { label: "Participants", to: PATHS.PARTICIPANTS },
    { label: "Check Status", to: PATHS.PARTICIPANT_STATUS },
  ];

  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Container
        maxWidth="xl"
        sx={{
          py: 2,
          backgroundColor: "info.main",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            gap: 2,
            justifyContent: "space-between",
            width: "95%",
            mx: "auto",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            <Link
              component={RouterLink}
              to={PATHS.HOME}
              underline="none"
              color="inherit"
            >
              Skopje Marathon
            </Link>
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map((l) => (
              <Link
                key={l.to}
                component={RouterLink}
                to={l.to}
                color={location.pathname === l.to ? "primary" : "inherit"}
                underline="hover"
                sx={{ fontWeight: location.pathname === l.to ? 700 : 500 }}
              >
                {l.label}
              </Link>
            ))}
          </Box>

          <IconButton
            edge="start"
            color="inherit"
            sx={{ display: { xs: "inline-flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5 }}>
            {isLoading ? (
              <CircularProgress />
            ) : !isAuthenticated ? (
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => navigate(PATHS.LOGIN)}
                >
                  Sign in
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(PATHS.REGISTER)}
                  sx={{ borderRadius: 9999 }}
                >
                  Register Now
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  {`${user?.firstName} ${user?.lastName}`}
                </Typography>
                <Button variant="outlined" onClick={() => logout()}>
                  Logout
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 2 }} role="presentation">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Skopje Marathon
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {navLinks.map((l) => (
              <Button
                key={l.to}
                component={RouterLink}
                to={l.to}
                onClick={() => setOpen(false)}
                color={location.pathname === l.to ? "primary" : "inherit"}
              >
                {l.label}
              </Button>
            ))}
          </Stack>
          <Divider sx={{ my: 2 }} />
          {!isAuthenticated ? (
            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setOpen(false);
                  navigate(PATHS.LOGIN);
                }}
              >
                Sign in
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setOpen(false);
                  navigate(PATHS.REGISTER);
                }}
              >
                Register
              </Button>
            </Stack>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setOpen(false);
                logout();
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}
