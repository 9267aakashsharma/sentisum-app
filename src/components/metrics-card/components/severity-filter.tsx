import { Select, SelectItem } from "@heroui/react";

import { Severity } from "../types";
import { severity } from "../constants";

const severityOptions = severity.reduce((acc, s) => {
  acc[s] = s.charAt(0).toUpperCase() + s.slice(1);
  return acc;
}, {} as Record<Severity, string>);

const SeverityFilter = ({
  severities,
  onChange,
}: {
  severities: Severity[];
  onChange: (severities: Severity[]) => void;
}) => {
  const handleSeverityChange = (severity: string) => {
    const updatedSeverities = (severity.split(",") as Severity[]).filter(
      (s) => s.length
    );
    onChange(updatedSeverities || []);
  };

  return (
    <div className="flex-1 flex justify-start items-center">
      <Select
        label="Severity"
        color="primary"
        className="max-w-sm min-w-64"
        placeholder="Select severity"
        variant="bordered"
        selectedKeys={severities}
        value={severities}
        onChange={(e) => handleSeverityChange(e.target.value)}
        selectionMode="multiple"
        size="sm"
      >
        {Object.keys(severityOptions).map((key) => (
          <SelectItem key={key}>{severityOptions[key as Severity]}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SeverityFilter;
