import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import TableViewIcon from "@mui/icons-material/TableView";
import { useStyles } from "../../style/useStyle";
import { deepPurple, red, orange, green } from "@mui/material/colors";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useContext, useState } from "react";
import StarBorder from "@mui/icons-material/StarBorder";
import { ServicesStrapi } from "../../services/Strapi.service";
import { TokenContext } from "../../context/tokenContext";
import { useSnackbar } from "notistack";

const GroupBox = (props) => {
  const { classes } = useStyles();
  const { palette } = useTheme();
  const token = useContext(TokenContext);
  const { enqueueSnackbar } = useSnackbar();

  const {
    selectedIndex,
    handleListItemClick,
    toogleModalWindowCreateGroup,
    toogleModalSubGroupOpen,
    handleListItemClickSubGroup,
    selectedIndexSubGroup,
    onLoadingAllGroup,
    dataGroup,
    setIdGroup,
    setNameGroup,
    setSubName,
    setAreasList,
    onLoadingAllAreas,
    onButtonHidden,
    setShowPaginationButton,
  } = props;

  const [openGroupIndex, setOpenGroupIndex] = useState(null);

  const {
    deleteGroup,
    deleteSubGroup,
    getAllAreasByGroup,
    getAllAreasBySubGroup,
  } = ServicesStrapi;

  const onDeleteGroup = (token, id, name) => {
    deleteGroup(token, id)
      .then(() => onLoadingAllGroup(token))
      .finally(() =>
        enqueueSnackbar(`Торговый центр ${name} удален успешно!`, {
          variant: "success",
        })
      );
  };

  const onDeleteSubGroup = (token, id, name) => {
    deleteSubGroup(token, id)
      .then(() => onLoadingAllGroup(token))
      .finally(() =>
        enqueueSnackbar(`Этаж ${name} удален успешно!`, {
          variant: "success",
        })
      );
  };

  const onLoadingAllAreasByGroup = (token, id) => {
    getAllAreasByGroup(token, id).then((res) => setAreasList(res.areas));
  };

  const onLoadingAllAreasBySubGroup = (token, id) => {
    getAllAreasBySubGroup(token, id).then((res) => setAreasList(res.areas));
  };

  return (
    <Accordion sx={{ boxShadow: "none" }}>
      <AccordionSummary>
        <TableViewIcon sx={{ mt: "5px", mr: "10px" }} />
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            color: palette.secondary.main,
          }}
        >
          Торговые центры
        </Typography>
      </AccordionSummary>
      <AccordionSummary>
        <AccordionDetails sx={{ width: "100%" }}>
          {dataGroup?.length === 0 ? null : (
            <List component="nav">
              <ListItemButton
                className={classes.btnList}
                selected={selectedIndex === 0}
                onClick={(event) => {
                  handleListItemClick(event, 0);
                  onLoadingAllAreas(token);
                  setShowPaginationButton(true);
                }}
              >
                <ListItemIcon>
                  <MapsHomeWorkOutlinedIcon
                    sx={{ color: palette.primary.main }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Все"
                  onClick={() => {
                    setNameGroup(undefined);
                    setSubName(undefined);
                    onButtonHidden(false);
                  }}
                />
              </ListItemButton>
            </List>
          )}

          {dataGroup?.length === 0 && <p>Торговые центры не созданы!</p>}
          {dataGroup
            ?.slice()
            .sort((a, b) => a.name?.localeCompare(b.name))
            .map((item, i) => {
              const hasSubgroups = item.subgroups && item.subgroups.length > 0;
              const isOpen = openGroupIndex === i;
              return (
                <List component="nav" key={item.id}>
                  <ListItemButton
                    key={item.id}
                    className={classes.btnList}
                    selected={selectedIndex === i + 1}
                    onClick={(event) => {
                      if (hasSubgroups) {
                        setOpenGroupIndex(isOpen ? null : i);
                      }
                      handleListItemClick(event, i + 1);
                      onLoadingAllAreasByGroup(token, item.id);
                      setNameGroup(item.name);
                      setSubName(undefined);
                      onButtonHidden(false);
                      setShowPaginationButton(false);
                    }}
                  >
                    <ListItemIcon>
                      <MapsHomeWorkOutlinedIcon
                        sx={{ color: palette.primary.main }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                    {hasSubgroups ? (
                      isOpen ? (
                        <ExpandLess sx={{ mr: "25px" }} />
                      ) : (
                        <ExpandMore sx={{ mr: "25px" }} />
                      )
                    ) : (
                      <ListItemIcon>
                        <Tooltip title="Удалить">
                          <IconButton
                            onClick={() =>
                              onDeleteGroup(token, item.id, item.name)
                            }
                          >
                            <DeleteOutlineIcon sx={{ color: `${red[200]}` }} />
                          </IconButton>
                        </Tooltip>
                      </ListItemIcon>
                    )}
                    <ListItemIcon>
                      <Tooltip title="Добавить этаж">
                        <IconButton
                          onClick={() => {
                            toogleModalSubGroupOpen();
                            setIdGroup(item.id);
                            onButtonHidden(false);
                          }}
                        >
                          <AddIcon sx={{ color: `${green[800]}` }} />
                        </IconButton>
                      </Tooltip>
                    </ListItemIcon>
                  </ListItemButton>
                  {hasSubgroups &&
                    isOpen &&
                    item?.subgroups
                      ?.slice()
                      .sort((a, b) => a.name?.localeCompare(b.name))
                      .map((itemSub, j) => {
                        return (
                          <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            <List
                              component="div"
                              disablePadding
                              key={itemSub.id}
                            >
                              <ListItemButton
                                sx={{ pl: 4 }}
                                selected={selectedIndexSubGroup === j}
                                onClick={(event) => {
                                  handleListItemClickSubGroup(event, j);
                                  onLoadingAllAreasBySubGroup(
                                    token,
                                    itemSub.id
                                  );
                                  setSubName(itemSub.name);
                                  setShowPaginationButton(false);
                                }}
                              >
                                <ListItemIcon>
                                  <StarBorder
                                    sx={{ color: `${orange.A700}` }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={`${itemSub.name} этаж`}
                                />
                                <ListItemIcon>
                                  <Tooltip title="Удалить">
                                    <IconButton
                                      sx={{ mr: 5 }}
                                      onClick={() =>
                                        onDeleteSubGroup(
                                          token,
                                          itemSub.id,
                                          itemSub.name
                                        )
                                      }
                                    >
                                      <DeleteOutlineIcon
                                        sx={{ color: `${red[200]}` }}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </ListItemIcon>
                              </ListItemButton>
                            </List>
                          </Collapse>
                        );
                      })}
                </List>
              );
            })}

          <List>
            <Button
              onClick={toogleModalWindowCreateGroup}
              variant="text"
              className={classes.btnGroop}
              startIcon={<AddIcon />}
              fullWidth="true"
            >
              Добавить торговый центр
            </Button>
          </List>
        </AccordionDetails>
      </AccordionSummary>
    </Accordion>
  );
};

export default GroupBox;
