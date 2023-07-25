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

const AllAreasLine = ({ data }) => {
  const renameData = data.map((item) => {
    return { ...item, помещения: item.areas, areas: undefined };
  });
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={renameData} margin={{ left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="помещения" stroke="#424242" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AllAreasLine;
