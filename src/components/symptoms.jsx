import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSymptoms, removeSymptom, editSymptom } from "../store/slices/doctor/symptoms";
import { toast } from "react-toastify";

const SymptomsSection = ({ onAddClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Get the nested symptoms data correctly
  const { list: symptomsList, loading: symptomsLoading } = useSelector((state) => state.doctorSymptoms);
  const symptoms = symptomsList[0]?.data?.symptoms || [];

  useEffect(() => {
    const loadSymptoms = async () => {
      try {
        await dispatch(fetchSymptoms()).unwrap();
      } catch (error) {
        toast.error(t("failed_to_load_symptoms"));
        console.error("Symptoms loading error:", error);
      }
    };

    loadSymptoms();
  }, [dispatch, t]);

  return (
    <div className="symptom-section">
      <h4 className="text-center mb-4 text-white py-3 bg-primary fw-bold rounded">
        {t("symptoms")}
      </h4>

      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary"
          onClick={onAddClick}
        >
          <i className="bi bi-plus-circle me-2"></i>
          {t("add_symptom")}
        </button>
      </div>

      {symptomsLoading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : symptoms.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {symptoms.map((symptom, index) => {
            // Handle both array and string name formats
            const symptomName = Array.isArray(symptom.name)
              ? symptom.name[0]
              : symptom.name;

            // Only render if name exists
            if (!symptomName) return null;

            return (
              <div key={symptom.id || `symptom-${index}`} className="col">
                <div className="card h-100 shadow-sm border-primary">
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      <i className="bi bi-thermometer-high me-2"></i>
                      {symptomName}
                    </h5>
                  </div>
                  <div className="card-footer bg-transparent border-top-0">
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-sm btn-outline-info">
                        <i className="bi bi-pencil"></i> {t("edit")}
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
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
          {t("no_symptoms_found")}
        </div>
      )}
    </div>
  );
};

export default SymptomsSection;