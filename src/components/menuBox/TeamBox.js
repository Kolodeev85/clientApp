import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ListIcon from "@mui/icons-material/List";
import { useStyles } from "../../style/useStyle";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const TeamBox = ({ selectedIndex, handleListItemClick }) => {
  const { classes } = useStyles();

  const navigate = useNavigate();

  return (
    <Accordion sx={{ boxShadow: "none" }}>
      <AccordionSummary>
        <GroupsIcon sx={{ mt: "5px", mr: "10px" }} />
        <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
          Возвещатели
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
                navigate("/team-list");
              }}
            >
              <ListItemIcon>
                <ListIcon sx={{ color: `${deepPurple[500]}` }} />
              </ListItemIcon>
              <ListItemText primary="Возвещатели" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </AccordionSummary>
    </Accordion>
  );
};

export default TeamBox;
