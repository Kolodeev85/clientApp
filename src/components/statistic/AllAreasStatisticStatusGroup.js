import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AllAreasStatisticStatusGroup = ({ data }) => {
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
      <LineChart
        width={650}
        height={300}
        data={renameData}
        margin={{ left: -40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="свободные" stroke="#2196f3" />
        <Line type="monotone" dataKey="активные" stroke="#2e7d32" />
        <Line type="monotone" dataKey="неактивные" stroke="#212121" />
        <Line type="monotone" dataKey="задержаные" stroke="#d32f2f" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AllAreasStatisticStatusGroup;
