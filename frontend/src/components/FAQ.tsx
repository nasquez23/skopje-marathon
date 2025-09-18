import { Box, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { type AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  type AccordionSummaryProps,
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useState, type SyntheticEvent } from "react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function FAQ() {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (id: number) => (_event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? id : false);
    };

  const faqs = [
    {
      id: 1,
      q: "When is the Skopje Marathon 2025?",
      a: "Race day is scheduled for the first Sunday of October 2025. Exact times will be emailed to all registered participants.",
    },
    {
      id: 2,
      q: "What distances are available?",
      a: "You can register for 5 km, 10 km, Half Marathon (21.1 km), or Full Marathon (42.2 km).",
    },
    {
      id: 3,
      q: "How do I register?",
      a: "Go to the Register page, fill in your details, choose a category, and submit. You can then complete payment to confirm your spot.",
    },
    {
      id: 4,
      q: "How can I check my registration or payment status?",
      a: "Use the Status page with your email or registration number. It will show whether your payment is Pending, Paid, or Failed.",
    },
    {
      id: 5,
      q: "When will I receive my start number?",
      a: "After successful payment, your start number will be assigned and visible in your status shortly. You'll also receive an email confirmation.",
    },
    {
      id: 6,
      q: "Is there a minimum age to participate?",
      a: "Participants must be at least 16 years old for all distances. Minors require parental consent.",
    },
  ];

  return (
    <Box sx={{ backgroundColor: (t) => t.palette.grey[100], py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            textAlign: "center",
            mb: 3,
            color: "black",
            textTransform: "uppercase",
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Stack spacing={1}>
          {faqs.map((item) => (
            <Accordion
              expanded={expanded === item.id}
              onChange={handleChange(item.id)}
              sx={{ borderRadius: 3, overflow: "hidden" }}
            >
              <AccordionSummary sx={{ borderRadius: 3, overflow: "hidden" }}>
                <Typography sx={{ fontWeight: 700 }}>{item.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{item.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
