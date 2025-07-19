import React from "react";
import { Link } from "react-router-dom";
import earthyTones from "../colors";
import SearchBar from "../components/search";

const styles = {
    wrapper: {
        background: earthyTones.light,
        minHeight: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif",
        color: earthyTones.clay,
    },
    hero: {
        background: earthyTones.beige,
        padding: "48px 0 32px 0",
        textAlign: "center",
        borderBottom: `2px solid ${earthyTones.mocha}`,
    },
    heroTitle: {
        color: earthyTones.brown,
        fontSize: "2.8rem",
        fontWeight: 700,
        marginBottom: "16px",
    },
    heroDesc: {
        color: earthyTones.clay,
        fontSize: "1.25rem",
        marginBottom: "24px",
    },
    heroButtons: {
        display: "flex",
        justifyContent: "center",
        gap: "16px",
    },
    btnPrimary: {
        background: earthyTones.brown,
        color: "#fff",
        border: "none",
        padding: "12px 32px",
        borderRadius: "6px",
        fontWeight: 600,
        textDecoration: "none",
        boxShadow: `0 2px 8px ${earthyTones.mocha}33`,
    },
    btnSecondary: {
        background: earthyTones.mocha,
        color: "#fff",
        border: "none",
        padding: "12px 32px",
        borderRadius: "6px",
        fontWeight: 600,
        textDecoration: "none",
        boxShadow: `0 2px 8px ${earthyTones.clay}33`,
    },
    section: {
        padding: "40px 0",
        textAlign: "center",
    },
    sectionTitle: {
        color: earthyTones.brown,
        fontSize: "2rem",
        fontWeight: 600,
        marginBottom: "18px",
    },
    aboutDesc: {
        color: earthyTones.clay,
        fontSize: "1.1rem",
        maxWidth: "700px",
        margin: "0 auto",
    },
    features: {
        display: "flex",
        justifyContent: "center",
        gap: "32px",
        marginTop: "24px",
        flexWrap: "wrap",
    },
    feature: {
        background: "#fff",
        border: `1px solid ${earthyTones.beige}`,
        borderRadius: "10px",
        boxShadow: `0 2px 12px ${earthyTones.mocha}22`,
        padding: "28px 22px",
        minWidth: "220px",
        maxWidth: "260px",
        textAlign: "left",
    },
    featureTitle: {
        color: earthyTones.mocha,
        fontSize: "1.25rem",
        fontWeight: 600,
        marginBottom: "10px",
    },
    featureDesc: {
        color: earthyTones.clay,
        fontSize: "1rem",
    },
    footer: {
        background: earthyTones.brown,
        color: "#fff",
        padding: "24px 0",
        textAlign: "center",
        marginTop: "48px",
    },
    footerLink: {
        color: "#fff",
        textDecoration: "underline",
    },
};

const Home = () => {
    return (
        <div style={styles.wrapper}>
            <SearchBar />
            {/* Hero Section */}
            <section style={styles.hero}>
                <div>
                    <h1 style={styles.heroTitle}>Welcome to Smart Clinic</h1>
                    <p style={styles.heroDesc}>
                        Your health, our priority. Discover personalized care,
                        smart appointment scheduling, and seamless medical services.
                    </p>
                    <div style={styles.heroButtons}>
                        <Link style={styles.btnPrimary} to="/services">Explore Services</Link>
                        <Link style={styles.btnSecondary} to="/report">Book Appointment</Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Why Smart Clinic?</h2>
                <p style={styles.aboutDesc}>
                    We combine technology and compassion to deliver the best healthcare experience.
                    With our smart system, you can manage appointments, access your medical records,
                    and consult with experts anytime, anywhere.
                </p>
            </section>

            {/* Features Section */}
            <section style={styles.section}>
                <div style={styles.features}>
                    <div style={styles.feature}>
                        <h3 style={styles.featureTitle}>Smart Booking</h3>
                        <p style={styles.featureDesc}>Schedule appointments easily using our intelligent system.</p>
                    </div>
                    <div style={styles.feature}>
                        <h3 style={styles.featureTitle}>Expert Doctors</h3>
                        <p style={styles.featureDesc}>Get care from top-tier physicians in various specializations.</p>
                    </div>
                    <div style={styles.feature}>
                        <h3 style={styles.featureTitle}>Health Records</h3>
                        <p style={styles.featureDesc}>Access your medical history securely from anywhere.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                <div>
                    <p>© 2025 Smart Clinic. All Rights Reserved.</p>
                    <p>
                        <strong>Contact:</strong>{" "}
                        <a style={styles.footerLink} href="mailto:info@smartclinic.com">info@smartclinic.com</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
