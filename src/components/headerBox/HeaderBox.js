import {
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef, useEffect, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TokenContext } from "../../context/tokenContext";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { useStyles } from "../../style/useStyle";
import { useNavigate } from "react-router-dom";

const HeaderBox = (props) => {
  const { classes } = useStyles();

  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down(1250));
  const isMobileImage = useMediaQuery(breakpoints.down(465));

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
    },
  });

  const {
    tooglePanel,
    setAreasList,
    areasList,
    onLoadingAllAreas,
    onLogOut,
    onShowMobileMenu,
  } = props;

  const [isShowSerchPanelOpen, setIsShowSerchPanelOpen] = useState(false);
  const toogleShowSerchPanel = () =>
    setIsShowSerchPanelOpen(!isShowSerchPanelOpen);

  const myRef = useRef();

  useEffect(() => {
    if (isShowSerchPanelOpen) {
      myRef.current.focus();
    }
  }, [isShowSerchPanelOpen]);

  const token = useContext(TokenContext);
  const [filterValue, setFilterValue] = useState("");

  const onHendleFilterChange = (e) => {
    const value = e.target.value;

    setFilterValue(value);
    filterData(value);
  };

  const filterData = (value) => {
    if (value === "") {
      onLoadingAllAreas(token);
      return;
    }
    const filteredData = areasList.filter((item) => {
      return (
        item.number.toString().includes(value) ||
        item.adress.toLowerCase().includes(value.toLowerCase()) ||
        item.group?.name?.toLowerCase().includes(value.toLowerCase()) ||
        item.subgroup?.name?.toLowerCase().includes(value.toLowerCase()) ||
        item.event?.nameEvent?.toLowerCase().includes(value.toLowerCase()) ||
        item.subevent?.name?.toLowerCase().includes(value.toLowerCase()) ||
        item.publisher?.fullName?.toLowerCase().includes(value.toLowerCase())
      );
    });
    setAreasList(filteredData);
  };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "#6200EE",
          height: "56px",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="baseline"
          spacing={2}
        >
          <Box sx={{ pt: "10px", pl: "19px" }}>
            <Tooltip title="Меню">
              <IconButton onClick={isMobile ? onShowMobileMenu : tooglePanel}>
                <DehazeIcon sx={{ color: "#FFFFFF" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Typography
              sx={{ color: "#FFFFFF" }}
              style={{ display: isMobileImage ? "none" : "block" }}
              onClick={() => navigate("/areas")}
            >
              Участки
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {isShowSerchPanelOpen ? (
            <Stack className={classes.searchInput}>
              <TextField
                value={filterValue}
                onChange={onHendleFilterChange}
                id="standard-search"
                label="Поиск"
                type="search"
                variant="standard"
                sx={{
                  ".css-c63i49-MuiInputBase-input-MuiInput-input": {
                    color: "#FFFFFF",
                  },
                  ".css-io5dvg-MuiFormLabel-root-MuiInputLabel-root": {
                    color: "#FFFFFF",
                  },
                }}
                inputRef={myRef}
              />
            </Stack>
          ) : null}
          <Box>
            {/* <IconButton>
                            <ShareIcon sx={{ color: 'rgba(255, 255, 255, 0.74)' }} />
                        </IconButton> */}
          </Box>
          <Box>
            <Tooltip title="Поиск">
              <IconButton>
                <SearchIcon
                  onClick={toogleShowSerchPanel}
                  sx={{ color: "rgba(255, 255, 255, 0.74)" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title="Выйти">
              <IconButton onClick={onLogOut}>
                <LogoutIcon
                  sx={{ color: "rgba(255, 255, 255, 0.74)", mr: "11px" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default HeaderBox;
