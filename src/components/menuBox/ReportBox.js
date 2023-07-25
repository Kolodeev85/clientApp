import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useState } from "react";
import { useStyles } from "../../style/useStyle";
import { TokenContext } from "../../context/tokenContext";
import { useSnackbar } from "notistack";
import { ServicesStrapi } from "../../services/Strapi.service";
import { ReportDocument } from "../../pdf/ReportDocument";

import dayjs from "dayjs";
import "dayjs/locale/ru";

const ReportBox = () => {
  const { classes } = useStyles();
  const token = useContext(TokenContext);
  const { enqueueSnackbar } = useSnackbar();
  dayjs.locale("ru");

  const { getAllHistories } = ServicesStrapi;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [allHistories, setAllHistories] = useState([]);

  const onLoadingAllHistory = (token) => {
    getAllHistories(token).then((res) => setAllHistories(res));
  };

  useEffect(() => {
    onLoadingAllHistory(token);
  }, []);

  const filteredData = allHistories.filter((item) => {
    const updatedAtDate = new Date(item.updatedAt);
    return updatedAtDate >= startDate && updatedAtDate <= endDate;
  });
  console.log(filteredData);
  const areaNames = [
    ...new Set(
      filteredData
        .filter((item) => item.area !== null)
        .map((item) => item.area?.number)
    ),
  ];
  areaNames.sort((a, b) => a.localeCompare(b));

  const preFilteredData = areaNames.map((areaNumber) => {
    const publishers = [];
    const dateOfEnds = [];
    const createDatedAts = [];

    filteredData.forEach((item) => {
      if (item.area && item.area.number === areaNumber) {
        if (item.publisher && item.publisher.fullName) {
          publishers.push(item.publisher.fullName);
        }

        if (item.dateOfEnd) {
          dateOfEnds.push(
            new Date(item.dateOfEnd).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          );
        }

        createDatedAts.push(
          new Date(item.createdAt).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        );
      }
    });

    return {
      area: areaNumber,
      publishers,
      createDate: createDatedAts,
      dateOfEnd: dateOfEnds,
    };
  });

  return (
    <Accordion sx={{ boxShadow: "none" }}>
      <AccordionSummary>
        <ReportGmailerrorredOutlinedIcon sx={{ mt: "5px", mr: "10px" }} />
        <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
          Отчет
        </Typography>
      </AccordionSummary>
      <AccordionSummary>
        <AccordionDetails>
          Для формирования отчета выберите даты начала и конца периода:
        </AccordionDetails>
      </AccordionSummary>
      <Stack sx={{ ml: 3, mr: 3 }} direction="column" spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={startDate}
              onChange={(date) => setStartDate(date)}
              label="Дата начала периода:"
              format="DD/MM/YYYY"
              sx={{
                width: "100%",
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={endDate}
              onChange={(date) => setEndDate(date)}
              label="Дата окончания периода:"
              format="DD/MM/YYYY"
              sx={{
                width: "100%",
                pb: 2,
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        {endDate && (
          <Button
            variant="text"
            className={classes.btnGroop2}
            startIcon={<AddIcon />}
            fullWidth="true"
            onClick={() => {
              enqueueSnackbar("Отчет сохранен успешно!", {
                variant: "success",
              });
              setTimeout(() => {
                setStartDate(null);
                setEndDate(null);
              }, 2000);
            }}
          >
            <ReportDocument
              preFilteredData={preFilteredData}
              startDate={new Date(startDate).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
              endDate={new Date(endDate).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            />
          </Button>
        )}
      </Stack>
    </Accordion>
  );
};

export default ReportBox;
