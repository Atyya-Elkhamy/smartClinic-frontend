import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/footer";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const FocusMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.5 });
    }
  }, [position]); // logic unchanged
  return null;
};

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl"; // logic unchanged

  const [userLocation, setUserLocation] = useState([51.505, -0.09]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.warn("Location access denied or unavailable:", error.message);
        }
      );
    }
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero */}
      <section className="sc-hero position-relative overflow-hidden">
        <div className="container py-5 py-lg-6">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9">
              <span className="badge rounded-pill px-3 py-2 sc-badge">
                {t("about_us")}
              </span>
              <h1 className="display-5 fw-bold mt-3 mb-3" style={{ color: "var(--sc-primary)" }}>
                {t("clinic_name", { defaultValue: "Smart Clinic" })}
              </h1>
              <p className="lead mb-0" style={{ color: "var(--sc-secondary)" }}>
                {t("about_us_description", {
                  defaultValue:
                    "We deliver compassionate, modern healthcare powered by smart technology and a trusted medical team.",
                })}
              </p>
              <div className="sc-divider mx-auto mt-4" />
            </div>
          </div>
        </div>
        {/* soft background shapes */}
        <div className="sc-blob sc-blob-a" />
        <div className="sc-blob sc-blob-b" />
      </section>

      {/* Stats */}
      <section className="py-4 py-md-5">
        <div className="container">
          <div className="row g-3 g-md-4 text-center">
            <div className="col-6 col-md-4">
              <div className="sc-stat">
                <div className="sc-stat-number">12+</div>
                <div className="sc-stat-label">{t("years_experience", { defaultValue: "Years of Care" })}</div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="sc-stat">
                <div className="sc-stat-number">25k+</div>
                <div className="sc-stat-label">{t("patients_served", { defaultValue: "Patients Served" })}</div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="sc-stat">
                <div className="sc-stat-number">4.9/5</div>
                <div className="sc-stat-label">{t("patient_rating", { defaultValue: "Average Satisfaction" })}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission + Values */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-lg-10">
              <div className="sc-card p-4 p-md-5">
                <div className={`d-flex ${isRTL ? "flex-row-reverse" : ""} align-items-start gap-3`}>
                  <div className="sc-icon-bubble">
                    <i className="bi bi-heart-pulse-fill" />
                  </div>
                  <div className="flex-grow-1">
                    <h3 className="fw-bold mb-2" style={{ color: "var(--sc-primary)" }}>
                      {t("about_us")}
                    </h3>
                    <p className="text-secondary mb-4">
                      {t("about_us_description", {
                        defaultValue:
                          "We are a dedicated healthcare provider committed to delivering exceptional medical care with compassion and expertise.",
                      })}
                    </p>
                    <div className="sc-subdivider mb-3" />
                    <p className="fw-semibold mb-0" style={{ color: "var(--sc-primary)" }}>
                      <i className="bi bi-bullseye me-2 text-success"></i>
                      {t("about_us_mission", {
                        defaultValue:
                          "Our mission is to provide accessible, high-quality healthcare to all, fostering a healthier and happier community.",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Values grid */}
            <div className="col-lg-10">
              <div className="row g-3 g-md-4">
                <div className="col-md-4">
                  <div className="sc-value-card h-100 p-4">
                    <div className="sc-icon-bubble mb-2"><i className="bi bi-people-fill" /></div>
                    <h6 className="fw-semibold mb-1" style={{ color: "var(--sc-primary)" }}>
                      {t("human_care", { defaultValue: "Human-Centered Care" })}
                    </h6>
                    <p className="text-secondary mb-0">
                      {t("human_care_desc", { defaultValue: "Empathy first, always. We listen and guide your health journey." })}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="sc-value-card h-100 p-4">
                    <div className="sc-icon-bubble mb-2"><i className="bi bi-cpu-fill" /></div>
                    <h6 className="fw-semibold mb-1" style={{ color: "var(--sc-primary)" }}>
                      {t("smart_tech", { defaultValue: "Smart Technology" })}
                    </h6>
                    <p className="text-secondary mb-0">
                      {t("smart_tech_desc", { defaultValue: "Online booking, telehealth, and secure digital records." })}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="sc-value-card h-100 p-4">
                    <div className="sc-icon-bubble mb-2"><i className="bi bi-universal-access-circle" /></div>
                    <h6 className="fw-semibold mb-1" style={{ color: "var(--sc-primary)" }}>
                      {t("accessibility", { defaultValue: "Accessibility" })}
                    </h6>
                    <p className="text-secondary mb-0">
                      {t("accessibility_desc", { defaultValue: "Same-day slots and flexible care options for busy lives." })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact + CTA */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6">
              <div className="sc-card h-100 p-4 p-md-5">
                <h4 className="fw-bold mb-4" style={{ color: "var(--sc-primary)" }}>
                  <i className="bi bi-person-lines-fill me-2"></i>
                  {t("contact_us")}
                </h4>

                <div className="d-flex align-items-start mb-3">
                  <div className="sc-icon-bubble me-3"><i className="bi bi-envelope-fill" /></div>
                  <div>
                    <h6 className="fw-semibold mb-1">{t("email")}</h6>
                    <a href="mailto:info@clinic.com" className="text-decoration-none" style={{ color: "var(--sc-primary)" }}>
                      info@clinic.com
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <div className="sc-icon-bubble me-3"><i className="bi bi-telephone-fill" /></div>
                  <div>
                    <h6 className="fw-semibold mb-1">{t("phone")}</h6>
                    <a href="tel:+1234567890" className="text-decoration-none" style={{ color: "var(--sc-primary)" }}>
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <div className="sc-icon-bubble me-3"><i className="bi bi-geo-alt-fill" /></div>
                  <div>
                    <h6 className="fw-semibold mb-1">{t("address")}</h6>
                    <span className="text-secondary">123 Health Street, Wellness City, WC 12345</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA card */}
            <div className="col-lg-6">
              <div className="sc-cta h-100 p-4 p-md-5">
                <h4 className="fw-bold mb-2 text-white">
                  {t("ready_to_feel_better", { defaultValue: "Ready to feel better?" })}
                </h4>
                <p className="mb-4 text-white-50">
                  {t("start_video_visit_now", { defaultValue: "Book a same-day appointment or start a video visit now." })}
                </p>
                <a href="/report" className="btn btn-light fw-semibold px-4 py-2 rounded-3">
                  {t("book_appointment", { defaultValue: "Book Appointment" })}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-5">
        <div className="container">
          <div className="text-center">
            <h2 className="fw-bold mb-2" style={{ color: "var(--sc-primary)" }}>
              <i className="bi bi-geo-alt-fill me-2"></i>
              {t("our_location")}
            </h2>
            <div className="sc-divider mx-auto" />
          </div>

          <div className="sc-map-card mt-4">
            <MapContainer
              center={userLocation}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              className="rounded-4"
            >
              <FocusMap position={userLocation} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={userLocation}>
                <Popup>
                  {t("your_location", { defaultValue: "Your Location" })}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
