import MetricsCard, { Metrics } from "./metrics-card";

const conversations: Metrics[] = [
  {
    id: "1",
    title: "Facing issues with the application",
    description:
      "The application is not responding. Please check the server status.",
    severity: "danger",
    timestamp: new Date(),
    read: false,
    tags: ["support", "volume"],
    source: "system",
    severityText: "Critical",
  },
  {
    id: "2",
    title: "Payment failing for orders",
    description:
      "Users are reporting that their payments are failing. Please investigate.",
    severity: "danger",
    timestamp: new Date(),
    read: false,
    tags: ["bug", "payment", "user"],
    source: "user",
    severityText: "Critical",
  },
  {
    id: "3",
    title: "New feature request",
    description: "Add FAQ section to the help page for better user experience.",
    severity: "info",
    timestamp: new Date(),
    read: false,
    tags: ["maintenance", "info"],
    source: "system",
    severityText: "Info",
  },
  {
    id: "4",
    title: "Past Orders page is not loading",
    description: "Server error when trying to access past orders.",
    severity: "warning",
    timestamp: new Date(),
    read: false,
    tags: ["maintenance", "server"],
    source: "system",
    severityText: "Warning",
  },
  {
    id: "5",
    title: "Loved the new update!",
    description: "The new update is fantastic. Great job!",
    severity: "success",
    timestamp: new Date(),
    read: false,
    tags: ["user", "signup"],
    source: "user",
    severityText: "Success",
  },
];

const TopConversations = () => (
  <MetricsCard metrics={conversations} title="Top Conversations" />
);

export default TopConversations;
