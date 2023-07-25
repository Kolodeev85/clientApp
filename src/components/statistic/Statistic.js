import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useState } from "react";
import { ServicesStrapi } from "../../services/Strapi.service";
import { TokenContext } from "../../context/tokenContext";
import { deepPurple, orange } from "@mui/material/colors";

import AllAreasStatisticStatusGroup from "./AllAreasStatisticStatusGroup";
import AllAreasStatusStatistic from "../statistic/AllAreasStatusStatistic";
import AllAreasStatisticStatusSubGroup from "../statistic/AllAreasStatisticStatusSubGroup";
import AllAreasStatisticByEventGroup from "../statistic/AllAreasByEventGroup";
import AllAreasByEventGroupBar from "../statistic/AllAreasByEventGroupBar";
import AllAreasStatisticBySubEvent from "../statistic/AllAreasStatisticBySubEvent";
import AllAreasBySubEventBar from "../statistic/AllAreasBySubEventBar";
import AllAreasBar from "../statistic/AllAreasBar";
import AllAreasLine from "../statistic/AllAreasLine";

const Statistic = ({ onOpenModalWindow, onCloseModalWindow }) => {
  const navigate = useNavigate();
  const token = useContext(TokenContext);

  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down(1870));
  const isMobilePadding = useMediaQuery(breakpoints.down(550));

  useEffect(() => {
    onOpenModalWindow();
    return () => onCloseModalWindow();
  }, [onOpenModalWindow, onCloseModalWindow]);

  const { getAllAreas, getAllEvents, getAllSubEvent, getAllHistories } =
    ServicesStrapi;

  const [allAreasData, setAllAreasData] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [allSubEvents, setAllSubEvents] = useState([]);
  const [allHistories, setAllHistories] = useState([]);
  const [loading, setLoading] = useState(false);

  const onLoadingAllAreasData = (token) => {
    setLoading(true);
    getAllAreas(token, { page: 1, pageSize: 500 })
      .then((res) => setAllAreasData(res.areas))
      .finally(() => setLoading(false));
  };

  const onLoadingAllEvents = (token) => {
    getAllEvents(token).then((res) => setAllEvents(res));
  };

  const onLoadingAllSubEvents = (token) => {
    getAllSubEvent(token).then((res) => setAllSubEvents(res));
  };

  const onLoadingAllHistory = (token) => {
    getAllHistories(token).then((res) => setAllHistories(res));
  };

  useEffect(() => {
    onLoadingAllAreasData(token);
    onLoadingAllEvents(token);
    onLoadingAllSubEvents(token);
    onLoadingAllHistory(token);
  }, []);

  const groupNames = [
    ...new Set(
      allAreasData
        .filter((item) => item.group !== null)
        .map((item) => item.group?.name)
    ),
  ];

  const subGroupsNames = [
    ...new Set(
      allAreasData
        .filter((item) => item.subgroup !== null)
        .map((item) => item.subgroup?.name)
    ),
  ];

  const eventNames = [
    ...new Set(
      allEvents
        .filter((item) => item.nameEvent !== null)
        .map((item) => item?.nameEvent)
    ),
  ];

  const subEventNames = [
    ...new Set(
      allSubEvents.filter((item) => item.name !== null).map((item) => item.name)
    ),
  ];

  const eventHistory = [
    ...new Set(
      allHistories
        .filter((item) => item.event !== null)
        .map((item) => item.event?.nameEvent)
    ),
  ];

  const subEventHistory = [
    ...new Set(
      allHistories
        .filter((item) => item.subevent !== null)
        .map((item) => item.subevent?.name)
    ),
  ];

  function generateGroupStatistics(data, groupNames) {
    if (groupNames) {
      const statistics = groupNames.map((groupName) => {
        const filteredGroup = data.filter(
          (item) => item.group?.name === groupName
        );
        const statusCounts = filteredGroup.reduce((counts, item) => {
          counts[item.statusName] = (counts[item.statusName] || 0) + 1;
          return counts;
        }, {});

        return {
          name: groupName,
          ...statusCounts,
        };
      });

      return statistics;
    }
    return;
  }
  function generateSubGroupStatistics(data, groupNames) {
    if (groupNames) {
      const statistics = groupNames.map((groupName) => {
        const filteredGroup = data.filter(
          (item) => item.subgroup?.name === groupName
        );
        const statusCounts = filteredGroup.reduce((counts, item) => {
          counts[item.statusName] = (counts[item.statusName] || 0) + 1;
          return counts;
        }, {});

        return {
          name: groupName,
          ...statusCounts,
        };
      });

      return statistics;
    }
    return;
  }

  function ganerateEventGroupAreas(data, groupNames) {
    const eventGroupStatistics = [];

    for (const groupName of groupNames) {
      const filteredData = data.filter((item) => item.nameEvent === groupName);
      const areasCount = filteredData.reduce(
        (count, item) => count + item.areas.length,
        0
      );

      eventGroupStatistics.push({
        name: groupName,
        areas: areasCount,
      });
    }

    return eventGroupStatistics;
  }

  function ganerateSubEventAreas(data, groupNames) {
    const subEventGroupStatistics = [];

    for (const groupName of groupNames) {
      const filteredData = data.filter((item) => item.name === groupName);
      const areasCount = filteredData.reduce(
        (count, item) => count + item.areas?.length,
        0
      );

      subEventGroupStatistics.push({
        name: groupName,
        areas: areasCount,
      });
    }

    return subEventGroupStatistics;
  }

  function ganerateHistoryEventAreas(data, groupNames) {
    const eventHistoryEventAreasStatistics = [];

    for (const groupName of groupNames) {
      const filteredData = data.filter(
        (item) => item.event?.nameEvent === groupName
      );
      const areasCount = filteredData.reduce(
        (count, item) => count + (item.area ? 1 : 0),
        0
      );

      eventHistoryEventAreasStatistics.push({
        name: groupName,
        areas: areasCount,
      });
    }

    return eventHistoryEventAreasStatistics;
  }

  function ganerateHistorySubEventAreas(data, groupNames) {
    const eventHistorySubEventAreasStatistics = [];

    for (const groupName of groupNames) {
      const filteredData = data.filter(
        (item) => item.subevent?.name === groupName
      );
      const areasCount = filteredData.reduce(
        (count, item) => count + (item.area ? 1 : 0),
        0
      );

      eventHistorySubEventAreasStatistics.push({
        name: groupName,
        areas: areasCount,
      });
    }

    return eventHistorySubEventAreasStatistics;
  }

  function generateGroupAreas(data, groupNames) {
    const eventGroupAreasStatistics = [];

    for (const groupName of groupNames) {
      let areasCount = 0;
      const seenGroups = [];

      for (const item of data) {
        if (
          item.group &&
          item.group?.name === groupName &&
          item.group?.areas &&
          !seenGroups.includes(item.group?.name)
        ) {
          areasCount += item.group.areas?.length;
          seenGroups.push(item.group?.name);
        }
      }

      eventGroupAreasStatistics.push({
        name: groupName,
        areas: areasCount,
      });
    }

    return eventGroupAreasStatistics;
  }

  function generateSubGroupAreas(data, groupNames) {
    const eventGroupAreasStatistics = [];

    for (const groupName of groupNames) {
      let areasCount = 0;
      const seenSubgroups = [];

      for (const item of data) {
        if (
          item.subgroup &&
          item.subgroup?.name === groupName &&
          item.subgroup?.areas &&
          !seenSubgroups.includes(item.subgroup?.name)
        ) {
          areasCount += item.subgroup.areas?.length;
          seenSubgroups.push(item.subgroup?.name);
        }
      }

      eventGroupAreasStatistics.push({
        name: groupName,
        areas: areasCount,
      });
    }

    return eventGroupAreasStatistics;
  }

  const data = generateGroupStatistics(allAreasData, groupNames);
  const data2 = generateSubGroupStatistics(allAreasData, subGroupsNames);
  const data3 = ganerateEventGroupAreas(allEvents, eventNames);
  const data4 = ganerateSubEventAreas(allSubEvents, subEventNames);
  const data5 = ganerateHistoryEventAreas(allHistories, eventHistory);
  const data6 = ganerateHistorySubEventAreas(allHistories, subEventHistory);
  const data7 = generateGroupAreas(allAreasData, groupNames);
  const data8 = generateSubGroupAreas(allAreasData, subGroupsNames);

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

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: "#FAF9F9",
        p: isMobilePadding ? 0 : 3,
        height: "100%",
      }}
    >
      {loading && <LinearProgress variant="determinate" value={progress} />}
      <Paper elevation={2} sx={{ height: "100%", p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "550",
              color: "(0, 0, 0, 0.87)",
              fontSize: "25px",
              pt: 4,
              pb: 3,
            }}
          >
            Статистика:
          </Typography>
          <IconButton
            sx={{ height: "40px" }}
            onClick={() => navigate("/areas")}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography
          sx={{
            pt: 2,
            pb: 2,
            fontWeight: 550,
            fontSize: "20px",
            color: deepPurple[500],
          }}
        >
          Всего в системе:
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "20px",
            color: deepPurple[500],
          }}
        >
          участков:{" "}
          <Box component="span" sx={{ color: orange[700], fontWeight: 800 }}>
            {`${allAreasData.length}`}
          </Box>
        </Typography>

        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "20px",
            color: deepPurple[500],
          }}
        >
          групп:{" "}
          <Box component="span" sx={{ color: orange[700], fontWeight: 800 }}>
            {`${groupNames.length}`}
          </Box>
        </Typography>
        <Typography
          sx={{
            mb: "48px",
            fontWeight: 500,
            fontSize: "20px",
            color: deepPurple[500],
          }}
        >
          подгрупп:{" "}
          <Box component="span" sx={{ color: orange[700], fontWeight: 800 }}>
            {`${subGroupsNames.length}`}
          </Box>
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: deepPurple[500], textAlign: "center", pb: 2 }}
        >
          Все участки{" "}
          <Box component="span" sx={{ color: orange[700], fontWeight: 700 }}>
            по группам:
          </Box>
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 7 : 2}
          justifyContent="center"
          sx={{ p: 3 }}
        >
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasLine data={data7} />
          </Stack>
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasBar data={data7} />
          </Stack>
        </Stack>
        <Typography
          variant="h4"
          sx={{ color: deepPurple[500], textAlign: "center", mt: "24px", p: 2 }}
        >
          Все участки{" "}
          <Box component="span" sx={{ color: orange[700], fontWeight: 700 }}>
            по подгруппам:
          </Box>
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 7 : 2}
          justifyContent="center"
          sx={{ p: 3 }}
        >
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasLine data={data8} />
          </Stack>
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasBar data={data8} />
          </Stack>
        </Stack>
        <Typography
          variant="h4"
          sx={{
            color: deepPurple[500],
            textAlign: "center",
            pb: 2,
            mt: "24px",
          }}
        >
          Статусы участков по{" "}
          <Box component="span" sx={{ color: orange[700], fontWeight: 700 }}>
            группам:
          </Box>
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 7 : 2}
          justifyContent="center"
          sx={{ p: 3 }}
        >
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasStatisticStatusGroup data={data} />
          </Stack>
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasStatusStatistic data={data} />
          </Stack>
        </Stack>
        <Typography
          variant="h4"
          sx={{
            color: deepPurple[500],
            textAlign: "center",
            pb: 2,
            mt: "24px",
          }}
        >
          Статусы участков по{" "}
          <Box component="span" sx={{ color: orange[700], fontWeight: 700 }}>
            подгруппам:
          </Box>
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 7 : 2}
          justifyContent="center"
          sx={{ p: 3 }}
        >
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasStatisticStatusSubGroup data={data2} />
          </Stack>
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasStatusStatistic data={data2} />
          </Stack>
        </Stack>
        <Typography
          variant="h4"
          sx={{
            color: deepPurple[500],
            textAlign: "center",
            pb: 2,
            mt: "24px",
          }}
        >
          Текущие статусы участков по{" "}
          <Box component="span" sx={{ color: orange[700], fontWeight: 700 }}>
            группам событий:
          </Box>
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 7 : 2}
          justifyContent="center"
          sx={{ p: 3 }}
        >
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasStatisticByEventGroup data={data3} />
          </Stack>
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasByEventGroupBar data={data3} />
          </Stack>
        </Stack>
        <Typography
          variant="h4"
          sx={{
            color: deepPurple[500],
            textAlign: "center",
            pb: 2,
            mt: "24px",
          }}
        >
          Текущие статусы участков по{" "}
          <Box component="span" sx={{ color: orange[700], fontWeight: 700 }}>
            событиям:
          </Box>
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 7 : 2}
          justifyContent="center"
          sx={{ p: 3 }}
        >
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasStatisticBySubEvent data={data4} />
          </Stack>
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasBySubEventBar data={data4} />
          </Stack>
        </Stack>
        <Typography
          variant="h4"
          sx={{
            color: deepPurple[500],
            textAlign: "center",
            pb: 2,
            mt: "24px",
          }}
        >
          История обработки участков по{" "}
          <Box component="span" sx={{ color: orange[700], fontWeight: 700 }}>
            группам событий:
          </Box>
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 7 : 2}
          justifyContent="center"
          sx={{ p: 3 }}
        >
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasStatisticByEventGroup data={data5} />
          </Stack>
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasByEventGroupBar data={data5} />
          </Stack>
        </Stack>
        <Typography
          variant="h4"
          sx={{
            color: deepPurple[500],
            textAlign: "center",
            pb: 2,
            mt: "24px",
          }}
        >
          История обработки участков по{" "}
          <Box component="span" sx={{ color: orange[700], fontWeight: 700 }}>
            событиям:
          </Box>
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 7 : 2}
          justifyContent="center"
          sx={{ p: 3 }}
        >
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasStatisticBySubEvent data={data6} />
          </Stack>
          <Stack alignItems="center" sx={{ width: isMobile ? "100%" : "50%" }}>
            <AllAreasBySubEventBar data={data6} />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Statistic;
