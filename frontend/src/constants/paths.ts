const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PARTICIPANT_REGISTER: "/participants/register",
  PARTICIPANT_STATUS: "/participants/status",
  PARTICIPANTS: "/participants",
  EDITIONS: "/editions",
  EDITION_DETAILS: (id: string) => `/editions/${id}`,
};

export default PATHS;
