import { Severity } from "./types";

export const getHexColorBySeverity = (severity: Severity) => {
  switch (severity) {
    case "info":
      return "#444ce7";
    case "warning":
      return "#f5a524";
    case "danger":
      return "#f31260";
    case "success":
      return "#17c964";
    default:
      return "#444ce7";
  }
};

export const getHeroUIColorBySeverity = (severity: Severity) =>
  severity === "info" ? "primary" : severity || "default";
