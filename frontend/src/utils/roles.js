export const normalizeRole = (role) => (role || "").toLowerCase();

export const isEmployer = (user) => normalizeRole(user?.role) === "employer";

export const isJobSeeker = (user) =>
  normalizeRole(user?.role) === "job seeker";
