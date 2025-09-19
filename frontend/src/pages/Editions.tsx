import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRaces } from "../hooks/use-races";
import PageContainer from "../components/layout/PageContainer";
import RaceCard from "../components/cards/RaceCard";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

export default function Editions() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useRaces();

  if (error) {
    return (
      <PageContainer title="Skopje Marathon Editions">
        <ErrorState error={error} />
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Skopje Marathon Editions">
      {isLoading ? (
        <LoadingState message="Loading editions..." />
      ) : (
        <Stack spacing={2}>
          {data?.map((race) => (
            <RaceCard
              key={race.id}
              race={race}
              onViewDetails={(raceId) => navigate(`/editions/${raceId}`)}
            />
          ))}
        </Stack>
      )}
    </PageContainer>
  );
}
