import { Box, Stack, Typography } from "@mui/material";
import image from "../../img/areas-not-found.png";
import { deepPurple } from "@mui/material/colors";
import { Image } from "react-bootstrap";
import { useStyles } from "../../style/useStyle";

const NotAreaError = () => {
  const { classes } = useStyles();
  return (
    <Box sx={{ height: "200px", backgroundColor: "white" }}>
      <Stack
        direction="column"
        spacing={2}
        justifyContent="center"
        textAlign="center"
      >
        <Typography variant="h4" className={classes.h1AreasNotFound}>
          Участки не найдены!
        </Typography>
        <div>
          <Image className={classes.imageNotAreas} src={image} />
        </div>
      </Stack>
    </Box>
  );
};

export default NotAreaError;
