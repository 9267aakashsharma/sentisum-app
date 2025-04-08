import { severity, source } from "./constants";

export type Severity = (typeof severity)[number];
export type Source = (typeof source)[number];

export interface MetricsFilters {
  searchQuery: string;
  severities: Severity[];
  sources: Source[];
}

export interface Metrics {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  severityText?: string;
  timestamp: Date;
  read: boolean;
  tags: string[];
  source: Source;
}
