import {
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
  TableBody,
  Alert,
  Modal,
  Backdrop,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import avatar from "../../img/avatar.png";
import { useStyles } from "../../style/useStyle";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TokenContext } from "../../context/tokenContext";
import { ServicesStrapi } from "../../services/Strapi.service";
import { createImageURL } from "../../utils";
import { useSnackbar } from "notistack";
import { AreaCardDocument } from "../../pdf/AreaCardDocument";

const ItemAreaPanel = (props) => {
  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { breakpoints, palette } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down(1500));
  const isMobileBtn = useMediaQuery(breakpoints.down(850));
  const isMobilePadding = useMediaQuery(breakpoints.down(500));

  const { onDeleteArea, onOpenModalWindow, onCloseModalWindow } = props;

  const [isAlertActive, setIsAlertActive] = useState(false);
  const onDeleteAreaAlert = () => setIsAlertActive(!isAlertActive);

  const [disabledInput, setDisabledInput] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const onModalImageOpen = (imgSrc) => {
    setModalImage(imgSrc);
    setIsModalOpen(true);
  };

  useEffect(() => {
    onOpenModalWindow();
    return () => onCloseModalWindow();
  }, [onOpenModalWindow, onCloseModalWindow]);

  const navigate = useNavigate();

  const { id } = useParams();
  const token = useContext(TokenContext);
  const { getAreaById } = ServicesStrapi;
  const [idHistory, setIdHistory] = useState(null);

  const [dataAreaById, setDataAreaById] = useState({});
  const [loading, setLoading] = useState(false);

  const onLoadingAreaById = (token, id) => {
    setLoading(true);

    getAreaById(token, id)
      .then((res) => setDataAreaById(res))
      .finally(() => setLoading(false));
  };

  const onActiveArea = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
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
              statusName: "free",
            },
          }),
        }
      );
      if (responseArea.status === 200) {
        enqueueSnackbar("Помещение вновь активно!", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Произошла ошибка при активации помещения!", {
          variant: "error",
        });
      }
    } catch (e) {
      enqueueSnackbar("Произошла ошибка!", {
        variant: "error",
      });
    }
    setLoading(false);
    onLoadingAreaById(token, id);
  };

  useEffect(() => {
    onLoadingAreaById(token, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [areaInfo, setAreaInfo] = useState("");
  const [areaDesc, setAreaDesc] = useState("");

  const onUpdateInfoDesc = async () => {
    try {
      const updatedInfo = info ? info + " " + areaInfo : areaInfo;
      const updatedDesc = description ? description + " " + areaDesc : areaDesc;

      const response = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/areas/${id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              info: updatedInfo ? updatedInfo : undefined,
              description: updatedDesc ? updatedDesc : undefined,
            },
          }),
        }
      );
      if (response.status === 200) {
        enqueueSnackbar("Данные обновлены успешно!", {
          variant: "success",
        });
      } else {
        enqueueSnackbar(
          "Произошла ошибка при обновлении данных об помещении!",
          {
            variant: "error",
          }
        );
      }
    } catch (e) {
      enqueueSnackbar("Произошла ошибка при обновлении данных об помещении!", {
        variant: "error",
      });
    }
    onLoadingAreaById(token, id);
  };

  const onClickFunction = () => {
    if (disabledInput) {
      onUpdateInfoDesc();
    }
    setDisabledInput(!disabledInput);
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const {
    number,
    statusName,
    adress,
    info,
    image,
    description,
    histories,
    group,
    subgroup,
  } = dataAreaById;

  let className;
  let statusNames;
  switch (statusName) {
    case "free":
      className = classes.badgeFree;
      statusNames = "Свободные";
      break;
    case "active":
      className = classes.badgeBusy;
      statusNames = "Сданные";
      break;
    case "unactive":
      className = classes.badgeInactive;
      statusNames = "Недоступные";
      break;
    case "holded":
      className = classes.badgeDetainees;
      statusNames = "Оконченные";
      break;
    default:
      className = classes.badgeFree;
      statusNames = "Свободные";
  }

  return (
    <Box component="div" sx={{ backgroundColor: "#FAF9F9", mt: 2 }}>
      {isAlertActive ? (
        <Stack
          direction={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent="center"
          spacing={2}
          className={classes.alertContent}
        >
          <Alert variant="outlined" severity="error">
            Внимание! Помещение и связаная с ним история будут удалены с сервера
            без возможности восстановления. Вы уверены?
          </Alert>
          <Stack direction="row">
            <Button
              onClick={() => {
                onDeleteArea(token, id, number);
                setIsAlertActive(!isAlertActive);
              }}
              color="inherit"
              size="small"
              className={classes.btnTo}
            >
              Да
            </Button>
            <Button
              color="inherit"
              size="small"
              className={classes.btnTo}
              onClick={() => setIsAlertActive(!isAlertActive)}
            >
              Нет
            </Button>
          </Stack>
        </Stack>
      ) : null}
      {loading && <LinearProgress variant="determinate" value={progress} />}
      <Grid container>
        <Grid item xs={12} sx={{ p: isMobilePadding ? 0 : 2 }}>
          <Paper elevation={2}>
            <Stack
              direction={isMobile ? "column-reverse" : "row"}
              spacing={6}
              className={classes.staskItemPanelHead}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  onClick={() =>
                    onModalImageOpen(createImageURL(image?.url) || avatar)
                  }
                  className={classes.imgAvatarArea}
                  src={createImageURL(image?.url) || avatar}
                  alt="картинка карточки"
                />
                <AreaCardDocument dataAreaById={dataAreaById} />
              </Stack>
              <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
                <Stack
                  direction="row"
                  sx={{ width: "100%" }}
                  justifyContent="space-between"
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: "550",
                      fontSize: "35px",
                      color: `${palette.secondary.main}`,
                      pt: 1,
                    }}
                  >
                    {number ? `Помещение: ${number}` : null}
                  </Typography>
                  <IconButton
                    sx={{ height: "40px" }}
                    onClick={() => {
                      navigate("/areas");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <Typography sx={{ fontSize: "12px", pb: "5px" }}>
                  {`${group?.name ? group?.name : "Нет торгового центра"}${
                    subgroup?.name ? ` (${subgroup?.name})` : ""
                  }`}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    p: "8px 13px 8px 10px",
                  }}
                  className={className}
                >
                  {statusNames}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "rgba(0, 0, 0, 0.6)",

                    pb: 1,
                  }}
                >
                  {adress ? `${adress}` : null}
                </Typography>
                <Stack direction="column" spacing={2}>
                  <Box>
                    <Typography sx={{ fontWeight: 600, pb: 1, fontSize: 20 }}>
                      Информация:
                    </Typography>
                    {info ? info : "Нет информации об помещении"}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, pb: 1, fontSize: 20 }}>
                      Описание:
                    </Typography>
                    {description ? description : "Нет описания помещения"}
                  </Box>
                  {disabledInput ? (
                    <>
                      <TextField
                        name="info"
                        value={areaInfo}
                        onChange={(e) => setAreaInfo(e.target.value)}
                        label="Информация"
                        multiline
                        rows={2}
                        sx={{ width: "90%", pb: 2 }}
                        color="secondary"
                      ></TextField>
                      <TextField
                        name="description"
                        value={areaDesc}
                        onChange={(e) => setAreaDesc(e.target.value)}
                        label="Описание"
                        multiline
                        rows={2}
                        sx={{ width: "90%", pb: 2 }}
                        color="secondary"
                      ></TextField>
                    </>
                  ) : null}
                </Stack>
                <Stack
                  direction={isMobileBtn ? "column" : "row"}
                  justifyContent={isMobileBtn ? "start" : "end"}
                  sx={{ pt: 2 }}
                >
                  <Stack direction="row">
                    <Button
                      onClick={() => navigate("/area-issue")}
                      variant="text"
                      className={classes.btnTo2}
                      disabled={
                        statusName === "active" ||
                        statusName === "unactive" ||
                        statusName === "holded"
                      }
                    >
                      Аренда
                    </Button>
                    <Button
                      onClick={() => navigate("/area-return")}
                      variant="text"
                      className={classes.btnEnd}
                      disabled={
                        statusName === "free" || statusName === "unactive"
                      }
                    >
                      Завершить
                    </Button>
                  </Stack>
                  <Stack direction="row">
                    <Button
                      variant="text"
                      className={classes.btnTo2}
                      onClick={onClickFunction}
                    >
                      {!disabledInput ? "Редактировать" : "Сохранить"}
                    </Button>
                    <Button
                      onClick={onDeleteAreaAlert}
                      variant="text"
                      className={classes.btnEnd}
                    >
                      Удалить
                    </Button>
                    <Stack direction="row">
                      <Button
                        onClick={onActiveArea}
                        variant="text"
                        className={classes.btnActive}
                        style={{
                          display: statusName === "unactive" ? "block" : "none",
                        }}
                        disabled={loading}
                      >
                        {loading ? "Активация" : "Активировать"}
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.staskItemPanel}>
          <Paper elevation={2}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "550",
                color: palette.secondary.main,
                fontSize: "25px",
                pt: 4,
                pl: 6,
                pb: 3,
              }}
            >
              История
            </Typography>
            <TableContainer sx={{ maxHeight: "400px", overflow: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{ borderTop: `1px solid ${palette.primary.main}` }}
                  >
                    <TableCell
                      className={classes.tableCell}
                      sx={{
                        pl: 4,
                        borderBottom: `1px solid ${palette.primary.main}`,
                        width: "25%",
                      }}
                    >
                      Даты аренды:
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      sx={{ borderBottom: `1px solid ${palette.primary.main}` }}
                    >
                      Арендатор:
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      sx={{
                        borderBottom: `1px solid ${palette.primary.main}`,
                        width: "10%",
                      }}
                    >
                      Группа события:
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      sx={{ borderBottom: `1px solid ${palette.primary.main}` }}
                    >
                      Событие:
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      sx={{
                        width: "30%",
                        borderBottom: `1px solid ${palette.primary.main}`,
                      }}
                    >
                      Примечания:
                    </TableCell>
                  </TableRow>
                </TableHead>
                {histories?.length === 0 && (
                  <Stack textAlign="center">
                    <div className={classes.notAreas}>
                      Нет истории обработки участка
                    </div>
                  </Stack>
                )}
                {histories?.map((item, i) => {
                  const createdAt = item?.createdAt
                    ? new Date(item.createdAt)
                    : null;
                  const dateOfEnd = item?.dateOfEnd
                    ? new Date(item.dateOfEnd)
                    : null;
                  if (createdAt && dateOfEnd) {
                    const timeDiff = Math.abs(
                      dateOfEnd.getTime() - createdAt.getTime()
                    );
                    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    return (
                      <TableBody
                        key={item.id}
                        onClick={() => setIdHistory(item.id)}
                      >
                        <TableRow>
                          <TableCell sx={{ pl: 4 }}>
                            {`${i + 1}.  ${new Date(
                              createdAt
                            ).toLocaleDateString("ru-RU", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })} - ${new Date(dateOfEnd).toLocaleDateString(
                              "ru-RU",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )} : (${diffDays} день(ей))`}
                          </TableCell>
                          <TableCell>{item?.publisher?.fullName}</TableCell>
                          <TableCell>
                            {item?.event?.nameEvent
                              ? item?.event?.nameEvent
                              : "нет данных"}
                          </TableCell>
                          <TableCell>
                            {item?.subevent?.name
                              ? item?.subevent?.name
                              : "нет данных"}
                          </TableCell>
                          <TableCell>
                            {item?.description
                              ? item?.description
                              : "Нет заметок"}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    );
                  } else {
                    return null;
                  }
                })}
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      {
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
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
          <Box>
            <img
              src={modalImage}
              alt="Карта участка"
              className={classes.modalZoomImage}
            />
          </Box>
        </Modal>
      }
    </Box>
  );
};

export default ItemAreaPanel;
