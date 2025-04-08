import { Select, SelectItem } from "@heroui/react";

import { Source } from "../types";
import { source } from "../constants";

const sourceOptions = source.reduce((acc, s) => {
  acc[s] = s.charAt(0).toUpperCase() + s.slice(1);
  return acc;
}, {} as Record<Source, string>);

const SourceFilter = ({
  sources,
  onChange,
}: {
  sources: Source[];
  onChange: (sources: Source[]) => void;
}) => {
  const handleSourceChange = (source: string) => {
    const updatedSources = (source.split(",") as Source[]).filter(
      (s) => s.length
    );
    onChange(updatedSources || []);
  };

  return (
    <div className="flex-1 flex justify-end items-center">
      <Select
        label="Source"
        className="max-w-sm min-w-64"
        placeholder="Select source"
        value={sources}
        variant="bordered"
        color="primary"
        selectedKeys={sources}
        onChange={(e) => handleSourceChange(e.target.value)}
        selectionMode="multiple"
        size="sm"
      >
        {Object.keys(sourceOptions).map((key) => (
          <SelectItem key={key}>{sourceOptions[key as Source]}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SourceFilter;
