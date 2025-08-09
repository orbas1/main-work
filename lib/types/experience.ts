export interface ExperienceSummary {
  participant: {
    totalCompleted: number;
    avgRating: number;
  };
  provider: {
    activeOpportunities: number;
    applications: number;
  };
}
