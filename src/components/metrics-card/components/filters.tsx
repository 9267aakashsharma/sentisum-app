import { MetricsFilters, Severity, Source } from "../types";
import SearchBar from "./searchbar";
import SeverityFilter from "./severity-filter";
import SourceFilter from "./source-filter";

interface FiltersProps {
  filters: MetricsFilters;
  onChange: (filters: MetricsFilters) => void;
}

const Filters = ({ filters, onChange }: FiltersProps) => {
  const onUpdateSearchQuery = (searchQuery: string) => {
    onChange({ ...filters, searchQuery });
  };

  const onUpdateSeverities = (selectedSeverities: Severity[]) => {
    onChange({ ...filters, severities: selectedSeverities });
  };

  const onUpdateSources = (selectedSources: Source[]) => {
    onChange({ ...filters, sources: selectedSources });
  };

  return (
    <>
      <SearchBar query={filters.searchQuery} onChange={onUpdateSearchQuery} />
      <div className="flex gap-4 justify-between items-center">
        <SeverityFilter
          severities={filters.severities}
          onChange={onUpdateSeverities}
        />
        <SourceFilter sources={filters.sources} onChange={onUpdateSources} />
      </div>
    </>
  );
};

export default Filters;
