import { Box, Grid } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Route, Routes, useNavigate } from "react-router-dom";

import "../styleAnimation/menu-box-transition.css";
import "../styleAnimation/create-new-area-form-transition.css";

import HeaderSearchPanelBox from "../../HeaderSearchPanelBox/HeaderSearchPanelBox";
import ContentPanel from "../../contentPanel/ContentPanel";
import MenuBox from "../../menuBox/MenuBox";
import HeaderBox from "../../headerBox/HeaderBox";
import ItemAreaPanel from "../../contentPanel/ItemAreaPanel";
import ModalAreasPage from "../../pages/ModalAreasPage";
import TeameListPanel from "../../contentPanel/TeamListPanel";
import CreateAddNewParticipantForm from "../../forms/CreateAddNewParticipantForm";
import { TokenContext } from "../../../context/tokenContext";
import { ServicesStrapi } from "../../../services/Strapi.service";
import { useSnackbar } from "notistack";
import CreateIssueForm from "../../forms/CreateIssueForm";
import CrearePassOffAreaForm from "../../forms/CreatePassOffAreaForm";
import Statistic from "../../statistic/Statistic";

const MainPage = (props) => {
  const { onLogOut, tooglePanel, isPanelOpen, onShowMobileMenu, isMobile } =
    props;

  const [id, setId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [showPaginationButton, setShowPaginationButton] = useState(true);
  console.log(showPaginationButton);

  const [isIssueFormOpen] = useState(true);

  const [nameGroup, setNameGroup] = useState(undefined);
  const [subName, setSubName] = useState(undefined);

  const [buttonHidden, setButtonHidden] = useState(false);
  const onButtonHidden = (index) => setButtonHidden(index);

  const [isHederSearchBoxOpen, setIsHederSearchBoxOpen] = useState(false);

  const onOpenModalWindow = () => setIsHederSearchBoxOpen(true);
  const onCloseModalWindow = () => setIsHederSearchBoxOpen(false);

  const token = useContext(TokenContext);

  const { getAllAreas, deleteArea, deleteHistory, getAreaById } =
    ServicesStrapi;

  const [areasList, setAreasList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onLoadingAllAreas = useCallback((token) => {
    setLoading(true);

    getAllAreas(token)
      .then((data) => {
        setAreasList(data.areas);
        return data.pagination;
      })
      .then((res) => setPagination(res))
      .then((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const onDeleteArea = useCallback(
    async (token, id, number) => {
      try {
        const areaToDelete = await getAreaById(token, id);
        await deleteArea(token, id);
        onLoadingAllAreas(token);
        enqueueSnackbar(`Участок ${number} удален успешно!`, {
          variant: "success",
        });
        const histories = areaToDelete.histories ?? [];
        await Promise.all(
          histories.map(async ({ id }) => {
            await deleteHistory(token, id);
          })
        );
      } catch (error) {
        enqueueSnackbar("Что то пошло не так!", {
          variant: "error",
        });
      }
    },
    [token, id]
  );

  useEffect(() => {
    onLoadingAllAreas(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pagination) {
      setPageCount(pagination.pageCount);
    }
  }, [pagination]);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const hasPreviosPage = currentPage > 1;
  const hasNextPage = currentPage < pageCount;

  const onLoadingNextPage = async () => {
    const nextPage = currentPage + 1;
    if (nextPage > pageCount) return;

    const res =
      (await getAllAreas(token, { page: nextPage, pageSize: 10 })) ?? [];
    setAreasList(res.areas);
    setCurrentPage(res.pagination.page);
    setPageCount(res.pagination.pageCount);
    if (!res) {
      enqueueSnackbar("Что - то пошло не так!", { variant: "error" });
      return;
    }
  };

  const onLoadingPreviosPage = async () => {
    const nextPage = currentPage - 1;
    if (nextPage > pageCount) return;

    const res = await getAllAreas(token, { page: nextPage, pageSize: 10 });
    setAreasList(res.areas);
    setCurrentPage(res.pagination.page);
    setPageCount(res.pagination.pageCount);
    if (!res) {
      enqueueSnackbar("Что - то пошло не так!", { variant: "error" });
      return;
    }
  };

  return (
    <Box>
      <Grid container>
        <CSSTransition
          in={isPanelOpen}
          timeout={500}
          classNames="menu-box-transition"
          unmountOnExit
        >
          <Grid item xs={3} style={{ display: isPanelOpen ? "block" : "none" }}>
            <MenuBox
              setAreasList={setAreasList}
              onLoadingAllAreas={onLoadingAllAreas}
              setNameGroup={setNameGroup}
              setSubName={setSubName}
              onButtonHidden={onButtonHidden}
              nameGroup={nameGroup}
              subName={subName}
              setShowPaginationButton={setShowPaginationButton}
            />
          </Grid>
        </CSSTransition>
        <Grid item xs={isPanelOpen ? 9 : 12}>
          <HeaderBox
            tooglePanel={tooglePanel}
            setAreasList={setAreasList}
            areasList={areasList}
            onLoadingAllAreas={onLoadingAllAreas}
            onLogOut={onLogOut}
            onShowMobileMenu={onShowMobileMenu}
          />
          {!isHederSearchBoxOpen && (
            <HeaderSearchPanelBox
              areasList={areasList}
              nameGroup={nameGroup}
              subName={subName}
              buttonHidden={buttonHidden}
              setAreasList={setAreasList}
              onLoadingAllAreas={onLoadingAllAreas}
              onButtonHidden={onButtonHidden}
              pagination={pagination}
              setShowPaginationButton={setShowPaginationButton}
              setNameGroup={setNameGroup}
              setSubName={setSubName}
            />
          )}
          <CSSTransition
            in={isMobile}
            timeout={500}
            classNames="menu-box-transition"
            unmountOnExit
          >
            <div>
              {isMobile && (
                <MenuBox
                  setAreasList={setAreasList}
                  onLoadingAllAreas={onLoadingAllAreas}
                  setNameGroup={setNameGroup}
                  setSubName={setSubName}
                  onButtonHidden={onButtonHidden}
                  nameGroup={nameGroup}
                  subName={subName}
                  setShowPaginationButton={setShowPaginationButton}
                />
              )}
            </div>
          </CSSTransition>
          <Routes>
            <Route
              path="/areas"
              element={
                <ContentPanel
                  areasList={areasList}
                  loading={loading}
                  error={error}
                  onDeleteArea={onDeleteArea}
                  setId={setId}
                  id={id}
                  onLoadingNextPage={onLoadingNextPage}
                  onLoadingPreviosPage={onLoadingPreviosPage}
                  hasNextPage={hasNextPage}
                  hasPreviosPage={hasPreviosPage}
                  onLoadingAllAreas={onLoadingAllAreas}
                  showPaginationButton={showPaginationButton}
                />
              }
            />
            <Route
              path="/areas/:action"
              element={
                <ModalAreasPage
                  onOpenModalWindow={onOpenModalWindow}
                  onCloseModalWindow={onCloseModalWindow}
                  onLoadingAllAreas={onLoadingAllAreas}
                  areasList={areasList}
                  id={id}
                  pagination={pagination}
                />
              }
            />
            <Route
              path="/area/:id"
              element={
                <ItemAreaPanel
                  onOpenModalWindow={onOpenModalWindow}
                  onCloseModalWindow={onCloseModalWindow}
                  onDeleteArea={onDeleteArea}
                />
              }
            />
            <Route
              path="/area-issue"
              element={
                <CreateIssueForm
                  onLoadingAllAreas={onLoadingAllAreas}
                  id={id}
                  isIssueFormOpen={isIssueFormOpen}
                  onCloseIssueModal={() => navigate(`/area/${id}`)}
                />
              }
            />
            <Route
              path="/area-return"
              element={
                <CrearePassOffAreaForm
                  onLoadingAllAreas={onLoadingAllAreas}
                  id={id}
                  isIssueFormOpen={isIssueFormOpen}
                  onCloseIssueModal={() => navigate(`/area/${id}`)}
                />
              }
            />

            <Route
              path="/area/:action"
              element={
                <ModalAreasPage
                  onOpenModalWindow={onOpenModalWindow}
                  onCloseModalWindow={onCloseModalWindow}
                />
              }
            />
            <Route
              path="/team-list"
              element={
                <TeameListPanel
                  onOpenModalWindow={onOpenModalWindow}
                  onCloseModalWindow={onCloseModalWindow}
                />
              }
            />
            <Route
              path="/team-list/create"
              element={
                <CreateAddNewParticipantForm
                  onOpenModalWindow={onOpenModalWindow}
                  onCloseModalWindow={onCloseModalWindow}
                />
              }
            />
            <Route
              path="/statistic-page"
              element={
                <Statistic
                  onOpenModalWindow={onOpenModalWindow}
                  onCloseModalWindow={onCloseModalWindow}
                />
              }
            />
          </Routes>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;
