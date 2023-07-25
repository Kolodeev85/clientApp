import {
  Modal,
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useStyles } from "../../style/useStyle";
import { deepPurple, orange } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../context/tokenContext";
import { useSnackbar } from "notistack";
import { ServicesStrapi } from "../../services/Strapi.service";

const CreateNewEventForm = (props) => {
  const {
    isModalWindowCreateEventOpen,
    toogleModalWindowCreateEvent,
    onLoadingEvents,
    eventId,
  } = props;

  const { classes } = useStyles();
  const token = useContext(TokenContext);
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(null);

  const { getAllSubEvent } = ServicesStrapi;

  const [dataEvent, setDataEvent] = useState(null);

  const getAllEventList = (token) => {
    getAllSubEvent(token).then((res) => setDataEvent(res));
  };

  useEffect(() => {
    getAllEventList(token);
  }, []);

  const onSubmitDataEvent = async (e) => {
    e.preventDefault();

    const checkEvent = dataEvent.find((item) => item.name === name);

    if (!name) {
      enqueueSnackbar("Нужно дать название событию!", { variant: "warning" });
      return;
    }

    if (checkEvent) {
      enqueueSnackbar("Событие с таким названием существует!", {
        variant: "error",
      });
      setName("");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/subevents`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              name: name ? name : undefined,
              event: eventId,
            },
          }),
        }
      );
      if (response.status === 200) {
        enqueueSnackbar(`Событие ${name} создана успешно`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Произошла ошибка при создании события", {
          variant: "error",
        });
      }
    } catch (e) {
      enqueueSnackbar("Произошла ошибка при создании собятия", {
        variant: "error",
      });
    }
    setLoading(false);
    onLoadingEvents(token);
    setName("");
    toogleModalWindowCreateEvent();
  };

  return (
    <Modal
      open={isModalWindowCreateEventOpen}
      onClose={toogleModalWindowCreateEvent}
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
          backgroundColor: "rgba(12, 1, 13, 0.81)",
        },
      }}
    >
      <Paper elevation={2} className={classes.modalWindow}>
        <Box sx={{ p: 4 }}>
          <IconButton
            onClick={toogleModalWindowCreateEvent}
            sx={{ ml: "90%", mt: "-10px" }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ mb: 4, mt: 2, fontWeight: "520", color: deepPurple[500] }}
          >
            Создание события
          </Typography>
          <form onSubmit={onSubmitDataEvent}>
            <TextField
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Название событиe"
              variant="outlined"
              fullWidth
              helperText="Дайте название событию "
              sx={{
                ".css-1wc848c-MuiFormHelperText-root": {
                  m: 0,
                  pt: 1,
                  color: orange[900],
                  mb: "32px",
                },
              }}
              color="primary"
            ></TextField>
            <Button
              type="submit"
              variant="text"
              fullWidth="true"
              className={classes.btnCreatEvent}
              disable={loading}
            >
              Создать
            </Button>
          </form>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CreateNewEventForm;
