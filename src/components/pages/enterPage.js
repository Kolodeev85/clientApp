import {
  Stack,
  TextField,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useStyles } from "../../style/useStyle";
import { orange } from "@mui/material/colors";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const EnterPage = (props) => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down(950));
  const navigate = useNavigate();

  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { onAuth: handleAuth } = props;
  const onAuth = (token) => {
    handleAuth(token);
    navigate("/areas");
  };

  const [login, setlogin] = useState("");
  const [pass, setPass] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (login === "") {
      enqueueSnackbar("Поле Логин не должно быть пустым", {
        variant: "error",
      });
      return;
    }
    if (pass.length < 6) {
      enqueueSnackbar("Пароль должен содержать не менее 6 символов", {
        variant: "error",
      });
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/auth/local`,
        {
          method: "POST",
          body: JSON.stringify({
            identifier: login,
            password: pass,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 400) {
        enqueueSnackbar("Не верный логин или пароль", { variant: "error" });
      }
      const data = await response.json();
      if (response.status === 200) {
        enqueueSnackbar(`Добро пожаловать ${data.user.username}!`, {
          variant: "success",
        });
      }
      setlogin("");
      setPass("");
      localStorage.setItem("token", data.jwt);
      onAuth(data.jwt);
    } catch (e) {
      enqueueSnackbar("Что-то пошло не так", { variant: "error" });
    }
  };

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      justifyContent="center"
      textAlign="center"
      alignItems="stretch"
    >
      <Stack
        justifyContent="center"
        textAlign="start"
        direction="column"
        sx={{
          width: isMobile ? "70%" : "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          sx={{ pb: 2, color: "primary.main", fontWeight: 550 }}
          className={classes.stask1}
          variant="h5"
        >
          Войти
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            name="username"
            onChange={(e) => setlogin(e.target.value)}
            value={login}
            label="Логин"
            variant="outlined"
            helperText={!login ? "Введите имя пользователя" : ""}
            sx={{
              width: "100%",
              mb: 2,
              ".css-1wc848c-MuiFormHelperText-root": {
                m: 0,
                pt: 1,
                color: orange[900],
              },
            }}
          />
          <TextField
            name="password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            label="Пароль"
            variant="outlined"
            helperText={!pass ? "Введите пароль" : ""}
            sx={{
              width: "100%",
              mb: 2,
              ".css-1wc848c-MuiFormHelperText-root": {
                m: 0,
                pt: 1,
                color: orange[900],
              },
            }}
          />
          {login && pass && (
            <Button
              type="submit"
              variant="text"
              className={classes.enterBtn}
              sx={{ p: 1.5, ml: "80%" }}
            >
              Войти
            </Button>
          )}
        </form>
      </Stack>
    </Stack>
  );
};
export default EnterPage;
