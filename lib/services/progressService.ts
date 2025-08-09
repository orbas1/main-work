import api from "@/lib/api";
import { ParticipantProgress, ProviderProgress } from "@/lib/types/progress";

export const progressService = {
  getParticipant: () => api.get<ParticipantProgress>("/progress/participant"),
  getProvider: () => api.get<ProviderProgress>("/progress/provider"),
};

export default progressService;
