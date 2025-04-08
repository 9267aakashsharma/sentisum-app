import { useState } from "react";
import { cn } from "@heroui/react";

import { defaultFilters } from "./constants";
import MetricsList from "./components/metrics-list";
import MetricsModal from "./components/metrics-modal";
import MetricsHeader from "./components/metrics-header";
import { GlowingEffect } from "../aceternity/glowing-effect";

import type { MetricsFilters, Metrics } from "./types";

interface MetricsCardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  metrics: Metrics[];
}

const MetricsCard = ({
  title,
  metrics,
  className,
  ...props
}: MetricsCardLayoutProps) => {
  const [selectedMetrics, setSelectedMetrics] = useState<Metrics | null>(null);
  const [filters, setFilters] = useState<MetricsFilters>({ ...defaultFilters });

  const resetFilters = () => {
    setFilters({ ...defaultFilters });
  };

  const handleMetricsModalClose = () => {
    setSelectedMetrics(null);
  };

  return (
    <div
      className={cn(
        "shadow-md border bg-white border-gray-200 rounded-xl p-4 relative",
        className
      )}
      {...props}
    >
      <GlowingEffect
        blur={0}
        borderWidth={2}
        spread={40}
        glow={true}
        disabled={false}
        proximity={34}
        inactiveZone={0.01}
      />
      <MetricsHeader
        title={title}
        filters={filters}
        onResetFilters={resetFilters}
        onChangeFilters={setFilters}
      />
      <div className="mt-4">
        <MetricsList
          metrics={metrics}
          filters={filters}
          onSelectMetrics={setSelectedMetrics}
        />
      </div>
      <MetricsModal
        metrics={selectedMetrics}
        onClose={handleMetricsModalClose}
      />
    </div>
  );
};

export default MetricsCard;
export type { Metrics };
