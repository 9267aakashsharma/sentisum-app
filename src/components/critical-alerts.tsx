import MetricsCard, { Metrics } from "./metrics-card";

const alerts: Metrics[] = [
  {
    id: "1",
    title: "Support ticket volume increased by 200% in last hour",
    description:
      "The support ticket volume has increased significantly in the last hour, indicating a potential issue.",
    severity: "danger",
    timestamp: new Date(),
    read: false,
    tags: ["support", "volume"],
    source: "system",
    severityText: "Critical",
  },
  {
    id: "4",
    title: "User reported a bug in the application",
    description:
      "A user has reported a bug in the application that needs to be addressed.",
    severity: "warning",
    timestamp: new Date(),
    read: false,
    tags: ["bug", "user"],
    source: "user",
    severityText: "Warning",
  },
  {
    id: "5",
    title: "System maintenance scheduled for tonight",
    description:
      "System maintenance is scheduled for tonight at 2 AM. Please save your work.",
    severity: "info",
    timestamp: new Date(),
    read: false,
    tags: ["maintenance", "info"],
    source: "system",
    severityText: "Info",
  },
  {
    id: "7",
    title: "New user signed up",
    description: "A new user has signed up for the application. Welcome them!",
    severity: "success",
    timestamp: new Date(),
    read: false,
    tags: ["user", "signup"],
    source: "user",
    severityText: "Success",
  },
];

const CriticalAlerts = () => (
  <MetricsCard metrics={alerts} title="Critical Alerts" />
);

export default CriticalAlerts;
