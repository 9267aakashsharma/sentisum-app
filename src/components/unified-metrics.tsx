import { useState } from "react";
import { GlowingEffect } from "./aceternity/glowing-effect";
import AreaDataChart from "./area-chart";
import { cn, commonColors, semanticColors } from "@heroui/react";
import { hexa } from "@/lib/helpers";
import Color from "color";
import Icon, { IconName } from "./icons/icon";
import { nanoid } from "nanoid";

type Metrics = {
  id: string;
  name: string;
  source: string;
  color: string;
  value: number;
  percentageChange: number;
  changeType: "increase" | "decrease" | "no change";
  data: string[];
};

const metrics: Metrics[] = [
  {
    id: "1",
    name: "CSAT",
    source: "Survey",
    color: "#1447E6",
    value: 85,
    percentageChange: 5,
    changeType: "increase",
    data: ["2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04"],
  },
  {
    id: "2",
    name: "NPS",
    source: "Survey",
    color: "#00BC7D",
    value: 70,
    percentageChange: -3,
    changeType: "decrease",
    data: [
      "2023-01-01",
      "2023-01-02",
      "2023-01-03",
      "2023-01-04",
      "2023-01-05",
    ],
  },
  {
    id: "3",
    name: "Ticket Count",
    source: "System",
    color: "#FE9A00",
    value: 1200,
    percentageChange: 0,
    changeType: "no change",
    data: ["2023-01-01", "2023-01-02"],
  },
  {
    id: "4",
    name: "Resolution Time",
    source: "System",
    color: "#AD46FF",
    value: 24,
    percentageChange: 10,
    changeType: "increase",
    data: [
      "2023-01-01",
      "2023-01-02",
      "2023-01-03",
      "2023-01-04",
      "2023-01-05",
      "2023-01-06",
    ],
  },
  {
    id: "5",
    name: "First Contact",
    source: "Survey",
    color: "#FF2056",
    value: 90,
    percentageChange: -2,
    changeType: "decrease",
    data: ["2023-01-02", "2023-01-03"],
  },
];

const UnifiedMetrics = () => {
  const [selectedMetric, setSelectedMetric] = useState<Metrics | null>(
    metrics[0]
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

      <div className="overflow-x-auto overflow-y-visible mt-2 flex items-start gap-2 no-scrollbar">
        {metrics.map((metric) => {
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

          const isSelected = selectedMetric?.id === metric.id;

          return (
            <div
              onClick={() => setSelectedMetric(metric)}
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
                      <linearGradient
                        id={id}
                        x1="100%"
                        x2="0%"
                        y1="100%"
                        y2="0%"
                      >
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
