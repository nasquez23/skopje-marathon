export interface RaceResponse {
  id: string;
  name: string;
  edition: string;
  description: string;
  location: string;
  raceDate: string;
  status: "UPCOMING" | "FINISHED";
  averageRating: number;
  reviewsCount: number;
}

export interface RaceReviewResponse {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AddReviewRequest {
  rating: number;
  comment: string;
}
