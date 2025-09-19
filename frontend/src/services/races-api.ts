import { axiosInstance } from "./api";
import { API_ROUTES } from "../constants/api-routes";
import type {
  RaceResponse,
  RaceReviewResponse,
  AddReviewRequest,
} from "../types/race";
import type { PageResponse } from "../types/participant";

export const listRaces = async (): Promise<RaceResponse[]> => {
  const { data } = await axiosInstance.get<RaceResponse[]>(
    API_ROUTES.RACES.LIST
  );
  return data;
};

export const getRaceDetails = async (id: string): Promise<RaceResponse> => {
  const { data } = await axiosInstance.get<RaceResponse>(
    API_ROUTES.RACES.DETAILS(id)
  );
  return data;
};

export const listRaceReviews = async (
  id: string,
  page: number,
  size: number
): Promise<PageResponse<RaceReviewResponse>> => {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  const { data } = await axiosInstance.get(
    `${API_ROUTES.RACES.REVIEWS(id)}?${params.toString()}`
  );
  return data;
};

export const addRaceReview = async (
  id: string,
  payload: AddReviewRequest
): Promise<void> => {
  await axiosInstance.post(API_ROUTES.RACES.REVIEWS(id), payload);
};
