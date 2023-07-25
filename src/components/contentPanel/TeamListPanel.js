import {
  Box,
  Paper,
  Typography,
  TableBody,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import HeaderCreateParticipant from "../HeaderSearchPanelBox/HeaderCreateParticipant";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useStyles } from "../../style/useStyle";
import { deepPurple } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import { TokenContext } from "../../context/tokenContext";
import { ServicesStrapi } from "../../services/Strapi.service";
import { useSnackbar } from "notistack";
import LoadingAreas from "../errorComponents/LoadingAreas";

const TeameListPanel = ({ onCloseModalWindow, onOpenModalWindow }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { breakpoints, palette } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down(500));

  const [anchorEl, setAnchorEl] = useState(null);
  const onShowMenu = (e) => setAnchorEl(e.target);
  const onCloseMenu = (e) => setAnchorEl(null);
  const isMenuOpen = !!anchorEl;

  useEffect(() => {
    onOpenModalWindow();
    return () => onCloseModalWindow();
  }, [onOpenModalWindow, onCloseModalWindow]);

  const token = useContext(TokenContext);
  const { enqueueSnackbar } = useSnackbar();

  const { getAllPublisher, deletePublisher } = ServicesStrapi;

  const [dataPublishers, setDataPublishers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pubId, setPubId] = useState(null);
  const [namePublisher, setNamePublisher] = useState(null);
  console.log(pubId);

  const onLodaingAllPublishersList = (token) => {
    setLoading(true);

    getAllPublisher(token)
      .then((res) => setDataPublishers(res))
      .finally(() => setLoading(false));
  };

  const onDeletePublisher = (token, id, name) => {
    deletePublisher(token, id)
      .then(() => onLodaingAllPublishersList(token))
      .finally(() =>
        enqueueSnackbar(`Возвещатель ${name} удален успешно!`, {
          variant: "success",
        })
      );
  };

  useEffect(() => {
    onLodaingAllPublishersList(token);
  }, []);

  console.log(dataPublishers);

  return (
    <div>
      <HeaderCreateParticipant />

      <Box
        component="div"
        sx={{ backgroundColor: "#FAF9F9", mt: 2, p: isMobile ? 0 : 3 }}
      >
        {loading ? (
          <LoadingAreas />
        ) : (
          <div>
            <Paper elevation={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "550",
                    color: "(0, 0, 0, 0.87)",
                    fontSize: "25px",
                    pt: 4,
                    pl: 4,
                    pb: 3,
                  }}
                >
                  Арендаторы
                </Typography>
                <IconButton
                  className={classes.btnCloseTeamList}
                  onClick={() => navigate("/areas")}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
              <TableContainer sx={{ maxHeight: "670px", overflow: "auto" }}>
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
                        }}
                      >
                        Имя:
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        sx={{
                          borderBottom: `1px solid ${palette.primary.main}`,
                        }}
                      >
                        Номер телефона:
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        sx={{
                          borderBottom: `1px solid ${palette.primary.main}`,
                        }}
                      >
                        @Email:
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        sx={{
                          width: "10%",
                          borderBottom: `1px solid ${palette.primary.main}`,
                        }}
                      >
                        Активные аренды:
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        sx={{
                          width: "20%",
                          borderBottom: `1px solid ${palette.primary.main}`,
                        }}
                      >
                        История аренды:
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        sx={{
                          width: "15%",
                          borderBottom: `1px solid ${palette.primary.main}`,
                        }}
                      >
                        Примечания:
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataPublishers.length === 0 && (
                      <Typography className={classes.notPublishers}>
                        Арендаторов нет!
                      </Typography>
                    )}

                    {dataPublishers
                      ?.sort((a, b) => a.fullName.localeCompare(b.fullName))
                      .map((item, i) => {
                        return (
                          <TableRow
                            key={item.id}
                            onClick={() => {
                              setPubId(item.id);
                              setNamePublisher(item.fullName);
                            }}
                          >
                            <TableCell>
                              {i + 1}. {item?.fullName}
                            </TableCell>
                            <TableCell>{item?.phoneNumber}</TableCell>
                            <TableCell>
                              {item?.email ? item?.email : "Email не добавлен"}
                            </TableCell>
                            <TableCell>
                              {item?.areas.length > 0
                                ? item.areas.map((area, index) => (
                                    <React.Fragment key={area.id}>
                                      {index > 0 && ", "}
                                      <Link to={`/area/${area.id}`}>
                                        {area.number}
                                      </Link>
                                    </React.Fragment>
                                  ))
                                : "Нет акуальных данных"}
                            </TableCell>
                            <TableCell>
                              {item.histories.length > 0
                                ? item?.histories
                                    ?.map((history) => history?.area?.number)
                                    .join(", ")
                                : "Нет завершенных аренд"}
                            </TableCell>
                            <TableCell>
                              {item.note ? item.note : "Нет данных"}
                            </TableCell>
                            <TableCell>
                              <IconButton
                                id="fade-button"
                                aria-controls={
                                  isMenuOpen ? "fade-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={isMenuOpen ? "true" : undefined}
                                onClick={onShowMenu}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={onCloseMenu}
              sx={{
                ".css-1wx1ncc-MuiButtonBase-root-MuiMenuItem-root:hover": {
                  backgroundColor: deepPurple[500],
                  color: "white",
                },
              }}
              elevation={1}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={() => navigate("/areas")}>
                <CachedIcon sx={{ pr: 1 }} />
                Аренда помещения
              </MenuItem>
              {/* <MenuItem onClick={onShowMenu}>
            <CreateIcon sx={{ pr: 1 }} />
            Редактировать
          </MenuItem> */}
              <MenuItem
                onClick={() => {
                  onDeletePublisher(token, pubId, namePublisher);
                  onCloseMenu();
                }}
              >
                <DeleteIcon sx={{ pr: 1 }} />
                Удалить
              </MenuItem>
            </Menu>
          </div>
        )}
      </Box>
    </div>
  );
};

export default TeameListPanel;
