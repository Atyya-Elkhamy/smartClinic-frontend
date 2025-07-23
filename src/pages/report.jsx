import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const symptomsOptions = [
  "صداع",
  "سعال",
  "حمى",
  "ألم في البطن",
  "دوخة",
  "أخرى"
];

const durationOptions = [
  "أقل من 24 ساعة",
  "من يوم إلى 3 أيام",
  "أكثر من 3 أيام"
];

const chronicOptions = [
  "سكر",
  "ضغط",
  "قلب",
  "ربو",
  "لا يوجد",
  "أخرى"
];

const Report = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    symptom: [],
    otherSymptom: "",
    duration: "",
    chronic: [],
    otherChronic: "",
    takesMed: "",
    meds: "",
    visitedBefore: "",
    hasAllergy: "",
    allergyType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setForm((prev) => {
      const current = prev[name] || [];
      const updated = checked
        ? [...current, value]
        : current.filter((v) => v !== value);
      return { ...prev, [name]: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", form);
    alert(t("survey_sent_successfully"));
  };

  return (
    <div className="py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-7">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-info bg-gradient text-white text-center rounded-top-4">
              <h2 className="fw-bold mb-0">{t("precheck_title")}</h2>
            </div>
            <div className="card-body rounded-bottom-4">
              <form onSubmit={handleSubmit}>
                {/* أعراض حالية */}
                <div className="mb-4">
                  <label className="form-label fw-bold text-primary fs-4">
                    {t("symptoms_label")}
                  </label>
                  <div className="d-flex flex-wrap gap-3">
                    {symptomsOptions.map((symptom) => (
                      <div className="form-check" key={symptom}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="symptom"
                          value={symptom}
                          checked={form.symptom.includes(symptom)}
                          onChange={handleCheckboxChange}
                          id={`symptom-${symptom}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`symptom-${symptom}`}
                        >
                          {symptom}
                        </label>
                      </div>
                    ))}
                  </div>
                  {form.symptom.includes("أخرى") && (
                    <input
                      className="form-control mt-2"
                      type="text"
                      name="otherSymptom"
                      value={form.otherSymptom}
                      onChange={handleChange}
                      placeholder={t("other_symptom_placeholder")}
                    />
                  )}
                </div>

                {/* مدة المشكلة */}
                <div className="mb-4">
                  <label className="form-label fw-bold text-primary fs-4">
                    {t("duration_label")}
                  </label>
                  <select
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">{t("choose_duration")}</option>
                    {durationOptions.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>

                {/* أمراض مزمنة */}
                <div className="mb-4">
                  <label className="form-label fw-bold text-primary fs-4">
                    {t("chronic_label")}
                  </label>
                  <div className="d-flex flex-wrap gap-3">
                    {chronicOptions.map((chronic) => (
                      <div className="form-check" key={chronic}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="chronic"
                          value={chronic}
                          checked={form.chronic.includes(chronic)}
                          onChange={handleCheckboxChange}
                          id={`chronic-${chronic}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`chronic-${chronic}`}
                        >
                          {chronic}
                        </label>
                      </div>
                    ))}
                  </div>
                  {form.chronic.includes("أخرى") && (
                    <input
                      className="form-control mt-2"
                      type="text"
                      name="otherChronic"
                      value={form.otherChronic}
                      onChange={handleChange}
                      placeholder={t("other_chronic_placeholder")}
                    />
                  )}
                </div>

                {/* هل تأخذ أدوية؟ */}
                <div className="mb-4">
                  <label className="form-label fw-bold text-primary fs-4">
                    {t("meds_label")}
                  </label>
                  <div className="d-flex gap-3 align-items-center mb-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="takesMed"
                        value="نعم"
                        checked={form.takesMed === "نعم"}
                        onChange={handleChange}
                        id="takesMedYes"
                      />
                      <label className="form-check-label" htmlFor="takesMedYes">
                        {t("yes")}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="takesMed"
                        value="لا"
                        checked={form.takesMed === "لا"}
                        onChange={handleChange}
                        id="takesMedNo"
                      />
                      <label className="form-check-label" htmlFor="takesMedNo">
                        {t("no")}
                      </label>
                    </div>
                  </div>
                  {form.takesMed === "نعم" && (
                    <input
                      className="form-control"
                      type="text"
                      name="meds"
                      value={form.meds}
                      onChange={handleChange}
                      placeholder={t("meds_placeholder")}
                    />
                  )}
                </div>

                {/* زيارة لنفس المشكلة + الحساسية */}
                <div className="row mb-4">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label fw-bold text-primary fs-4">
                      {t("visited_label")}
                    </label>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="visitedBefore"
                          value="نعم"
                          checked={form.visitedBefore === "نعم"}
                          onChange={handleChange}
                          id="visitedBeforeYes"
                        />
                        <label className="form-check-label" htmlFor="visitedBeforeYes">
                          {t("yes")}
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="visitedBefore"
                          value="لا"
                          checked={form.visitedBefore === "لا"}
                          onChange={handleChange}
                          id="visitedBeforeNo"
                        />
                        <label className="form-check-label" htmlFor="visitedBeforeNo">
                          {t("no")}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold text-primary fs-4">
                      {t("allergy_label")}
                    </label>
                    <div className="d-flex gap-3 align-items-center mb-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="hasAllergy"
                          value="نعم"
                          checked={form.hasAllergy === "نعم"}
                          onChange={handleChange}
                          id="hasAllergyYes"
                        />
                        <label className="form-check-label" htmlFor="hasAllergyYes">
                          {t("yes")}
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="hasAllergy"
                          value="لا"
                          checked={form.hasAllergy === "لا"}
                          onChange={handleChange}
                          id="hasAllergyNo"
                        />
                        <label className="form-check-label" htmlFor="hasAllergyNo">
                          {t("no")}
                        </label>
                      </div>
                    </div>
                    {form.hasAllergy === "نعم" && (
                      <input
                        className="form-control"
                        type="text"
                        name="allergyType"
                        value={form.allergyType}
                        onChange={handleChange}
                        placeholder={t("allergy_placeholder")}
                      />
                    )}
                  </div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg fw-bold">
                    <i className="bi bi-send me-2"></i>
                    {t("submit")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
