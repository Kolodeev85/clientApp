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

const AllAreasStatisticByEventGroup = ({ data }) => {
  const renameData = data.map((item) => {
    return { ...item, помещения: item.areas, areas: undefined };
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
        <Line type="monotone" dataKey="помещения" stroke="#fbc02d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AllAreasStatisticByEventGroup;
