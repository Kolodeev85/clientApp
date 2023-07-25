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
import { orange } from "@mui/material/colors";
import { useStyles } from "../../style/useStyle";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import { useRef, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../context/tokenContext";
import { useSnackbar } from "notistack";
import { ServicesStrapi } from "../../services/Strapi.service";

const CreateNewAreaForm = ({ onLoadingAllAreas, areasList, pagination }) => {
  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { breakpoints, palette } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down(1450));
  const isMobileForm = useMediaQuery(breakpoints.down(1050));

  const inputFileRef = useRef();
  const onFileAdd = () => inputFileRef.current.click();

  const myRef = useRef();
  useEffect(() => {
    myRef.current?.focus();
  }, []);

  const formRef = useRef();

  const navigate = useNavigate();
  const token = useContext(TokenContext);

  const [number, setNumber] = useState("");
  const [group, setGroup] = useState("");
  const [adress, setAdress] = useState("");
  const [inform, setInform] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [subgroupsList, setSubgroupsList] = useState("");

  const [dataGroup, setDataGroup] = useState([]);
  const [dataSubGroups, setDataSubGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getAllGroup, getAllSubGroups } = ServicesStrapi;

  const onLoadingDataGroup = (token) => {
    setLoading(true);
    getAllGroup(token)
      .then((res) => setDataGroup(res))
      .finally(() => setLoading(false));
  };

  const onLoadingDataSubGroups = (token) => {
    setLoading(true);
    getAllSubGroups(token)
      .then((res) => setDataSubGroups(res))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    const filteredData = dataGroup.filter((obj) => obj.id === group);
    setDataSubGroups(filteredData);
  }, [group, dataGroup]);

  console.log(dataSubGroups);

  useEffect(() => {
    onLoadingDataGroup(token);
  }, []);
  useEffect(() => {
    onLoadingDataSubGroups(token);
  }, []);

  const onSubmitData = async (e) => {
    e.preventDefault();

    const isValidNumber = /^\d+$/.test(number);
    const checkNumber = areasList.find((item) => item.number === number);
    const checkAdress = areasList.find((item) => item.adress === adress);

    if (number === "") {
      enqueueSnackbar("Номер помещения обязателен!", {
        variant: "warning",
      });
      return;
    }
    if (checkNumber) {
      enqueueSnackbar(
        `Помещение с таким номер существует!. Следующий порядковый номер ${
          pagination.total + 1
        }`,
        {
          variant: "error",
        }
      );
      return;
    }

    if (!isValidNumber) {
      enqueueSnackbar("Номер помещения должен содержать только цифры!", {
        variant: "warning",
      });
      return;
    }

    if (adress === "") {
      enqueueSnackbar("Укажите адрес!", {
        variant: "warning",
      });
      return;
    }
    if (checkAdress) {
      enqueueSnackbar("Помещение с таким адресом существует!", {
        variant: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const data = {};
      const formData = new FormData(formRef.current);
      formRef.current
        .querySelectorAll("input")
        .forEach(({ name, type, value, files }) => {
          if (!["submit", "file"].includes(type)) {
            data[name] = value ? value : undefined;
            formData.delete(name);
          } else if (type === "file") {
            formData.delete(name);
            Array.prototype.forEach.call(files, (file) => {
              formData.append(`files.${name}`, file, file.name);
            });
          }
        });
      const descriptionField = formRef.current.querySelector(
        "textarea[name='description']"
      );
      data.description = descriptionField.value
        ? descriptionField.value
        : undefined;
      const infoField = formRef.current.querySelector("textarea[name='info']");
      data.info = infoField.value ? infoField.value : undefined;
      data.subgroup = subgroupsList ? subgroupsList : undefined;
      formData.append("data", JSON.stringify(data));
      const response = await fetch(
        `${process.env.REACT_APP_STRAPI_API_URL}/areas`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.status === 200) {
        enqueueSnackbar(`Помещение ${number} добавлено успешно!`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Произошла ошибка добавлении помещения!", {
          variant: "error",
        });
      }
    } catch (e) {
      enqueueSnackbar("Произошла ошибка создания помещения!", {
        variant: "error",
      });
    }

    setNumber("");
    setGroup("");
    setAdress("");
    setInform("");
    setDesc("");
    setImage("");
    setSubgroupsList("");

    setLoading(false);
    navigate("/areas");
    onLoadingAllAreas(token);
  };

  return (
    <Box className={classes.mainBoxCreatForm}>
      <Paper elevation={2}>
        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" className={classes.h1Create}>
              Добавление помещения
            </Typography>
            <IconButton
              sx={{ height: "50px", width: "50px", mr: 4, mt: 4 }}
              onClick={() => navigate("/areas")}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <form onSubmit={onSubmitData} ref={formRef}>
            <Stack
              direction={isMobileForm ? "column" : "row"}
              spacing={2}
              className={classes.formCreate}
            >
              <TextField
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value.trim())}
                label="Номер помещения"
                variant="outlined"
                fullWidth
                helperText={`Присвойте помещению номер. Следующий номер: ${
                  pagination.total + 1
                }`}
                sx={{
                  ".css-1wc848c-MuiFormHelperText-root": {
                    m: 0,
                    pt: "8px",
                    color: palette.secondary.main,
                  },
                }}
                color="secondary"
                inputRef={myRef}
              ></TextField>

              <TextField
                label="Торговые центры"
                name="group"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                variant="outlined"
                fullWidth
                select
                helperText={
                  loading
                    ? "Идет загрузка данных"
                    : dataGroup.length === 0
                    ? "Торговые центры не созданы"
                    : "Выберите торговый центер"
                }
                sx={{
                  ".css-1wc848c-MuiFormHelperText-root": {
                    m: 0,
                    pt: "8px",
                    color: palette.secondary.main,
                  },
                }}
                disabled={dataGroup.length === 0}
                color="secondary"
              >
                {dataGroup
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </TextField>
              {!dataSubGroups[0]?.subgroups ||
              dataSubGroups[0]?.subgroups?.length === 0 ? null : (
                <TextField
                  label="Этаж"
                  name="subgroups"
                  value={subgroupsList}
                  onChange={(e) => setSubgroupsList(e.target.value)}
                  variant="outlined"
                  fullWidth
                  select
                  helperText={
                    loading
                      ? "Идет загрузка данных"
                      : dataSubGroups.length === 0
                      ? "Этажи не созданы"
                      : "Выберите этаж"
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
                  {dataSubGroups[0]?.subgroups
                    ?.slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              )}
            </Stack>
            <Stack
              direction={isMobileForm ? "column" : "row"}
              spacing={isMobileForm ? 3 : 5}
              className={classes.formCreate}
            >
              <TextField
                name="adress"
                label="Адрес"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                variant="outlined"
                fullWidth
                helperText="Укажите адрес помещения"
                sx={{
                  ".css-1wc848c-MuiFormHelperText-root": {
                    m: 0,
                    pt: "8px",
                    color: palette.secondary.main,
                  },
                }}
                color="secondary"
              ></TextField>
              <input
                type="file"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value.trim())}
                id="file-upload"
                className={classes.srOnly}
                ref={inputFileRef}
              />
              <label htmlFor="file-upload">
                <Button
                  onClick={onFileAdd}
                  vatiat="text"
                  className={classes.btnUploadAvatar}
                  fullWidth="true"
                >
                  {!image ? "Загрузить фото помещения" : "Фото добавлены"}
                </Button>
              </label>
            </Stack>
            <Stack
              direction={isMobileForm ? "column" : "row"}
              spacing={isMobileForm ? 3 : 5}
              className={classes.formCreate}
            >
              <TextField
                name="info"
                label="Информация"
                value={inform}
                onChange={(e) => setInform(e.target.value)}
                multiline
                rows={isMobileForm ? 3 : 9}
                fullWidth
                helperText="Добавьте подробную информацию"
                sx={{
                  ".css-1wc848c-MuiFormHelperText-root": {
                    m: 0,
                    pt: "8px",
                    color: palette.secondary.main,
                  },
                }}
                color="secondary"
              ></TextField>
              <TextField
                name="description"
                label="Описания"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                multiline
                rows={isMobileForm ? 3 : 9}
                fullWidth
                helperText="Добавьте описание"
                sx={{
                  ".css-1wc848c-MuiFormHelperText-root": {
                    m: 0,
                    pt: "8px",
                    color: palette.secondary.main,
                  },
                }}
                color="secondary"
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
                sx={{ mr: 19, mb: "58px", p: 2 }}
                className={classes.addBtn}
                startIcon={!isMobile ? <AddIcon /> : null}
                disabled={loading}
              >
                {loading ? (
                  "Загрузка данных"
                ) : "Добавить" && !isMobile ? (
                  "Добавить"
                ) : (
                  <AddIcon />
                )}
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateNewAreaForm;
