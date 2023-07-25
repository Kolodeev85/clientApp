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

const AllAreasByEventGroupBar = ({ data }) => {
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
          left: -40,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="участки" stackId="a" fill="#f57c00" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AllAreasByEventGroupBar;
