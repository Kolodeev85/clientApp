import { Box } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import GroupBox from "./GroupBox";
import EventBox from "./EventBox";
import StatisticBox from "./StatisticBox";
import ReportBox from "./ReportBox";
import CreateGroupModal from "../forms/CreateGroupModal";
import CreateNewEventsGroupForm from "../forms/CreateNewEventsGroupForm";
import CreateNewEventForm from "../forms/CreateNewEventForm";
import TeamBox from "./TeamBox";
import { TokenContext } from "../../context/tokenContext";
import { ServicesStrapi } from "../../services/Strapi.service";
import CreateSubGroupForm from "../forms/CreateSubGroupForm";

const MenuBox = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    setAreasList,
    onLoadingAllAreas,
    setNameGroup,
    nameGroup,
    setSubName,
    onButtonHidden,
    setShowPaginationButton,
  } = props;

  const handleListItemClick = (
    event: MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const [selectedIndexSubGroup, setSelectedIndexSubGroup] = useState(null);
  const handleListItemClickSubGroup = (
    event: MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndexSubGroup(index);
  };

  const [selectedIndexEvent, setSelectedIndexEvent] = useState(0);
  const handleListItemClickEvent = (
    event: MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndexEvent(index);
  };

  const [selectedIndexSubEvent, setSelectedIndexSubEvent] = useState(0);
  const handleListItemClickSubEvent = (
    event: MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndexSubEvent(index);
  };

  const [isModalWindowCreateGroupOpen, setIsModalWindowCreateGroupOpen] =
    useState(false);
  const toogleModalWindowCreateGroup = () =>
    setIsModalWindowCreateGroupOpen(!isModalWindowCreateGroupOpen);

  const [
    isModalWindowCreateEventGroupOpen,
    setIsModalWindowCreateEventGroupOpen,
  ] = useState(false);
  const toogleModalWindowCreateGroupEvent = () =>
    setIsModalWindowCreateEventGroupOpen(!isModalWindowCreateEventGroupOpen);

  const [isModalWindowCreateEventOpen, setIsModalWindowCreateEventOpen] =
    useState(false);
  const toogleModalWindowCreateEvent = () =>
    setIsModalWindowCreateEventOpen(!isModalWindowCreateEventOpen);

  const [isModalSubGroupOpen, setIsModalSubGroupOpen] = useState(false);
  const toogleModalSubGroupOpen = () =>
    setIsModalSubGroupOpen(!isModalSubGroupOpen);

  const token = useContext(TokenContext);

  const [dataGroup, setDataGroup] = useState([]);
  const [idGroup, setIdGroup] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getAllGroup, getAllEvents } = ServicesStrapi;

  const onLoadingAllGroup = useCallback((token) => {
    setLoading(true);

    getAllGroup(token)
      .then((res) => setDataGroup(res))
      .catch((error) => console.log(error, "Ошибка загрузки данных"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    onLoadingAllGroup(token);
  }, []);

  const [dataEvents, setDataEvents] = useState(null);
  const [eventId, setEventId] = useState(null);

  const onLoadingEvents = useCallback((token) => {
    setLoading(true);

    getAllEvents(token)
      .then((res) => setDataEvents(res))
      .catch((error) => console.log(error, "Ошибка загрузки данных"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    onLoadingEvents(token);
  }, []);

  return (
    <Box>
      <GroupBox
        selectedIndex={selectedIndex}
        handleListItemClick={handleListItemClick}
        toogleModalWindowCreateGroup={toogleModalWindowCreateGroup}
        toogleModalSubGroupOpen={toogleModalSubGroupOpen}
        selectedIndexSubGroup={selectedIndexSubGroup}
        handleListItemClickSubGroup={handleListItemClickSubGroup}
        dataGroup={dataGroup}
        onLoadingAllGroup={onLoadingAllGroup}
        setIdGroup={setIdGroup}
        setNameGroup={setNameGroup}
        setAreasList={setAreasList}
        onLoadingAllAreas={onLoadingAllAreas}
        setSubName={setSubName}
        onButtonHidden={onButtonHidden}
        setShowPaginationButton={setShowPaginationButton}
      />
      <CreateGroupModal
        isModalWindowCreateGroupOpen={isModalWindowCreateGroupOpen}
        toogleModalWindowCreateGroup={toogleModalWindowCreateGroup}
        onLoadingAllGroup={onLoadingAllGroup}
      />
      <CreateSubGroupForm
        isModalSubGroupOpen={isModalSubGroupOpen}
        toogleModalSubGroupOpen={toogleModalSubGroupOpen}
        onLoadingAllGroup={onLoadingAllGroup}
        idGroup={idGroup}
        nameGroup={nameGroup}
      />
      <EventBox
        selectedIndexEvent={selectedIndexEvent}
        handleListItemClickEvent={handleListItemClickEvent}
        selectedIndexSubEvent={selectedIndexSubEvent}
        handleListItemClickSubEvent={handleListItemClickSubEvent}
        toogleModalWindowCreateGroupEvent={toogleModalWindowCreateGroupEvent}
        toogleModalWindowCreateEvent={toogleModalWindowCreateEvent}
        onLoadingEvents={onLoadingEvents}
        dataEvents={dataEvents}
        setEventId={setEventId}
        setAreasList={setAreasList}
        onButtonHidden={onButtonHidden}
        setShowPaginationButton={setShowPaginationButton}
      />
      <CreateNewEventsGroupForm
        isModalWindowCreateEventGroupOpen={isModalWindowCreateEventGroupOpen}
        toogleModalWindowCreateGroupEvent={toogleModalWindowCreateGroupEvent}
        onLoadingEvents={onLoadingEvents}
      />
      <CreateNewEventForm
        isModalWindowCreateEventOpen={isModalWindowCreateEventOpen}
        toogleModalWindowCreateEvent={toogleModalWindowCreateEvent}
        onLoadingEvents={onLoadingEvents}
        eventId={eventId}
      />
      <TeamBox
        selectedIndex={selectedIndex}
        handleListItemClick={handleListItemClick}
      />
      <StatisticBox
        selectedIndex={selectedIndex}
        handleListItemClick={handleListItemClick}
      />
      <ReportBox />
    </Box>
  );
};

export default MenuBox;
