export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
  PARTICIPANTS: {
    REGISTER: "/participants/register",
    PAY: (id: string) => `/participants/${id}/pay`,
    STATUS: "/participants/status",
    LIST: "/participants",
  },
  RACES: {
    LIST: "/races",
    DETAILS: (id: string) => `/races/${id}`,
    REVIEWS: (id: string) => `/races/${id}/reviews`,
  },
};
