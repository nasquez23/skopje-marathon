import { AxiosError } from "axios";

export interface ErrorResponse {
  error: string;
  message: string;
  timestamp: number;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ErrorResponse;
    if (errorData?.message) {
      return errorData.message;
    }

    // Fallback to status-based messages
    switch (error.response?.status) {
      case 400:
        return "Invalid request. Please check your input.";
      case 401:
        return "You must be logged in to perform this action.";
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 409:
        return "This action conflicts with existing data.";
      case 422:
        return "The request was well-formed but contains invalid data.";
      case 500:
        return "An internal server error occurred. Please try again later.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  }

  return "An unexpected error occurred. Please try again.";
}

export function getErrorSeverity(
  error: unknown
): "error" | "warning" | "info" | "success" {
  if (error instanceof AxiosError) {
    switch (error.response?.status) {
      case 400:
        return "info";
      case 401:
      case 403:
      case 409:
        return "warning";
      case 404:
      case 422:
      case 500:
        return "error";
      default:
        return "error";
    }
  }

  return "error";
}
