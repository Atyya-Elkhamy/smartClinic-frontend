import React, { useState } from "react";

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
  const [form, setForm] = useState({
    symptom: "",
    otherSymptom: "",
    duration: "",
    chronic: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم إرسال الاستبيان بنجاح!");
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-7">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="card-title text-center fw-bold text-primary mb-4">استبيان ما قبل الكشف</h2>
              <form onSubmit={handleSubmit}>
                {/* أعراض حالية */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">ما هي الأعراض التي تعاني منها حاليًا؟</label>
                  <select
                    name="symptom"
                    value={form.symptom}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">اختر العرض</option>
                    {symptomsOptions.map((symptom) => (
                      <option key={symptom} value={symptom}>{symptom}</option>
                    ))}
                  </select>
                  {form.symptom === "أخرى" && (
                    <input
                      className="form-control mt-2"
                      type="text"
                      name="otherSymptom"
                      value={form.otherSymptom}
                      onChange={handleChange}
                      placeholder="يرجى ذكر الأعراض الأخرى"
                    />
                  )}
                </div>

                {/* مدة الأعراض */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">منذ متى بدأت هذه الأعراض؟</label>
                  <select
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">اختر المدة</option>
                    {durationOptions.map((duration) => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>

                {/* أمراض مزمنة */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">هل تعاني من أي أمراض مزمنة؟</label>
                  <select
                    name="chronic"
                    value={form.chronic}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">اختر المرض المزمن</option>
                    {chronicOptions.map((chronic) => (
                      <option key={chronic} value={chronic}>{chronic}</option>
                    ))}
                  </select>
                  {form.chronic === "أخرى" && (
                    <input
                      className="form-control mt-2"
                      type="text"
                      name="otherChronic"
                      value={form.otherChronic}
                      onChange={handleChange}
                      placeholder="يرجى ذكر المرض المزمن"
                    />
                  )}
                </div>

                {/* أدوية حالية */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">هل تأخذ أي أدوية حاليًا؟</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="takesMed"
                        value="نعم"
                        checked={form.takesMed === "نعم"}
                        onChange={handleChange}
                        id="takesMedYes"
                      />
                      <label className="form-check-label" htmlFor="takesMedYes">نعم</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="takesMed"
                        value="لا"
                        checked={form.takesMed === "لا"}
                        onChange={handleChange}
                        id="takesMedNo"
                      />
                      <label className="form-check-label" htmlFor="takesMedNo">لا</label>
                    </div>
                  </div>
                  {form.takesMed === "نعم" && (
                    <input
                      className="form-control mt-2"
                      type="text"
                      name="meds"
                      value={form.meds}
                      onChange={handleChange}
                      placeholder="يرجى كتابة أسماء الأدوية"
                    />
                  )}
                </div>

                {/* زيارة الطبيب لنفس المشكلة */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">هل سبق لك زيارة الطبيب لنفس المشكلة؟</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="visitedBefore"
                        value="نعم"
                        checked={form.visitedBefore === "نعم"}
                        onChange={handleChange}
                        id="visitedBeforeYes"
                      />
                      <label className="form-check-label" htmlFor="visitedBeforeYes">نعم</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="visitedBefore"
                        value="لا"
                        checked={form.visitedBefore === "لا"}
                        onChange={handleChange}
                        id="visitedBeforeNo"
                      />
                      <label className="form-check-label" htmlFor="visitedBeforeNo">لا</label>
                    </div>
                  </div>
                </div>

                {/* حساسية من أدوية */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">هل لديك حساسية من أدوية معينة؟</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="hasAllergy"
                        value="نعم"
                        checked={form.hasAllergy === "نعم"}
                        onChange={handleChange}
                        id="hasAllergyYes"
                      />
                      <label className="form-check-label" htmlFor="hasAllergyYes">نعم</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="hasAllergy"
                        value="لا"
                        checked={form.hasAllergy === "لا"}
                        onChange={handleChange}
                        id="hasAllergyNo"
                      />
                      <label className="form-check-label" htmlFor="hasAllergyNo">لا</label>
                    </div>
                  </div>
                  {form.hasAllergy === "نعم" && (
                    <input
                      className="form-control mt-2"
                      type="text"
                      name="allergyType"
                      value={form.allergyType}
                      onChange={handleChange}
                      placeholder="حدد نوع الحساسية"
                    />
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold mt-3">إرسال</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
