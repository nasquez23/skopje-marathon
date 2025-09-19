import Grid from "@mui/material/Grid";
import { Box, Button, Pagination } from "@mui/material";
import PATHS from "../constants/paths";
import { Link as RouterLink } from "react-router-dom";
import { useParticipants } from "../hooks/use-participants";
import ParticipantCard from "../components/cards/ParticipantCard";
import PageContainer from "../components/layout/PageContainer";
import SearchForm from "../components/forms/SearchForm";
import CategorySelect from "../components/forms/CategorySelect";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";

export default function Participants() {
  const {
    query,
    setQuery,
    category,
    setCategory,
    participants,
    page,
    totalPages,
    setPage,
    loading,
    error,
    isError,
    totalElements,
  } = useParticipants();

  const registerButton = (
    <Button
      variant="contained"
      color="primary"
      size="large"
      sx={{
        borderRadius: 9999,
        "&:hover": { color: "white" },
      }}
      component={RouterLink}
      to={PATHS.PARTICIPANT_REGISTER}
    >
      Register
    </Button>
  );

  if (isError) {
    return (
      <PageContainer title="Participants" action={registerButton}>
        <ErrorState error={error} />
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Participants" action={registerButton}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SearchForm
            value={query}
            onChange={setQuery}
            label="Search by name"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <CategorySelect
            value={category}
            onChange={setCategory}
          />
        </Grid>
      </Grid>

      {loading ? (
        <LoadingState message="Loading participants..." />
      ) : (
        <>
          <Box sx={{ color: "text.secondary", mb: 1 }}>
            Showing {totalElements} {totalElements === 1 ? "result" : "results"}
          </Box>
          <Grid container spacing={2}>
            {participants.map((p) => (
              <ParticipantCard key={p.id} participant={p} />
            ))}
          </Grid>
        </>
      )}

      {!loading && participants.length === 0 && (
        <EmptyState
          title="No participants found"
          description="Try adjusting your search criteria"
        />
      )}

      {!loading && totalPages > 1 && (
        <Box display="flex" justifyContent="center" py={4}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(_, p) => setPage(p - 1)}
            color="primary"
          />
        </Box>
      )}
    </PageContainer>
  );
}
