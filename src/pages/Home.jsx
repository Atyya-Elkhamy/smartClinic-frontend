import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/footer";

const Home = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  return (
    <div dir={dir}>
      {/* ===== HERO ===== */}
      <section
        className="home-hero border-bottom"
        style={{
          background:
            "radial-gradient(1200px 500px at 90% 10%, rgba(27,60,83,.08), rgba(27,60,83,0)), radial-gradient(800px 400px at 0% 30%, rgba(210,193,182,.18), rgba(210,193,182,0))",
          borderColor: "var(--sc-border)",
        }}
      >
        <div className="container py-5 py-lg-6">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <span className="badge rounded-pill fw-semibold home-pill mb-3">
                {t("modern_care")} • {t("human_touch")}
              </span>

              <h1 className="display-4 fw-bold lh-1 mb-3" style={{ color: "var(--sc-primary)" }}>
                {t("hero_title_new")}
              </h1>

              <p className="lead text-muted">{t("hero_sub")}</p>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <Link to="/report" className="btn btn-lg " style={{
                background: "#fff",
                color: "var(--sc-primary)",
                borderColor: "var(--sc-secondary)",
                borderWidth: 1,
                borderStyle: "solid"
            }}>
                  {t("start_now")}
                </Link>
                <Link to="/about-doctor" className="btn btn-lg sc-btn-outline" style={{ backgroundColor: "var(--sc-secondary) " ,color: "var(--sc-bg)" }}>
                  {t("about_doctor")}
                </Link>
              </div>

              <div className="d-flex flex-wrap gap-4 mt-4 small text-muted">
                <div><i className="bi bi-shield-lock me-1" /> {t("secure_privacy")}</div>
                <div><i className="bi bi-lightning-charge me-1" /> {t("fast_response")}</div>
                <div><i className="bi bi-star me-1" /> {t("high_rating")}</div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="home-device sc-card p-3 position-relative">
                <div
                  className="rounded-4 mb-3"
                  style={{
                    background: "#E9EEF2",
                    height: 500,
                    border: "1px solid var(--sc-border)",
                    backgroundImage:"url(public/images/doctor-with-his-arms-crossed-white-background.jpg )",
                    backgroundSize: "cover",
                  }}
                />
                <div className="home-floating sc-card p-3 d-flex align-items-start gap-3">
                  <div className="fs-4"><i className="bi bi-laptop" /></div>
                  <div>
                    <div className="fw-semibold">{t("online_consult")}</div>
                    <div className="text-muted small">{t("from_home")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ color: "var(--sc-primary)" }}>{t("how_it_works")}</h2>
            <p className="text-muted mb-0">{t("how_it_works_sub")}</p>
          </div>

          <div className="row g-4 align-items-stretch">
            {[
              { icon: "chat-square-text", title: t("step1"), text: t("step1_text") },
              { icon: "person-check", title: t("step2"), text: t("step2_text") },
              { icon: "capsule", title: t("step3"), text: t("step3_text") },
            ].map((s, i) => (
              <div key={i} className="col-12 col-lg-4">
                <div className="sc-card h-100 p-4">
                  <div className="step-icon mb-3"><i className={`bi bi-${s.icon}`} /></div>
                  <div className="fw-bold fs-5 mb-1">{s.title}</div>
                  <p className="text-muted mb-0">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-5" style={{ background: "#fff" }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <h3 className="fw-bold" style={{ color: "var(--sc-secondary)" }}>
                {t("why_us")}
              </h3>
              <p className="text-muted">{t("benefits_sub")}</p>
              <ul className="list-unstyled m-0">
                {[t("benefit1"), t("benefit2"), t("benefit3"), t("benefit4")].map((b, i) => (
                  <li key={i} className="d-flex align-items-start gap-2 mb-2">
                    <i className="bi bi-check2-circle" style={{ color: "var(--sc-primary)" }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                {[{ icon: "bell", title: t("reminders") },
                  { icon: "lightning", title: t("fast_diagnosis") },
                  { icon: "shield-lock", title: t("privacy") },
                  { icon: "heart", title: t("care_focus") }
                ].map((f, i) => (
                  <div key={i} className="col-6">
                    <div className="sc-card p-3 h-100">
                      <div className="fs-4 mb-2"><i className={`bi bi-${f.icon}`} /></div>
                      <div className="fw-semibold">{f.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT THE DOCTOR ===== */}
      <section className="py-5">
        <div className="container">
          <h3 className="fw-bold mb-4" style={{ color: "var(--sc-primary)" }}>
            {t("about_doctor")}
          </h3>
          <div className="sc-card p-4 d-flex flex-column flex-lg-row align-items-center gap-4">
            <div
              className="rounded-circle"
              style={{ width: 120, height: 120, background: "#E9EEF2", border: "1px solid var(--sc-border)" ,   backgroundImage:"url(public/images/doctor-with-his-arms-crossed-white-background.jpg )",
                backgroundSize: "cover", }}
            />
            <div>
              <h5 className="fw-semibold mb-1">{t("doctor_name_full")}</h5>
              <p className="text-muted mb-2">{t("doctor_specialty")}</p>
              <p className="mb-0">{t("doctor_bio")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-5 py-lg-6">
        <div className="container text-center">
          <h2 className="fw-bold mb-2" style={{ color: "var(--sc-primary)" }}>
            {t("cta_title")}
          </h2>
          <p className="text-muted mb-4">{t("cta_sub")}</p>
          <div className="d-flex justify-content-center gap-2">
          <Link to="/report" className="btn btn-lg" style={{
                background: "#fff",
                color: "var(--sc-bg)",
                backgroundColor: "var(--sc-secondary)",
                borderWidth: 1,
                borderStyle: "solid"
            }}>
            {t("book_appointment")}
          </Link>       
               <Link to="/report" className="btn btn-lg sc-btn-outline" style={{
                background: "#fff",
                color: "var(--sc-primary)",
                borderColor: "var(--sc-secondary)",
                borderWidth: 1,
                borderStyle: "solid"
            }}>{t("login")}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
