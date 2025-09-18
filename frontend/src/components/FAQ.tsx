import { Box, Container, TextField, Stack, Typography } from "@mui/material";

export default function FAQ() {
  return (
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
  );
}
