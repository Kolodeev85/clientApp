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

const AllAreasBySubEventBar = ({ data }) => {
  const renameData = data.map((item) => {
    return { ...item, участки: item.areas, areas: undefined };
  });
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={700}
        height={300}
        data={renameData}
        margin={{
          left: -20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="участки" stackId="a" fill="#673ab7" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AllAreasBySubEventBar;
