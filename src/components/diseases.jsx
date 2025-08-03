import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDiseases, removeDisease } from "../store/slices/doctor/diseases";
import { toast } from "react-toastify";
import ConfirmationModal from "./confirmationModel"; 

const DiseasesSection = ({ onAddClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { list: diseasesList, loading: diseasesLoading } = useSelector((state) => state.doctorDiseases);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [diseaseToDelete, setDiseaseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadDiseases = async () => {
      try {
        await dispatch(fetchDiseases()).unwrap();
      } catch (error) {
        toast.error(t("failed_to_load_diseases"));
      }
    };
    loadDiseases();
  }, [dispatch, t]);
  // console.log("the diseases list is ",diseasesList)
  const handleDeleteClick = (id) => {
    console.log(id);
    setDiseaseToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!diseaseToDelete) return;
    
    setIsDeleting(true);
    try {
      await dispatch(removeDisease(diseaseToDelete)).unwrap();
      toast.success(t("disease_deleted_successfully"));
      setShowDeleteModal(false);
      dispatch(fetchDiseases());
    } catch (error) {
      toast.error(t("failed_to_delete_disease"));
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const diseases = diseasesList[0]?.data?.Diseases || [];

  return (
    <div className="disease-section">
      <h4 className="text-center mb-4 text-white py-3 bg-primary fw-bold rounded">
        {t("diseases")}
      </h4>

      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary"
          onClick={onAddClick}
        >
          <i className="bi bi-plus-circle me-2"></i>
          {t("add_disease")}
        </button>
      </div>

      {diseasesLoading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : diseases.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {diseases.map((disease, index) => {
            const diseaseName = Array.isArray(disease.name)
              ? disease.name[0]
              : disease.name;

            return diseaseName && (
              <div key={disease.id || index} className="col">
                <div className="card h-100 shadow-sm border-primary">
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      <i className="bi bi-clipboard2-pulse me-2"></i>
                      {diseaseName}
                    </h5>
                  </div>
                  <div className="card-footer bg-transparent border-top-0">
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-pencil"></i> {t("edit")}
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteClick(5)}
                      >
                        <i className="bi bi-trash"></i> {t("delete")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          {t("no_diseases_found")}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title={t("confirm_delete")}
        body={t("are_you_sure_delete_disease")}
        confirmText={isDeleting ? t("deleting...") : t("delete")}
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default DiseasesSection;