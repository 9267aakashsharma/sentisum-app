import MetricsCard, { Metrics } from "./metrics-card";

const reason: Metrics[] = [
  {
    id: "1",
    title: "Application not responding",
    description:
      "The application is not responding for some users. Please check the logs.",
    severity: "danger",
    timestamp: new Date(),
    read: false,
    tags: ["support", "volume"],
    source: "system",
    severityText: "Critical",
  },
  {
    id: "2",
    title: "Flawless and smooth experience",
    description:
      "The new update is fantastic. Great job! The app is running smoothly.",
    severity: "success",
    timestamp: new Date(),
    read: false,
    tags: ["success", "ui", "app"],
    source: "user",
    severityText: "Success",
  },
  {
    id: "3",
    title: "New Feature Requests",
    description: "Many users are requesting new features on the app.",
    severity: "info",
    timestamp: new Date(),
    read: false,
    tags: ["maintenance", "info"],
    source: "system",
    severityText: "Info",
  },
  {
    id: "4",
    title: "Few pages are not loading",
    description: "Some pages are not loading for some users.",
    severity: "warning",
    timestamp: new Date(),
    read: false,
    tags: ["user", "signup"],
    source: "user",
    severityText: "Warning",
  },
];

const TopContactReasons = () => (
  <MetricsCard metrics={reason} title="Top Contact Reasons" />
);

export default TopContactReasons;
