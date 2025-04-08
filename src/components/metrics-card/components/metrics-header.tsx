import { Button } from "@heroui/react";
import { useState } from "react";
import Filters from "./filters";
import { MetricsFilters } from "../types";
import Icon from "@/components/icons/icon";

interface MetricsHeaderProps {
  title: string;
  filters: MetricsFilters;
  onResetFilters: () => void;
  onChangeFilters: (filters: MetricsFilters) => void;
}

const MetricsHeader = ({
  title,
  filters,
  onResetFilters,
  onChangeFilters,
}: MetricsHeaderProps) => {
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 justify-between">
        <p className="font-semibold text-lg">{title}</p>
        <div className="flex gap-px items-center">
          <Button
            variant={areFiltersVisible ? "solid" : "light"}
            color="primary"
            className="shrink-0 h-7 items-center flex"
            radius="sm"
            size="sm"
            onPress={() => {
              if (areFiltersVisible) onResetFilters();
              setAreFiltersVisible(!areFiltersVisible);
            }}
            startContent={<Icon name="filter-2" className="-mr-1" size={14} />}
          >
            Filters
          </Button>
          <Button
            variant="light"
            color="primary"
            className="shrink-0 h-7 items-center flex"
            radius="sm"
            size="sm"
            endContent={<Icon name="arrow-right" className="-ml-1" size={14} />}
          >
            View all
          </Button>
        </div>
      </div>
      {areFiltersVisible && (
        <Filters filters={filters} onChange={onChangeFilters} />
      )}
    </>
  );
};

export default MetricsHeader;
