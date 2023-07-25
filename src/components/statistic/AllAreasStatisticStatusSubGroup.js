import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const AllAreasStatisticStatusSubGroup = ({ data }) => {
  const renameData = data.map((item) => {
    return {
      ...item,
      свободные: item.free,
      free: undefined,
      активные: item.active,
      active: undefined,
      неактивные: item.unactive,
      unactive: undefined,
      задержаные: item.holded,
      holded: undefined,
    };
  });
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        width={650}
        height={300}
        data={renameData}
        margin={{ left: -20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          stackId="1"
          dataKey="свободные"
          stroke="#2196f3"
          fill="#2196f3"
        />
        <Area
          type="monotone"
          stackId="1"
          dataKey="активные"
          stroke="#2e7d32"
          fill="#2e7d32"
        />
        <Area
          type="monotone"
          stackId="1"
          dataKey="неактивные"
          stroke="#212121"
          fill="#212121"
        />
        <Area
          type="monotone"
          stackId="1"
          dataKey="задержаные"
          stroke="#d32f2f"
          fill="#d32f2f"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AllAreasStatisticStatusSubGroup;
