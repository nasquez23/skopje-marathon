export type Category = "_5KM" | "_10KM" | "HALF_MARATHON" | "MARATHON";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface RegisterParticipantRequest {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  category: Category;
}

export interface ParticipantResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  category: Category;
  registrationNumber: string;
  startNumber?: string | null;
  raceEdition: string;
}

export interface ParticipantStatusResponse {
  status: PaymentStatus;
  participantId: string;
  registrationNumber?: string | null;
  startNumber?: string | null;
}

export interface PaymentSimulationRequest {
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cardHolder: string;
  cvv: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
