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
  }, [position]);
  return null;
};

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

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
      {/* About Us Section */}
      <section className="py-5 flex-grow-1 position-relative overflow-hidden">
        <div className="container">
          <h1 className="display-4 fw-bold text-center text-primary mb-3 animate__animated animate__fadeInDown">
            {t("about_us")}
          </h1>
          <div className="d-flex justify-content-center mb-5">
            <hr className="w-25 opacity-100 border-2 border-primary" />
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 shadow-lg rounded-4 bg-white p-4 animate__animated animate__fadeInUp">
                <div className="card-body px-4 py-5 text-center">
                  <div className="mb-4">
                    <i className="bi bi-heart-pulse-fill text-danger fs-1"></i>
                    <h3 className="fw-bold text-primary mt-3">
                      {t("about_us")}
                    </h3>
                  </div>

                  <p className="lead fw-medium text-muted mb-4">
                    <i className="bi bi-info-circle-fill me-2 text-primary"></i>
                    {t("about_us_description", {
                      defaultValue:
                        "We are a dedicated healthcare provider committed to delivering exceptional medical care with compassion and expertise.",
                    })}
                  </p>

                  <div className="d-flex justify-content-center mb-4">
                    <hr className="w-50 opacity-50 border-top border-2 border-secondary" />
                  </div>

                  <p className="text-dark fw-semibold mb-0">
                    <i className="bi bi-bullseye text-success me-2"></i>
                    {t("about_us_mission", {
                      defaultValue:
                        "Our mission is to provide accessible, high-quality healthcare to all, fostering a healthier and happier community.",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-5">
        <div className="">
          <h2 className="display-5 fw-bold text-center text-primary mb-3">
            <i className="bi bi-person-lines-fill me-2"></i>
            {t("contact_us")}
          </h2>
          <hr
            className="mx-auto bg-primary"
            style={{ height: "4px", width: "80px", opacity: 0.7 }}
          />
          <div className="row justify-content-center my-5">
            <div className="col-lg-7">
              <div className="card shadow border-0 rounded-4">
                <div className="card-body p-5">
                  <h4 className="mb-4 fw-bold text-center text-secondary">
                    <i className="bi bi-chat-dots-fill me-2"></i>
                    {t("contact_us")}
                  </h4>
                  <div className="mb-4 d-flex">
                    <div className="me-3">
                      <i className="bi bi-envelope-fill text-primary fs-3"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">{t("email")}</h6>
                      <a
                        href="mailto:info@clinic.com"
                        className="text-decoration-none text-dark"
                      >
                        info@clinic.com
                      </a>
                    </div>
                  </div>

                  <div className="mb-4 d-flex">
                    <div className="me-3">
                      <i className="bi bi-telephone-fill text-success fs-3"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">{t("phone")}</h6>
                      <a
                        href="tel:+1234567890"
                        className="text-decoration-none text-dark"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="me-3">
                      <i className="bi bi-geo-alt-fill text-danger fs-3"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">{t("address")}</h6>
                      <span className="text-muted">
                        123 Health Street, Wellness City, WC 12345
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="display-5 fw-bold text-primary mb-3">
            <i className="bi bi-geo-alt-fill me-2"></i>
            {t("our_location")}
          </h2>
          <hr
            className="mx-auto bg-primary"
            style={{ height: "4px", width: "80px", opacity: 0.7 }}
          />

          <div
            className="rounded-4 overflow-hidden shadow-lg mt-4"
            style={{ height: "500px" }}
          >
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
