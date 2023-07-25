import {
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  Legend,
  Bar,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const AllAreasStatusStatistic = ({ data }) => {
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
      <BarChart
        width={700}
        height={300}
        data={renameData}
        margin={{ left: -20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="свободные"
          stackId="a"
          fill="#2196f3"
          background={{ fill: "#ede7f6" }}
        />
        <Bar dataKey="активные" stackId="a" fill="#2e7d32" />
        <Bar dataKey="неактивные" stackId="a" fill="#212121" />
        <Bar dataKey="задержаные" stackId="a" fill="#d32f2f" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AllAreasStatusStatistic;
