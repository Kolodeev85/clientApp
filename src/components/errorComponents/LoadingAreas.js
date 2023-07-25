import { Stack } from "@mui/material";
import cube from "../../img/svg/Cube.gif";
import { Image } from "react-bootstrap";

const LoadingAreas = () => {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <Image src={cube} />
    </Stack>
  );
};

export default LoadingAreas;
