import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const Home = () => {
    return (
        <div
            className="min-vh-100 d-flex flex-column"
            style={{
                background: "url('/images/img3.jpg') center center/cover no-repeat",
            }}
        >
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <h1 className="display-3 fw-bold text-primary mb-4">Smart Clinic</h1>
            </div>
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="rounded-4 p-5 text-center shadow-lg">
                    <Link
                        className="btn btn-dark px-5 py-3 fw-bold text-white fs-4"
                        to="/report"
                    >
                        Book Appointment
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
