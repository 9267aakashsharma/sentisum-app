import Color from "color";
import { nanoid } from "nanoid";
import { cn, commonColors, semanticColors } from "@heroui/react";

import { hexa } from "@/lib/helpers";
import { unifiedMetrics } from "../constants";
import Icon, { IconName } from "../../icons/icon";

import type { UnifiedMetricsDetails } from "../types";

interface MetricsOverviewProps {
  metrics?: UnifiedMetricsDetails;
  onChange: (metric: UnifiedMetricsDetails) => void;
}

const MetricsOverview = ({ metrics, onChange }: MetricsOverviewProps) => {
  return (
    <div className="overflow-x-auto overflow-y-visible mt-2 flex items-start gap-2 no-scrollbar">
      {unifiedMetrics.map((metric) => {
        const id = nanoid();
        const scale =
          metric.changeType === "increase"
            ? semanticColors.light.success
            : metric.changeType === "decrease"
            ? semanticColors.light.danger
            : commonColors.blue;

        const iconName: IconName =
          metric.changeType === "increase"
            ? "arrow-top"
            : metric.changeType === "decrease"
            ? "arrow-bottom"
            : "arrow-right";

        const isSelected = metrics?.id === metric.id;

        return (
          <div
            onClick={() => onChange(metric)}
            key={metric.id}
            className={cn(
              "pt-8 transform ease-in-out duration-300 cursor-pointer hover:-translate-y-2",
              {
                "-translate-y-3 hover:-translate-y-2": isSelected,
              }
            )}
          >
            <div
              style={{
                borderColor: hexa(metric.color, 0.3),
              }}
              className={cn("p-1 rounded-xl border min-w-48 relative", {})}
            >
              <span
                className="absolute bottom-full inline-flex gap-1 items-center border-t border-x text-tiny left-2.5 px-2 rounded-t-lg"
                style={{
                  backgroundColor: hexa(metric.color, 0.1),
                  color: metric.color,
                  borderColor: hexa(metric.color, 0.3),
                }}
              >
                {metric.source}
                {isSelected && (
                  <Icon name="check-circle" color={metric.color} size={12} />
                )}
              </span>
              <div className="inset-0 absolute rounded-xl overflow-hidden z-0">
                <svg
                  className="absolute inset-0"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={id} x1="100%" x2="0%" y1="100%" y2="0%">
                      <stop offset="0%" stopColor={metric.color} />
                      <stop offset="100%" stopColor={metric.color} />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="0,0 100,100 0,100"
                    fill={"url(#" + id + ")"}
                    opacity={0.3}
                  />
                </svg>
              </div>
              <div className="inset-0 bg-neutral-100/30 backdrop-blur-md absolute z-0 rounded-xl" />
              <div className="py-2 px-3 relative z-10">
                <span className="font-semibold text-tiny uppercase">
                  {metric.name}
                </span>
                <div className="flex items-center justify-between">
                  <p className="font-extrabold text-2xl text-black">
                    {Intl.NumberFormat("en-IN").format(metric.value)}
                  </p>
                  <div
                    className="font-semibold flex flex-row gap-1.5 py-1 rounded-lg px-1 text-tiny uppercase"
                    style={{
                      backgroundColor: hexa(Color(scale[500]!).hex(), 0.1),
                    }}
                  >
                    <div
                      className="h-4 w-4 rounded-md flex justify-center items-center"
                      style={{
                        backgroundColor: hexa(Color(scale[700]!).hex(), 0.2),
                      }}
                    >
                      <Icon name={iconName} color={scale[700]} size={10} />
                    </div>
                    <span style={{ color: scale[700] }}>
                      {metric.percentageChange > 0 && "+"}
                      {metric.percentageChange}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsOverview;
