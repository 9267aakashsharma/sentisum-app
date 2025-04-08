import { format } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const isValidDate = (date: string) => {
  try {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  } catch {
    return false;
  }
};

function generateRandomData(name: string) {
  return {
    name: isValidDate(name) ? format(new Date(name), "MMM d, yyyy") : name,
    uv: Math.floor(Math.random() * 4000),
    pv: Math.floor(Math.random() * 2400),
    amt: Math.floor(Math.random() * 2400),
  };
}

const AreaDataChart = ({
  data,
  fillColor,
  strokeColor,
  minHeight = 400,
  minWidth = 500,
}: {
  data: string[];
  fillColor: string;
  strokeColor: string;
  minHeight?: number;
  minWidth?: number;
}) => {
  const chartData = data.map((item) => generateRandomData(item));

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight={minHeight}
      minWidth={minWidth}
    >
      <AreaChart
        width={500}
        height={400}
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className="font-text text-sm" dy={6} />
        <YAxis className="font-text text-sm" dx={-6} />
        <Tooltip />
        <Area
          dataKey="uv"
          type="monotone"
          stroke={strokeColor || "#8884d8"}
          fill={fillColor || "#8884d8"}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaDataChart;
