import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { useAuth } from "../hooks/use-auth";
import PATHS from "../constants/paths";
import { CircularProgress } from "@mui/material";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider", py: 0.5 }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
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

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            <Link
              component={RouterLink}
              to={PATHS.HOME}
              color="inherit"
              underline="hover"
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              to={PATHS.PARTICIPANT_STATUS}
              color="inherit"
              underline="hover"
            >
              Participant Status
            </Link>
            <Link
              component={RouterLink}
              to={PATHS.PARTICIPANTS}
              color="inherit"
              underline="hover"
            >
              Participants
            </Link>
          </Box>

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
                onClick={() => navigate(PATHS.REGISTER)}
              >
                Register
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
