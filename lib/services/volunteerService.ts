import api from "@/lib/api";
import { VolunteerStats, EmployerStats } from "@/lib/types/volunteer";

export const volunteerService = {
  getVolunteerStats: () => api.get<VolunteerStats>("/volunteering/volunteer/stats"),
  getEmployerStats: () => api.get<EmployerStats>("/volunteering/employer/stats"),
};

export default volunteerService;
