import { Button, Stack, useTheme, useMediaQuery } from "@mui/material";
import { useStyles } from "../../style/useStyle";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const HeaderCreateParticipant = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down(1450));
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Stack direction="row" justifyContent="end">
      <Stack sx={{ mt: "10px", mr: "70px" }}>
        <Button
          onClick={() => navigate("/team-list/create")}
          variant="contained"
          className={classes.createPublisherBtn}
          sx={{ p: 2 }}
          startIcon={!isMobile ? <AddIcon /> : null}
        >
          {!isMobile ? "Добавить арендатора" : <AddIcon />}
        </Button>
      </Stack>
    </Stack>
  );
};

export default HeaderCreateParticipant;
