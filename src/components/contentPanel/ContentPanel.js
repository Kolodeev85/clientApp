import {
  Grid,
  Paper,
  Typography,
  Stack,
  Button,
  IconButton,
  Tooltip,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useStyles } from "../../style/useStyle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { createImageURL } from "../../utils";
import avatar from "../../img/avatar.png";
import { TokenContext } from "../../context/tokenContext";
import NotAreaError from "../errorComponents/NotAreaError";
import LoadingAreas from "../errorComponents/LoadingAreas";
import { useSnackbar } from "notistack";

function calculateAllDays(startDate, endDate) {
  const start = new Date(startDate);
  const endDay = new Date(endDate);
  const totalDays = Math.floor((endDay - start) / (1000 * 60 * 60 * 24));
  return Math.round(totalDays);
}

function calculateProgressDays(startDate) {
  const start = new Date(startDate);
  const today = new Date();
  const timeDiff = start.getTime() - Math.abs(today.getTime());
  const progressDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return progressDays;
}

const ContentPanel = (props) => {
  const { classes } = useStyles();
  const token = useContext(TokenContext);
  const { enqueueSnackbar } = useSnackbar();

  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down(1250));
  const isMobileImage = useMediaQuery(breakpoints.down(780));

  const {
    areasList,
    loading,
    error,
    onDeleteArea,
    setId,
    id,
    onLoadingNextPage,
    onLoadingPreviosPage,
    hasNextPage,
    hasPreviosPage,
    onLoadingAllAreas,
    showPaginationButton,
  } = props;

  const [isAlertActive, setIsAlertActive] = useState(false);
  const [number, setNumber] = useState(null);
  const onDeleteAreaAlert = (id, number) => {
    setIsAlertActive(!isAlertActive);
    setId(id);
    setNumber(number);
  };

  const [statusChangeExecuted, setStatusChangeExecuted] = useState(false);
  const [loadingAllAreasExecuted, setLoadingAllAreasExecuted] = useState(false);

  const onChangeAreaStatus = async (id, number, publisher) => {
    try {
      if (!statusChangeExecuted) {
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
                statusName: "holded",
              },
            }),
          }
        );
        if (response.status === 200) {
          enqueueSnackbar(
            `Возвещатель ${publisher} не здал участок ${number} вовремя!. Статус участка изменен!`,
            { variant: "warning" }
          );
          setStatusChangeExecuted(true);
        }
      }
    } catch (e) {
      enqueueSnackbar("Произошла ошибка при обновлении статуса участка!", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    onLoadingAllAreas(token);
    setLoadingAllAreasExecuted(true);
  }, []);

  useEffect(() => {
    if (!loadingAllAreasExecuted) {
      onLoadingAllAreas(token);
      setLoadingAllAreasExecuted(true);
    }
  }, [loadingAllAreasExecuted]);

  const navigate = useNavigate();

  const handleIssueButtonClick = (e, id) => {
    e.stopPropagation();
    setId(id);
    navigate("/areas/issue");
  };

  const handlePassOffButtonClick = (e, id) => {
    e.stopPropagation();
    setId(id);
    navigate("/areas/passoff");
  };

  const handleDeleteButtonClick = (e, id, number) => {
    e.stopPropagation();
    onDeleteAreaAlert(id, number);
  };
  return (
    <div>
      {areasList?.length === 0 ? (
        <NotAreaError />
      ) : loading ? (
        <LoadingAreas />
      ) : (
        <Stack sx={{ background: "#FAF9F9" }}>
          {isAlertActive ? (
            <Stack
              direction={isMobile ? "column" : "row"}
              alignItems="center"
              justifyContent="center"
              spacing={2}
              className={classes.alertContent}
            >
              <Alert variant="outlined" severity="error">
                Внимание! Участкок будет удален на сервере без возможности
                восстановления. Вы уверены?
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
          <Grid
            container
            justifyContent={isMobile ? "center" : null}
            rowGap={isMobileImage ? "15px" : "30px"}
            columnGap={"30px"}
            sx={{ pl: "19px", pb: "10px", pt: "20px", pr: "19px" }}
          >
            {error && <p>ошибка загрузки</p>}
            {loading && <LoadingAreas />}

            {areasList?.map((item) => {
              const allDays = calculateAllDays(item.startDate, item.endDate);
              const progressDays = calculateProgressDays(item.endDate);
              const percentage = (progressDays / allDays) * 100;
              if (percentage <= 0 && item.startDate && item.endDate) {
                onChangeAreaStatus(
                  item.id,
                  item.number,
                  item.publisher.fullName
                );
              }

              let className;
              let statusNames;
              switch (item.statusName) {
                case "free":
                  className = classes.badgeFree;
                  statusNames = "Свободные";
                  break;
                case "active":
                  className = classes.badgeBusy;
                  statusNames = "Активные";
                  break;
                case "unactive":
                  className = classes.badgeInactive;
                  statusNames = "Неактивные";
                  break;
                case "holded":
                  className = classes.badgeDetainees;
                  statusNames = "Задержанные";
                  break;
                default:
                  className = classes.badgeFree;
                  statusNames = "Свободные";
              }

              return (
                <Grid
                  xs={12}
                  sm={4}
                  md={3}
                  lg={2}
                  key={item.id}
                  onClick={() => {
                    setId(item.id);
                    navigate(`${/area/}${item.id}`);
                  }}
                  alignItems="stretch"
                >
                  <Paper elevation={2}>
                    <Stack className={classes.boxArea}>
                      <Stack
                        direction="column"
                        sx={{ pt: "20px", pl: "20px", pr: "5px", pb: "10px" }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "550",
                            fontSize: "20px",
                            color: "(0, 0, 0, 0.87)",
                          }}
                        >
                          {item.number}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", pb: "5px" }}>
                          {`${
                            item?.group?.name
                              ? item?.group?.name
                              : "Группа не присвоена"
                          }${
                            item?.subgroup?.name
                              ? ` (${item.subgroup.name})`
                              : ""
                          }`}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            p: "2px 5px 0px 5px",
                          }}
                          className={className}
                        >
                          {statusNames}
                        </Typography>
                        <Stack sx={{ width: "60%", alignSelf: "start" }}>
                          {item.statusName === "active" && (
                            <div>
                              <LinearProgress
                                variant="determinate"
                                value={Math.round(percentage)}
                                sx={{ mt: 1, height: "6px" }}
                                color={
                                  percentage <= 15
                                    ? "fineshed"
                                    : percentage <= 50
                                    ? "ounWarning"
                                    : "secondary"
                                }
                              />
                              <Typography
                                variant="body2"
                                align="end"
                                sx={{ fontSize: "12px", mr: -4, mt: -1.15 }}
                              >
                                {`${Math.round(percentage)}%`}
                              </Typography>
                            </div>
                          )}
                        </Stack>
                      </Stack>
                      {isMobileImage ? null : (
                        <img
                          className={classes.imgAvatar}
                          src={createImageURL(item?.image?.url) || avatar}
                          alt={item.id}
                        />
                      )}

                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "400",
                          fontSize: "14px",
                          color: "rgba(0, 0, 0, 0.6)",
                          pl: "20px",
                          mb: "5px",
                        }}
                      >
                        {item.adress}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ pb: 1 }}
                      >
                        <Stack direction="row">
                          <Button
                            onClick={(e) => handleIssueButtonClick(e, item.id)}
                            variant="text"
                            size="small"
                            className={classes.btnTo}
                            disabled={
                              item.statusName === "active" ||
                              item.statusName === "unactive" ||
                              item.statusName === "holded"
                            }
                          >
                            ВЫДАТЬ
                          </Button>
                          <Button
                            onClick={(e) =>
                              handlePassOffButtonClick(e, item.id)
                            }
                            variant="text"
                            size="small"
                            className={classes.btnEnd}
                            disabled={
                              item.statusName === "free" ||
                              item.statusName === "unactive"
                            }
                          >
                            СДАТЬ
                          </Button>
                        </Stack>
                        <Stack direction="row" sx={{ mr: 2 }}>
                          <Tooltip title="Редактировать">
                            <IconButton>
                              <ModeEditOutlineOutlinedIcon
                                sx={{ color: "black" }}
                                onClick={() => navigate(`${/area/}${item.id}`)}
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Удалить">
                            <IconButton
                              onClick={(e) =>
                                handleDeleteButtonClick(e, item.id, item.number)
                              }
                            >
                              <DeleteOutlineOutlinedIcon
                                sx={{ color: "black" }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
          {showPaginationButton && (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 3, mb: 3 }}
            >
              {hasPreviosPage && (
                <IconButton
                  className={classes.btnArrow}
                  onClick={onLoadingPreviosPage}
                >
                  <ChevronLeftIcon />
                </IconButton>
              )}

              {hasNextPage && (
                <IconButton
                  className={classes.btnArrow}
                  onClick={onLoadingNextPage}
                >
                  <ChevronRightIcon />
                </IconButton>
              )}
            </Stack>
          )}
        </Stack>
      )}
    </div>
  );
};

export default ContentPanel;
