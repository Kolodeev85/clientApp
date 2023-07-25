import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { deepPurple, orange } from "@mui/material/colors";
import { useStyles } from "../../style/useStyle";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { TokenContext } from "../../context/tokenContext";
import { ServicesStrapi } from "../../services/Strapi.service";

const CreateAddNewParticipantForm = ({
  onOpenModalWindow,
  onCloseModalWindow,
}) => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down(1450));
  const isMobile1 = useMediaQuery(breakpoints.down(1200));

  const { classes } = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const token = useContext(TokenContext);

  const myRef = useRef();
  useEffect(() => {
    myRef.current?.focus();
  }, []);

  useEffect(() => {
    onOpenModalWindow();
    return () => onCloseModalWindow();
  }, [onOpenModalWindow, onCloseModalWindow]);

  const { getAllPublisher } = ServicesStrapi;

  const [dataPublisher, setDataPublisher] = useState(null);

  const getAllPublishers = (token) => {
    getAllPublisher(token).then((res) => setDataPublisher(res));
  };

  useEffect(() => {
    getAllPublishers(token);
  }, []);

  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [note, setNote] = useState(null);

  const onSubmitData = async (e) => {
    e.preventDefault();

    const checkFullName = dataPublisher.find(
      (item) => item.fullName === fullName
    );
    const phoneNumberRegex = /^\d{10}$/;

    if (!fullName) {
      enqueueSnackbar("Укажите фамилию и имя возвещателя!", {
        variant: "warning",
      });
      return;
    }

    if (checkFullName) {
      enqueueSnackbar(
        "Возвещатель с таким именем и фамилией уже есть в системе!",
        { variant: "error" }
      );
      return;
    }

    if (!phoneNumberRegex.test(phoneNumber) || /\s/.test(phoneNumber)) {
      enqueueSnackbar(
        "Номер нужно вводить без пробелов в формате: 0951112233!",
        {
          variant: "error",
        }
      );
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/publishers`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              fullName: fullName ? fullName : undefined,
              phoneNumber: phoneNumber ? phoneNumber : undefined,
              email: email ? email : undefined,
              note: note ? note : undefined,
            },
          }),
        }
      );
      if (response.status === 200) {
        enqueueSnackbar(`Возвещатель ${fullName} добавлен успешно!`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Произошла ошибка при добавлении возвещателя", {
          variant: "error",
        });
      }
    } catch (e) {
      enqueueSnackbar("Произошла ошибка при добавлении возвещателя", {
        variant: "error",
      });
    }

    setLoading(false);
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setNote("");
    navigate("/team-list");
    getAllPublishers(token);
  };

  return (
    <Box className={classes.mainBoxCreatForm2}>
      <Paper elevation={2} sx={{ height: "auto" }}>
        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" className={classes.h1AddPub}>
              Добавить возвещателя
            </Typography>
            <IconButton
              className={classes.closeIconAddPub}
              onClick={() => navigate("/team-list")}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <form onSubmit={onSubmitData}>
            <Stack
              direction={isMobile1 ? "column" : "row"}
              spacing={2}
              className={classes.Stack1AddNewPub}
            >
              <TextField
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Имя"
                variant="outlined"
                fullWidth
                helperText="Укажите фамилию и имя возвещателя"
                sx={{
                  ".css-1wc848c-MuiFormHelperText-root": {
                    m: 0,
                    pt: "8px",
                    color: orange[900],
                  },
                }}
                color="primary"
                inputRef={myRef}
              ></TextField>

              <TextField
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                label="Номет телефона"
                variant="outlined"
                fullWidth
                helperText="Укажите номер телефона возвещателя в формате: 0951112233"
                sx={{
                  ".css-1wc848c-MuiFormHelperText-root": {
                    m: 0,
                    pt: "8px",
                    color: orange[900],
                  },
                }}
              ></TextField>
            </Stack>
            <Stack
              direction="row"
              spacing={5}
              className={classes.Stack1AddNewPub}
            >
              <TextField
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
                fullWidth
                helperText="Укажите адрес электронной почты"
                sx={{
                  ".css-1wc848c-MuiFormHelperText-root": {
                    m: 0,
                    pt: "8px",
                    color: orange[900],
                  },
                }}
              ></TextField>
            </Stack>
            <Stack
              direction="row"
              spacing={5}
              className={classes.Stack1AddNewPub}
              sx={{ mb: 9 }}
            >
              <TextField
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                label="Полезная информация"
                multiline
                rows={3}
                fullWidth
                helperText="Укажите полезную иформацию при необходимости"
                sx={{
                  ".css-1wc848c-MuiFormHelperText-root": {
                    m: 0,
                    pt: "8px",
                    color: orange[900],
                  },
                }}
              ></TextField>
            </Stack>
            <Stack
              justifyContent="end"
              textAlign="center"
              direction="row"
              spacing={2}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "20%", mr: 19, mb: "58px", p: 2 }}
                className={classes.addBtnPub}
                startIcon={!isMobile ? <AddIcon /> : null}
                disabled={loading}
              >
                {!isMobile ? "Добавить" : <AddIcon />}
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateAddNewParticipantForm;
