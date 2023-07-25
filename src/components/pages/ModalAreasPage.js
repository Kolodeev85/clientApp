import { useNavigate, useParams } from "react-router-dom";
import CreateNewAreaForm from "../forms/CreateNewAreaForm";
import CreateIssueForm from "../forms/CreateIssueForm";
import CrearePassOffAreaForm from "../forms/CreatePassOffAreaForm";
import { useEffect } from "react";

const ModalAreasPage = ({
  onOpenModalWindow,
  onCloseModalWindow,
  onLoadingAllAreas,
  areasList,
  id,
  pagination,
}) => {
  const { action } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    onOpenModalWindow();
    return () => onCloseModalWindow();
  }, [onOpenModalWindow, onCloseModalWindow]);

  if (action === "create")
    return (
      <CreateNewAreaForm
        onLoadingAllAreas={onLoadingAllAreas}
        areasList={areasList}
        pagination={pagination}
      />
    );

  const isCreateIssueFormOPen = action === "issue";
  const isCrearePassOffAreaForm = action === "passoff";

  return (
    <>
      <CreateIssueForm
        isCreateIssueForm={isCreateIssueFormOPen}
        toogleCreateIssueForm={() => navigate("/areas")}
        onLoadingAllAreas={onLoadingAllAreas}
        id={id}
      />
      <CrearePassOffAreaForm
        isCreatePassOffAreaFormOpen={isCrearePassOffAreaForm}
        toogleCreatePassOffAreaForm={() => navigate("/areas")}
        onLoadingAllAreas={onLoadingAllAreas}
        id={id}
      />
    </>
  );
};

export default ModalAreasPage;
