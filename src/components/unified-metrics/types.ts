export interface UnifiedMetricsDetails {
  id: string;
  name: string;
  source: string;
  color: string;
  value: number;
  percentageChange: number;
  changeType: "increase" | "decrease" | "no change";
  data: string[];
}
