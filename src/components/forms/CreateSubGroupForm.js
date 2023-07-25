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

const CreateSubGroupForm = (props) => {
  const { classes } = useStyles();
  const token = useContext(TokenContext);
  const { enqueueSnackbar } = useSnackbar();

  const { toogleModalSubGroupOpen, isModalSubGroupOpen, onLoadingAllGroup } =
    props;

  const { nameGroup, idGroup } = props;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { getAllSubGroups } = ServicesStrapi;

  const [dataGroup, setDataGroup] = useState(null);

  const getAllSubGroupList = (token) => {
    getAllSubGroups(token).then((res) => setDataGroup(res));
  };

  useEffect(() => {
    getAllSubGroupList(token);
  }, []);

  const onSubmitDataCreateSubGroup = async (e) => {
    e.preventDefault();

    const checkGroup = dataGroup.find((item) => item.name === name);

    if (!name) {
      enqueueSnackbar("Укажите название подгруппы", { variant: "warning" });
      return;
    }

    if (checkGroup) {
      enqueueSnackbar("Подгруппа с таким названием существует", {
        variant: "error",
      });
      setName("");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/subgroups`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              name: name ? name : undefined,
              group: idGroup,
            },
          }),
        }
      );
      if (response.status === 200) {
        enqueueSnackbar(`Подгруппа ${name} создана успешно`, {
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
    onLoadingAllGroup(token);
    setName("");
    toogleModalSubGroupOpen();
  };

  return (
    <Modal
      open={isModalSubGroupOpen}
      onClose={toogleModalSubGroupOpen}
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
          backgroundColor: "rgba(12, 1, 13, 0.81)",
        },
      }}
    >
      <Paper elevation={2} className={classes.modalWindow}>
        <Box sx={{ p: 4 }}>
          <IconButton
            sx={{ ml: "90%", mt: "-10px" }}
            onClick={toogleModalSubGroupOpen}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ mb: 4, mt: 2, fontWeight: "520", color: deepPurple[500] }}
          >
            {`Создание подгруппы для группы ${nameGroup}`}
          </Typography>
          <form onSubmit={onSubmitDataCreateSubGroup}>
            <TextField
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Название подгруппы"
              variant="outlined"
              fullWidth
              helperText={`Дайте название подгруппе`}
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
              className={classes.btnCreatSubGroup}
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

export default CreateSubGroupForm;
