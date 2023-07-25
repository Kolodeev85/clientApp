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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../context/tokenContext";
import { useContext, useEffect, useState } from "react";
import { ServicesStrapi } from "../../services/Strapi.service";
import { useSnackbar } from "notistack";

const CrearePassOffAreaForm = (props) => {
  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const today = dayjs();

  const token = useContext(TokenContext);
  const { getAreaById } = ServicesStrapi;

  const {
    isCreatePassOffAreaFormOpen,
    toogleCreatePassOffAreaForm,
    id,
    onLoadingAllAreas,
    isIssueFormOpen,
    onCloseIssueModal,
  } = props;

  const navigate = useNavigate();
  const [dataAreaById, setDataAreaById] = useState({});
  const [loading, setLoading] = useState(false);

  const onLoadingAreaById = (token, id) => {
    setLoading(true);
    getAreaById(token, id)
      .then((res) => setDataAreaById(res))
      .finally(() => setLoading(false));
  };

  const { number } = dataAreaById;
  const lastId =
    dataAreaById?.histories?.[dataAreaById?.histories?.length - 1]?.id;

  useEffect(() => {
    onLoadingAreaById(token, id);
  }, [id]);

  const [desc, setDesc] = useState(null);
  const [check, setCheck] = useState(false);

  console.log(check);

  const onSubmitDataPassOffForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const responseHistory = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/histories/${lastId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              description: desc ? desc : null,
              dateOfEnd: today,
            },
          }),
        }
      );
      if (!check) {
        await fetch(`${process.env.REACT_APP_STRAPI_API_URL}/areas/${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              statusName: "free",
              publisher: null,
              subevent: null,
              startDate: null,
              endDate: null,
            },
          }),
        });
      } else {
        await fetch(`${process.env.REACT_APP_STRAPI_API_URL}/areas/${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              statusName: "unactive",
              publisher: null,
              subevent: null,
              startDate: null,
              endDate: null,
            },
          }),
        });
      }
      if (responseHistory.status === 200) {
        enqueueSnackbar(`Участок ${number} сдан успешно!`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(`Произошла ошибка при сдачи участка ${number}!`, {
          variant: "error",
        });
      }
    } catch (e) {
      console.log("Ошибка");
    }
    setLoading(false);
    onLoadingAllAreas(token);
    navigate("/areas");
  };

  return (
    <Modal
      open={isCreatePassOffAreaFormOpen || isIssueFormOpen}
      onClose={() => navigate(`/area/${id}`)}
      aria-labelledby="modal-window-passOff-area"
      aria-describedby="modal-window-passOff-area"
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
      <Box className={classes.modalWindowPassOffForm}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <IconButton
            onClick={toogleCreatePassOffAreaForm || onCloseIssueModal}
            sx={{ ml: "95%", mt: "-10px" }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ mb: 4, ml: 2, fontWeight: "520", color: deepPurple[500] }}
          >
            {number ? `Cдать участок ${number}` : null}
          </Typography>
          <form onSubmit={onSubmitDataPassOffForm}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Дата сдачи участка"
                  format="DD/MM/YYYY"
                  sx={{
                    ".css-1wc848c-MuiFormHelperText-root": {
                      m: 0,
                      pt: 1,
                      mb: 3,
                      color: orange[900],
                    },
                    width: "90%",
                    ml: 3,
                  }}
                  defaultValue={today}
                  disabled
                  slotProps={{
                    textField: {
                      helperText: "Дата сдачи участка",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              name="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              label="Примечания"
              multiline
              rows={5}
              fullWidth
              helperText="Добавьте примечания такие, как грубые отказы, иностранцы, пожелания, код двери и т.д"
              sx={{
                ".css-1wc848c-MuiFormHelperText-root": {
                  m: 0,
                  pt: "8px",
                  color: orange[900],
                },
                width: "90%",
                ml: 3,
                mb: 4,
              }}
            ></TextField>
            <FormControlLabel
              control={
                <Checkbox
                  checked={check}
                  onChange={(e) => setCheck(e.target.checked)}
                />
              }
              label='Отметьте для того, чтобы участок стал "Неактивным"'
              id="1"
              style={{ marginBottom: "24px", marginLeft: "10px" }}
            />
            <Button
              type="submit"
              variant="text"
              fullWidth="true"
              className={classes.btnReturnArea}
              disabled={loading}
            >
              {loading ? "Загрузка" : "Сдать"}
            </Button>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

export default CrearePassOffAreaForm;
