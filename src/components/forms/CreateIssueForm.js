import {
  Modal,
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import { useStyles } from "../../style/useStyle";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../context/tokenContext";
import { ServicesStrapi } from "../../services/Strapi.service";
import { useSnackbar } from "notistack";
import { AreaCardDocument } from "../../pdf/AreaCardDocument";

const CreateIssueForm = (props) => {
  const { classes } = useStyles();
  const { palette } = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  dayjs.locale("ru");

  const {
    toogleCreateIssueForm,
    isCreateIssueForm,
    id,
    onLoadingAllAreas,
    isIssueFormOpen,
    onCloseIssueModal,
  } = props;
  const today = dayjs();
  const tomorrow = dayjs().add(90, "day");

  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [allDays, setAllDays] = useState(tomorrow.diff(today, "day"));
  const helpText = `Расчетная дата окончания аренды: ${selectedDate.format(
    "DD/MM/YYYY"
  )}. Срок аренды: ${allDays + 1}  дней`;

  useEffect(() => {
    const newAllDays = selectedDate.diff(today, "day");
    setAllDays(newAllDays);
  }, [selectedDate, today]);

  const navigate = useNavigate();

  const changeDate = (date) => {
    setSelectedDate(date);
  };

  const token = useContext(TokenContext);

  const { getAllEvents, getAllPublisher, getAreaById } = ServicesStrapi;

  const [dataEvent, setDataEvent] = useState([]);
  const [dataPublishers, setDataPublishers] = useState([]);
  const [dataAreaById, setDataAreaById] = useState({});
  const [loading, setLoading] = useState(false);

  const onLoadingDataEvents = (token) => {
    setLoading(true);
    getAllEvents(token)
      .then((res) => setDataEvent(res))
      .catch((error) => console.log(error, "Ошибка загрузки"))
      .finally(() => setLoading(false));
  };

  const onLoadingDataPublishers = (token) => {
    setLoading(true);

    getAllPublisher(token)
      .then((res) => setDataPublishers(res))
      .catch((error) => console.log(error, "Ошибка загрузки"))
      .finally(() => setLoading(false));
  };

  const onLoadingAreaById = (token, id) => {
    getAreaById(token, id).then((res) => setDataAreaById(res));
  };

  useEffect(() => {
    onLoadingDataEvents(token);
  }, []);
  useEffect(() => {
    onLoadingDataPublishers(token);
  }, []);

  useEffect(() => {
    onLoadingAreaById(token, id);
  }, [id]);

  const [publisher, setPublisher] = useState(null);
  const [event, setEvent] = useState(null);
  const [subEvent, setSubEvent] = useState(null);
  const [subevents, setSubevents] = useState({});

  useEffect(() => {
    const filteredData = dataEvent.filter((obj) => obj.id === event);
    setSubevents(filteredData);
  }, [event, dataEvent]);

  const onSubmitDataIssueForm = async (e) => {
    e.preventDefault();

    if (publisher === null) {
      enqueueSnackbar("Добавьте арендат", { variant: "warning" });
      return;
    }
    setLoading(true);
    try {
      const responseHistory = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/histories`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              dateOfEnd: selectedDate ? selectedDate : undefined,
              publisher: publisher ? publisher : undefined,
              event: event ? event : undefined,
              area: id ? id : undefined,
              subevent: subEvent ? subEvent : undefined,
            },
          }),
        }
      );
      const responseArea = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/areas/${id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              statusName: "active",
              publisher: publisher ? publisher : undefined,
              event: event ? event : undefined,
              subevent: subEvent ? subEvent : null,
              startDate: today,
              endDate: selectedDate,
            },
          }),
        }
      );
      if (responseHistory.status && responseArea.status === 200) {
        enqueueSnackbar(`Помещение ${number} арендовано успешно!`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(`Произошла ошибка при аренде помещения ${number}!`, {
          variant: "error",
        });
      }
    } catch (e) {
      enqueueSnackbar("Произошла ошибка!", {
        variant: "error",
      });
    }
    setLoading(false);
    setPublisher("");
    setEvent("");
    setSubEvent("");
    setSubevents("");
    onLoadingAreaById(token, id);
    onLoadingAllAreas(token);
    onShowBtn();
  };

  const { number } = dataAreaById;

  const [showBtn, setShowBtn] = useState(true);
  const onShowBtn = () => setShowBtn(!showBtn);

  const handleBoxClick = () => {
    setTimeout(() => {
      navigate("/areas");
    }, 1000);
  };

  return (
    <Modal
      open={isCreateIssueForm || isIssueFormOpen}
      onClose={() => navigate(`/area/${id}`)}
      aria-labelledby="modal-window-create-event"
      aria-describedby="modal-window-create-event"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      sx={{
        ".css-sox5kk-MuiBackdrop-root": {
          backgroundColor: "rgba(25, 25, 0, 0.81)",
        },
      }}
    >
      <Box className={classes.modalWindowPassOffForm}>
        <Paper elevation={2} className={classes.paperIssueForm}>
          <IconButton
            onClick={toogleCreateIssueForm || onCloseIssueModal}
            className={classes.iconBtnIssueForm}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" className={classes.h5IssueForm}>
            {number ? `Аренда помещения: ${number}` : null}
          </Typography>
          <form onSubmit={onSubmitDataIssueForm}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ display: "block" }}
              >
                <Stack direction="column" spacing={2}>
                  <DatePicker
                    name="dateOfEnd"
                    onChange={changeDate}
                    label="Дата окончания аренды"
                    format="DD/MM/YYYY"
                    sx={{
                      ".css-1wc848c-MuiFormHelperText-root": {
                        m: 0,
                        pt: 1,
                        color: palette.secondary.main,
                      },
                    }}
                    defaultValue={tomorrow}
                    slotProps={{
                      textField: {
                        helperText: helpText,
                      },
                    }}
                    disabled={!showBtn}
                  />
                  <TextField
                    label="Арендатор"
                    name="publisher"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    variant="outlined"
                    select
                    helperText={
                      loading
                        ? "Идет загрузка данных..."
                        : dataPublishers.length === 0
                        ? "Нет арендаторов в системе"
                        : "Выберите арендатора"
                    }
                    disabled={
                      loading || dataPublishers.length === 0 || !showBtn
                    }
                    sx={{
                      ".css-1wc848c-MuiFormHelperText-root": {
                        m: 0,
                        pt: "8px",
                        color: palette.secondary.main,
                      },
                    }}
                    color="secondary"
                  >
                    {dataPublishers
                      ?.slice()
                      .sort((a, b) => a.fullName?.localeCompare(b.fullName))
                      .map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.fullName}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                  <TextField
                    label="Группа событий"
                    name="events"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    variant="outlined"
                    select
                    helperText={
                      loading
                        ? "Идет загрузка группы событий..."
                        : dataEvent.length === 0
                        ? "Нет группы событий"
                        : "Выберите группу событий"
                    }
                    sx={{
                      ".css-1wc848c-MuiFormHelperText-root": {
                        m: 0,
                        pt: "8px",
                        color: palette.secondary.main,
                      },
                    }}
                    disabled={loading || dataEvent.length === 0 || !showBtn}
                    color="secondary"
                  >
                    {dataEvent
                      ?.slice()
                      .sort((a, b) => a.name?.localeCompare(b.name))
                      .map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item?.nameEvent}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                  {subevents[0]?.subevents?.length === 0 ||
                  !subevents[0]?.subevents ? null : (
                    <TextField
                      label="Событие"
                      name="subevents"
                      value={subEvent}
                      onChange={(e) => setSubEvent(e.target.value)}
                      variant="outlined"
                      select
                      helperText={
                        loading
                          ? "Идет загрузка событий..."
                          : dataEvent.length === 0
                          ? "Нет событий"
                          : "Выберите событие"
                      }
                      sx={{
                        ".css-1wc848c-MuiFormHelperText-root": {
                          m: 0,
                          pt: "8px",
                          color: palette.secondary.main,
                        },
                      }}
                      disabled={!showBtn}
                      color="secondary"
                    >
                      {subevents[0]?.subevents
                        ?.slice()
                        .sort((a, b) => a.name?.localeCompare(b.name))
                        .map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.id}>
                              {item?.name}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  )}
                </Stack>
              </DemoContainer>
            </LocalizationProvider>
            {showBtn ? (
              <Button
                type="submit"
                variant="text"
                fullWidth="true"
                className={classes.btnIssue}
                disabled={loading}
              >
                {loading ? "Загрузка" : "Арендовать"}
              </Button>
            ) : (
              <Box className={classes.btnIssueLink} onClick={handleBoxClick}>
                <AreaCardDocument dataAreaById={dataAreaById} />
              </Box>
            )}
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

export default CreateIssueForm;
