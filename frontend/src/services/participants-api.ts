import { axiosInstance } from "./api";
import { API_ROUTES } from "../constants/api-routes";
import type {
  RegisterParticipantRequest,
  ParticipantResponse,
  ParticipantStatusResponse,
  PaymentSimulationRequest,
  Category,
} from "../types/participant";
import type { PageResponse } from "../types/participant";

export const registerParticipant = async (
  payload: RegisterParticipantRequest
): Promise<ParticipantResponse> => {
  const { data } = await axiosInstance.post<ParticipantResponse>(
    API_ROUTES.PARTICIPANTS.REGISTER,
    payload
  );
  return data;
};

export const simulatePayment = async (
  participantId: string,
  paymentData: PaymentSimulationRequest
): Promise<"PENDING" | "PAID" | "FAILED"> => {
  const { data } = await axiosInstance.post<"PENDING" | "PAID" | "FAILED">(
    API_ROUTES.PARTICIPANTS.PAY(participantId),
    paymentData
  );
  return data;
};

export const getParticipantStatus = async (
  searchValue: string
): Promise<ParticipantStatusResponse> => {
  const params = new URLSearchParams();
  params.append("search", searchValue);
  const { data } = await axiosInstance.get<ParticipantStatusResponse>(
    `${API_ROUTES.PARTICIPANTS.STATUS}?${params.toString()}`
  );
  return data;
};

export const listPaidParticipants = async (
  name?: string,
  category?: Category,
  page: number = 0,
  size: number = 10
): Promise<PageResponse<ParticipantResponse>> => {
  const params = new URLSearchParams();
  if (name) params.append("name", name);
  if (category) params.append("category", category);
  params.append("page", String(page));
  params.append("size", String(size));
  const { data } = await axiosInstance.get<PageResponse<ParticipantResponse>>(
    `${API_ROUTES.PARTICIPANTS.LIST}?${params.toString()}`
  );
  return data;
};
