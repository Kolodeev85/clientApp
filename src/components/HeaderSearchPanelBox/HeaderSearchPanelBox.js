import {
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useStyles } from "../../style/useStyle";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { ServicesStrapi } from "../../services/Strapi.service";
import { useContext, useState } from "react";
import { TokenContext } from "../../context/tokenContext";

const HeaderSearchPanelBox = (props) => {
  const { classes, cx } = useStyles();

  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down(1450));
  const isMobileMenu = useMediaQuery(breakpoints.down(1250));

  const {
    areasList,
    onLoadingAllAreas,
    setAreasList,
    nameGroup,
    subName,
    buttonHidden,
    onButtonHidden,
    pagination,
    setShowPaginationButton,
    setNameGroup,
    setSubName,
  } = props;

  const { getAreasByStatusType } = ServicesStrapi;
  const token = useContext(TokenContext);

  const [activeButton, setActiveButton] = useState("Все");

  const [allAreasChecked, setAllAreasChecked] = useState(false);
  const [freeAreasChecked, setFreeAreasChecked] = useState(false);
  const [activeAreasChecked, setActiveAreasChecked] = useState(false);
  const [inactiveAreasChecked, setInactiveAreasChecked] = useState(false);
  const [detainedAreasChecked, setDetainedAreasChecked] = useState(false);

  const navigate = useNavigate();

  const onLoadingAreasByStatusType = (token, type, nameGroup, subName) => {
    getAreasByStatusType(token, type, nameGroup, subName).then((data) =>
      setAreasList(data)
    );
  };

  return (
    <Stack
      direction="row"
      justifyContent={isMobile ? "center" : "space-between"}
      alignItems="baseline"
      className={isMobileMenu ? classes.position : null}
    >
      <Stack
        direction="row"
        spacing={!isMobile ? 3 : 1}
        className={classes.mainHeader}
        alignItems="center"
        justifyContent="center"
        style={{ display: "block" }}
      >
        {isMobile ? (
          <Badge
            badgeContent={
              activeButton === "Все"
                ? `${areasList?.length} (${pagination?.total})`
                : null
            }
            color="primary"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={allAreasChecked}
                  defaultChecked
                  onChange={(event) => {
                    setAllAreasChecked(event.target.checked);
                    if (event.target.checked) {
                      onLoadingAllAreas(token);
                      setActiveButton("Все");
                      onButtonHidden(false);
                      setFreeAreasChecked(false);
                      setActiveAreasChecked(false);
                      setInactiveAreasChecked(false);
                      setDetainedAreasChecked(false);
                      setShowPaginationButton(true);
                      navigate("/areas");
                    }
                  }}
                />
              }
              label="Все"
              labelPlacement="top"
              disabled={buttonHidden}
              sx={{ mb: 1 }}
            />
          </Badge>
        ) : (
          <Badge
            badgeContent={
              activeButton === "Все"
                ? `${areasList?.length} (${pagination?.total})`
                : null
            }
            color="primary"
          >
            <Button
              variant="contained"
              className={cx(
                classes.btn,
                activeButton === "Все" && classes.btnIsActive
              )}
              onClick={() => {
                onLoadingAllAreas(token);
                setActiveButton("Все");
                onButtonHidden(false);
                setShowPaginationButton(true);
                setNameGroup(undefined);
                setSubName(undefined);
              }}
            >
              Все
            </Button>
          </Badge>
        )}

        {isMobile ? (
          <Badge
            variant="contained"
            badgeContent={freeAreasChecked ? areasList?.length : null}
            color="success"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={freeAreasChecked}
                  onChange={(event) => {
                    setFreeAreasChecked(event.target.checked);
                    if (event.target.checked) {
                      onLoadingAreasByStatusType(
                        token,
                        "free",
                        nameGroup,
                        subName
                      );
                      setActiveButton("Свободные");
                      setAllAreasChecked(false);
                      setActiveAreasChecked(false);
                      setInactiveAreasChecked(false);
                      setDetainedAreasChecked(false);
                    } else {
                      onLoadingAllAreas(token);
                      setAllAreasChecked(false);
                      setShowPaginationButton(false);
                    }
                  }}
                />
              }
              label="Свободные"
              labelPlacement="top"
              disabled={buttonHidden}
            />
          </Badge>
        ) : (
          <Badge
            variant="contained"
            badgeContent={
              activeButton === "Свободные" ? areasList?.length : null
            }
            color="success"
          >
            <Button
              className={cx(
                classes.btn,
                activeButton === "Свободные" && classes.btnIsActive
              )}
              onClick={() => {
                onLoadingAreasByStatusType(token, "free", nameGroup, subName);
                setActiveButton("Свободные");
                setShowPaginationButton(false);
              }}
              disabled={buttonHidden}
            >
              Свободные
            </Button>
          </Badge>
        )}

        {isMobile ? (
          <Badge
            variant="contained"
            badgeContent={activeAreasChecked ? areasList?.length : null}
            color="warning"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={activeAreasChecked}
                  onChange={(event) => {
                    setActiveAreasChecked(event.target.checked);
                    if (event.target.checked) {
                      onLoadingAreasByStatusType(
                        token,
                        "active",
                        nameGroup,
                        subName
                      );
                      setActiveButton("Активные");
                      setAllAreasChecked(false);
                      setFreeAreasChecked(false);
                      setInactiveAreasChecked(false);
                      setDetainedAreasChecked(false);
                    } else {
                      onLoadingAllAreas(token);
                      setAllAreasChecked(false);
                      setShowPaginationButton(false);
                    }
                  }}
                />
              }
              label="Активные"
              labelPlacement="top"
              disabled={buttonHidden}
            />
          </Badge>
        ) : (
          <Badge
            variant="contained"
            badgeContent={
              activeButton === "Активные" ? areasList?.length : null
            }
            color="warning"
          >
            <Button
              variant="contained"
              className={cx(
                classes.btn,
                activeButton === "Активные" && classes.btnIsActive
              )}
              onClick={() => {
                onLoadingAreasByStatusType(token, "active", nameGroup, subName);
                setActiveButton("Активные");
                setShowPaginationButton(false);
              }}
              disabled={buttonHidden}
            >
              Активные
            </Button>
          </Badge>
        )}

        {isMobile ? (
          <Badge
            variant="contained"
            badgeContent={inactiveAreasChecked ? areasList?.length : null}
            color="secondary"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={inactiveAreasChecked}
                  onChange={(event) => {
                    setInactiveAreasChecked(event.target.checked);
                    if (event.target.checked) {
                      onLoadingAreasByStatusType(
                        token,
                        "unactive",
                        nameGroup,
                        subName
                      );
                      setActiveButton("Неактивные");
                      setAllAreasChecked(false);
                      setFreeAreasChecked(false);
                      setActiveAreasChecked(false);
                      setDetainedAreasChecked(false);
                    } else {
                      onLoadingAllAreas(token);
                      setAllAreasChecked(false);
                      setShowPaginationButton(false);
                    }
                  }}
                />
              }
              label="Неактивные"
              labelPlacement="top"
              disabled={buttonHidden}
            />
          </Badge>
        ) : (
          <Badge
            variant="contained"
            badgeContent={
              activeButton === "Неактивные" ? areasList?.length : null
            }
            color="secondary"
          >
            <Button
              variant="contained"
              className={cx(
                classes.btn,
                activeButton === "Неактивные" && classes.btnIsActive
              )}
              onClick={() => {
                onLoadingAreasByStatusType(
                  token,
                  "unactive",
                  nameGroup,
                  subName
                );
                setActiveButton("Неактивные");
                setShowPaginationButton(false);
              }}
              disabled={buttonHidden}
            >
              Неактивные
            </Button>
          </Badge>
        )}

        {isMobile ? (
          <Badge
            variant="contained"
            badgeContent={detainedAreasChecked ? areasList?.length : null}
            color="error"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={detainedAreasChecked}
                  onChange={(event) => {
                    setDetainedAreasChecked(event.target.checked);
                    if (event.target.checked) {
                      onLoadingAreasByStatusType(
                        token,
                        "holded",
                        nameGroup,
                        subName
                      );
                      setActiveButton("Задержанные");
                      setAllAreasChecked(false);
                      setFreeAreasChecked(false);
                      setActiveAreasChecked(false);
                      setInactiveAreasChecked(false);
                    } else {
                      onLoadingAllAreas(token);
                      setAllAreasChecked(false);
                      setShowPaginationButton(false);
                    }
                  }}
                />
              }
              label="Задержанные"
              labelPlacement="top"
              disabled={buttonHidden}
            />
          </Badge>
        ) : (
          <Badge
            variant="contained"
            badgeContent={
              activeButton === "Задержанные" ? areasList?.length : null
            }
            color="error"
          >
            <Button
              variant="contained"
              className={cx(
                classes.btn,
                activeButton === "Задержанные" && classes.btnIsActive
              )}
              onClick={() => {
                onLoadingAreasByStatusType(token, "holded", nameGroup, subName);
                setActiveButton("Задержанные");
                setShowPaginationButton(false);
              }}
              disabled={buttonHidden}
            >
              Задержанные
            </Button>
          </Badge>
        )}
      </Stack>
      <Stack
        sx={{
          mt: "25px",
          mb: "25px",
          mr: "110px",
          display: isMobile ? "none" : "block",
        }}
      >
        <Button
          onClick={() => navigate("/areas/create")}
          variant="contained"
          className={classes.createBtn}
          startIcon={!isMobile ? <AddIcon /> : null}
        >
          {!isMobile ? "Создать участок" : <AddIcon />}
        </Button>
      </Stack>
      <Button
        onClick={() => navigate("/areas/create")}
        variant="contained"
        className={classes.createBtn2}
        sx={{ display: isMobile ? "block" : "none" }}
      >
        <AddIcon />
      </Button>
    </Stack>
  );
};

export default HeaderSearchPanelBox;
