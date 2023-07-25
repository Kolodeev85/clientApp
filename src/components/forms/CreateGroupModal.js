import {
  Modal,
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useStyles } from "../../style/useStyle";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../context/tokenContext";
import { useSnackbar } from "notistack";
import { ServicesStrapi } from "../../services/Strapi.service";

const CreateGroupModal = (props) => {
  const { classes } = useStyles();
  const { palette } = useTheme();
  const token = useContext(TokenContext);
  const { enqueueSnackbar } = useSnackbar();

  const {
    toogleModalWindowCreateGroup,
    isModalWindowCreateGroupOpen,
    onLoadingAllGroup,
  } = props;

  const [name, setName] = useState(null);

  const [loading, setLoading] = useState(false);

  const { getAllGroup } = ServicesStrapi;

  const [dataGroup, setDataGroup] = useState(null);

  const getAllGroupList = (token) => {
    getAllGroup(token).then((res) => setDataGroup(res));
  };

  useEffect(() => {
    getAllGroupList(token);
  }, []);

  const onSubmitDataCreateGroup = async (e) => {
    e.preventDefault();

    const checkGroup = dataGroup.find((item) => item.name === name);

    if (!name) {
      enqueueSnackbar("Укажите название торгового центра!", {
        variant: "warning",
      });
      return;
    }

    if (checkGroup) {
      enqueueSnackbar("Торговый центр с таким названием существует!", {
        variant: "error",
      });
      setName("");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/groups`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              name: name ? name : undefined,
            },
          }),
        }
      );
      if (response.status === 200) {
        enqueueSnackbar(`Торговый центр "${name}" создана успешно!`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Произошла ошибка при создании торгового центра", {
          variant: "error",
        });
      }
    } catch (e) {
      enqueueSnackbar("Произошла ошибка при создании торгового центра", {
        variant: "error",
      });
    }
    setLoading(false);
    setName("");
    onLoadingAllGroup(token);
    toogleModalWindowCreateGroup();
  };

  return (
    <Modal
      open={isModalWindowCreateGroupOpen}
      onClose={toogleModalWindowCreateGroup}
      aria-labelledby="modal-window-create-group"
      aria-describedby="modal-window-create-group"
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
          zIndex: 999,
        },
      }}
    >
      <Paper elevation={2} className={classes.modalWindow}>
        <Box sx={{ p: 4 }}>
          <IconButton
            onClick={toogleModalWindowCreateGroup}
            sx={{ ml: "90%", mt: "-10px" }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              mt: 2,
              fontWeight: "520",
              color: palette.secondary.main,
            }}
          >
            Создание торгового центра
          </Typography>
          <form onSubmit={onSubmitDataCreateGroup}>
            <TextField
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Название торгового центра"
              variant="outlined"
              fullWidth
              helperText="Дайте название торговому центру "
              sx={{
                ".css-1wc848c-MuiFormHelperText-root": {
                  m: 0,
                  pt: 1,
                  color: palette.secondary.main,
                  mb: "32px",
                },
              }}
              color="secondary"
            ></TextField>
            <Button
              type="submit"
              variant="text"
              fullWidth="true"
              className={classes.btbCreatGroup}
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

export default CreateGroupModal;
