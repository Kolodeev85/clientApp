import QueryStatsIcon from "@mui/icons-material/QueryStats";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useStyles } from "../../style/useStyle";
import { useNavigate } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";

const StatisticBox = ({ selectedIndex, handleListItemClick }) => {
  const { classes } = useStyles();
  const { palette } = useTheme();
  const navigate = useNavigate();

  return (
    <Accordion sx={{ boxShadow: "none" }}>
      <AccordionSummary>
        <QueryStatsIcon sx={{ mt: "5px", mr: "10px" }} />
        <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
          Статистика
        </Typography>
      </AccordionSummary>
      <AccordionSummary>
        <AccordionDetails sx={{ width: "100%" }}>
          <List component="nav">
            <ListItemButton
              className={classes.btnList}
              selected={selectedIndex === 0}
              onClick={(event) => {
                handleListItemClick(event, 0);
                navigate("/statistic-page");
              }}
            >
              <ListItemIcon>
                <ListIcon sx={{ color: palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary="Статистика" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </AccordionSummary>
    </Accordion>
  );
};

export default StatisticBox;
