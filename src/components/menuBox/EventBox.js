import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Collapse,
  useTheme,
} from "@mui/material";
import { useStyles } from "../../style/useStyle";
import { red, orange, green } from "@mui/material/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useContext, useState } from "react";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { TokenContext } from "../../context/tokenContext";
import { useSnackbar } from "notistack";
import { ServicesStrapi } from "../../services/Strapi.service";

const EventBox = (props) => {
  const { classes } = useStyles();
  const { palette } = useTheme();
  const token = useContext(TokenContext);
  const { enqueueSnackbar } = useSnackbar();

  const {
    selectedIndexEvent,
    handleListItemClickEvent,
    handleListItemClickSubEvent,
    selectedIndexSubEvent,
    toogleModalWindowCreateGroupEvent,
    toogleModalWindowCreateEvent,
    onLoadingEvents,
    dataEvents,
    setEventId,
    setAreasList,
    onButtonHidden,
    setShowPaginationButton,
  } = props;

  const [openEventIndex, setOpenEventIndex] = useState(null);

  const {
    deleteEventGroup,
    deleteSubEvent,
    getAllAreasByEventGroup,
    getAllAreasBySubEventGroup,
  } = ServicesStrapi;

  const onDeleteEventGroup = (token, id, name) => {
    deleteEventGroup(token, id)
      .then(() => onLoadingEvents(token))
      .finally(() =>
        enqueueSnackbar(`Удаление группы ${name} прошло успешно!`, {
          variant: "success",
        })
      );
  };

  const onDeleteSubEvent = (token, id, name) => {
    deleteSubEvent(token, id)
      .then(() => onLoadingEvents(token))
      .catch(() =>
        enqueueSnackbar(`Ошибка при удалении события ${name}`, {
          variant: "success",
        })
      )
      .finally(() =>
        enqueueSnackbar(`Событие ${name} удалено успешно!`, {
          variant: "success",
        })
      );
  };

  const onLoadingAllAreasByEventGroup = (token, id) => {
    getAllAreasByEventGroup(token, id).then((res) => setAreasList(res.areas));
  };

  const onLoadingAllAreasBySubEventGroup = (token, id) => {
    getAllAreasBySubEventGroup(token, id).then((res) =>
      setAreasList(res.areas)
    );
  };

  return (
    <Accordion sx={{ boxShadow: "none" }}>
      <AccordionSummary>
        <EventAvailableIcon sx={{ mt: "5px", mr: "10px" }} />
        <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
          Текущие события
        </Typography>
      </AccordionSummary>
      <AccordionSummary>
        <AccordionDetails sx={{ width: "100%", maxWidth: "100%" }}>
          {dataEvents?.length === 0 && <p>События не созданы</p>}
          {dataEvents
            ?.slice()
            .sort((a, b) => a.name?.localeCompare(b.name))
            .map((item, i) => {
              const hasSubevents = item.subevents && item.subevents.length > 0;
              const isOpen = openEventIndex === i;
              return (
                <List component="nav" key={item.id}>
                  <ListItemButton
                    key={item.id}
                    className={classes.btnList}
                    selected={selectedIndexEvent === i}
                    onClick={(event) => {
                      if (hasSubevents) {
                        setOpenEventIndex(isOpen ? null : i);
                      }
                      handleListItemClickEvent(event, i);
                      onLoadingAllAreasByEventGroup(token, item.id);

                      onButtonHidden(true);
                      setShowPaginationButton(false);
                    }}
                  >
                    <ListItemIcon>
                      <MapsHomeWorkOutlinedIcon
                        sx={{ color: palette.primary.main }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item.nameEvent} />
                    {hasSubevents ? (
                      isOpen ? (
                        <ExpandLess sx={{ mr: "25px" }} />
                      ) : (
                        <ExpandMore sx={{ mr: "25px" }} />
                      )
                    ) : (
                      <ListItemIcon>
                        <Tooltip
                          title="Удалить"
                          onClick={() =>
                            onDeleteEventGroup(token, item.id, item.nameEvent)
                          }
                        >
                          <IconButton>
                            <DeleteOutlineIcon sx={{ color: `${red[200]}` }} />
                          </IconButton>
                        </Tooltip>
                      </ListItemIcon>
                    )}
                    <ListItemIcon>
                      <Tooltip title="Добавить событие">
                        <IconButton
                          onClick={() => {
                            toogleModalWindowCreateEvent();
                            setEventId(item.id);
                          }}
                        >
                          <AddIcon sx={{ color: `${green[800]}` }} />
                        </IconButton>
                      </Tooltip>
                    </ListItemIcon>
                  </ListItemButton>
                  {hasSubevents &&
                    isOpen &&
                    item?.subevents
                      ?.slice()
                      .sort((a, b) => a.name?.localeCompare(b.name))
                      .map((subItem, j) => {
                        return (
                          <Collapse
                            in={isOpen}
                            timeout="auto"
                            unmountOnExit
                            key={subItem.id}
                          >
                            <List
                              component="div"
                              disablePadding
                              key={subItem.id}
                            >
                              <ListItemButton
                                sx={{ pl: 4 }}
                                key={subItem.id}
                                selected={selectedIndexSubEvent === j}
                                onClick={(event) => {
                                  handleListItemClickSubEvent(event, j);
                                  onLoadingAllAreasBySubEventGroup(
                                    token,
                                    subItem.id
                                  );
                                  setShowPaginationButton(false);
                                }}
                              >
                                <ListItemIcon>
                                  <AttachFileIcon
                                    sx={{ color: `${orange.A700}` }}
                                  />
                                </ListItemIcon>
                                <ListItemText primary={subItem.name} />
                                <ListItemIcon>
                                  <Tooltip title="Удалить">
                                    <IconButton
                                      sx={{ mr: 5 }}
                                      onClick={() =>
                                        onDeleteSubEvent(
                                          token,
                                          subItem.id,
                                          subItem.name
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
              onClick={toogleModalWindowCreateGroupEvent}
              variant="text"
              className={classes.btnGroop}
              startIcon={<AddIcon />}
              fullWidth="true"
            >
              Создать группу событий
            </Button>
          </List>
        </AccordionDetails>
      </AccordionSummary>
    </Accordion>
  );
};

export default EventBox;
