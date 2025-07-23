import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation();
    return (
        <div
            className="min-vh-100 d-flex flex-column">
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <h1 className="display-3 fw-bold text-white mb-4">{t("clinic_name")}</h1>
            </div>
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="rounded-4 p-5 text-center shadow-lg">
                    <Link
                        className="btn btn-primary px-5 py-3 fw-bold text-white fs-4"
                        to="/report"
                    >
                        {t("book_appointment")}
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
