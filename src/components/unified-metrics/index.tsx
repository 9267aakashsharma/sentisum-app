import { useState } from "react";

import AreaDataChart from "../area-chart";
import { unifiedMetrics } from "./constants";
import MetricsOverview from "./components/metrics-overview";
import { GlowingEffect } from "../aceternity/glowing-effect";

import type { UnifiedMetricsDetails } from "./types";

const UnifiedMetrics = () => {
  const [selectedMetric, setSelectedMetric] = useState<UnifiedMetricsDetails>(
    unifiedMetrics[0]
  );

  return (
    <div className="shadow-md border bg-white border-gray-200 rounded-xl p-4 relative">
      <GlowingEffect
        blur={0}
        borderWidth={2}
        spread={40}
        glow={true}
        disabled={false}
        proximity={34}
        inactiveZone={0.01}
      />
      <p className="text-xl font-semibold">Unified Metrics</p>
      <MetricsOverview metrics={selectedMetric} onChange={setSelectedMetric} />
      <div className="mt-10">
        {selectedMetric && (
          <AreaDataChart
            minHeight={400}
            data={selectedMetric.data}
            fillColor={selectedMetric.color || "rgba(68, 76, 231, 0.2)"}
            strokeColor={selectedMetric.color || "rgba(68, 76, 231, 0.2)"}
          />
        )}
      </div>
    </div>
  );
};

export default UnifiedMetrics;
