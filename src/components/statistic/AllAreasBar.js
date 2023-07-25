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

const AllAreasBar = ({ data }) => {
  const renameData = data.map((item) => {
    return { ...item, помещения: item.areas, areas: undefined };
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
        <Bar dataKey="помещения" stackId="a" fill="#fbc02d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AllAreasBar;
