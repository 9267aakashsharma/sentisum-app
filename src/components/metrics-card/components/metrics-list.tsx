import { useMemo } from "react";
import { format } from "date-fns";
import { Accordion, AccordionItem, Button, Chip } from "@heroui/react";

import Icon from "@/components/icons/icon";
import { Metrics, MetricsFilters } from "../types";
import { getHeroUIColorBySeverity } from "../utils";
import SlackButton from "@/components/slack-button";

interface MetricsListProps {
  metrics: Metrics[];
  filters: MetricsFilters;
  onSelectMetrics: (metrics: Metrics | null) => void;
}

const MetricsList = ({
  metrics,
  filters,
  onSelectMetrics,
}: MetricsListProps) => {
  const filteredMetrics = useMemo(() => {
    return metrics.filter((metric) => {
      const matchesSeverity =
        filters.severities.length === 0 ||
        filters.severities.includes(metric.severity);
      const matchesSource =
        filters.sources.length === 0 || filters.sources.includes(metric.source);
      const matchesSearch =
        metric.title
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        metric.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());

      return matchesSeverity && matchesSource && matchesSearch;
    });
  }, [metrics, filters]);

  return (
    <Accordion selectionMode="multiple">
      {filteredMetrics.map((metric) => (
        <AccordionItem
          key={metric.id}
          title={
            <div className="flex items-center justify-between gap-2">
              {metric.title}
              <Chip
                size="sm"
                variant="flat"
                radius="sm"
                className="font-text shrink-0 uppercase h-5 min-w-fit text-[10px] font-semibold"
                color={getHeroUIColorBySeverity(metric.severity)}
              >
                {metric.severityText ?? metric.severity}
              </Chip>
            </div>
          }
          classNames={{
            trigger: "py-2.5 font-text flex items-center",
            title: "text-small font-medium",
          }}
        >
          <div className="-mt-2.5">
            <p className="text-sm">{metric.description}</p>

            <div className="flex flex-wrap justify-between gap-2 mt-1.5">
              <div className="flex gap-px -ml-3 items-center">
                <Button
                  variant="light"
                  color="primary"
                  className="shrink-0 h-7 items-center flex"
                  radius="sm"
                  size="sm"
                  onPress={() => onSelectMetrics(metric)}
                  startContent={
                    <Icon name="external-link-2" className="-mr-1" size={14} />
                  }
                >
                  View
                </Button>
                <Button
                  variant="light"
                  color="primary"
                  className="shrink-0 h-7 items-center flex"
                  radius="sm"
                  size="sm"
                  onPress={() => onSelectMetrics(metric)}
                  startContent={
                    <Icon name="archive" className="-mr-1" size={14} />
                  }
                >
                  Archive
                </Button>
              </div>
              <div className="flex gap-px items-center">
                <SlackButton onClick={() => {}} />
              </div>
            </div>
            <div className="inline-flex items-center gap-2">
              <p className="text-tiny">
                {format(new Date(metric.timestamp), "E dd, hh:mm aaa")}
              </p>
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default MetricsList;
