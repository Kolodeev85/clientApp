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

const CreateNewEventsGroupForm = (props) => {
  const { classes } = useStyles();
  const token = useContext(TokenContext);
  const { enqueueSnackbar } = useSnackbar();

  const {
    toogleModalWindowCreateGroupEvent,
    isModalWindowCreateEventGroupOpen,
    onLoadingEvents,
  } = props;

  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getAllEvents } = ServicesStrapi;

  const [dataEvent, setDataEvent] = useState(null);

  const getAllEventList = (token) => {
    getAllEvents(token).then((res) => setDataEvent(res));
  };

  useEffect(() => {
    getAllEventList(token);
  }, []);

  const onSubmitDataCreateGroupEvent = async (e) => {
    e.preventDefault();

    const checkEvent = dataEvent.find((item) => item.nameEvent === name);

    if (!name) {
      enqueueSnackbar("Укажите название группы", { variant: "warning" });
      return;
    }

    if (checkEvent) {
      enqueueSnackbar("Группа событий с таким названием существует", {
        variant: "error",
      });
      setName("");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/events`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              nameEvent: name ? name : undefined,
            },
          }),
        }
      );
      if (response.status === 200) {
        enqueueSnackbar(`группа ${name} создана успешно`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Произошла ошибка при создании группы", {
          variant: "error",
        });
      }
    } catch (e) {
      enqueueSnackbar("Произошла ошибка при создании группы", {
        variant: "error",
      });
    }
    setLoading(false);
    setName("");
    onLoadingEvents(token);
    toogleModalWindowCreateGroupEvent();
  };

  return (
    <Modal
      open={isModalWindowCreateEventGroupOpen}
      onClose={toogleModalWindowCreateGroupEvent}
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
            onClick={toogleModalWindowCreateGroupEvent}
            sx={{ ml: "90%", mt: "-10px" }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ mb: 4, mt: 2, fontWeight: "520", color: deepPurple[500] }}
          >
            Создание группы событий
          </Typography>
          <form onSubmit={onSubmitDataCreateGroupEvent}>
            <TextField
              name="nameEvent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Название группы событий"
              variant="outlined"
              fullWidth
              helperText="Дайте название группе событий "
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
              className={classes.btnCreatSubEvent}
              disabled={loading}
            >
              Создать
            </Button>
          </form>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CreateNewEventsGroupForm;
