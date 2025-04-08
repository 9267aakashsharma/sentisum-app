import { MetricsFilters } from "./types";

export const severity = ["info", "warning", "danger", "success"] as const;
export const source = ["user", "system", "external"] as const;

export const defaultFilters: MetricsFilters = {
  searchQuery: "",
  severities: [],
  sources: [],
};
