import React, { useState } from "react";
import earthyTones from "../colors";

const styles = {
    wrapper: {
        maxWidth: "600px",
        margin: "48px auto",
        background: earthyTones.beige,
        borderRadius: "16px",
        boxShadow: `0 4px 18px ${earthyTones.mocha}33`,
        padding: "40px 32px",
        fontFamily: "Segoe UI, Arial, sans-serif",
        color: earthyTones.clay,
    },
    title: {
        fontWeight: 700,
        fontSize: "2rem",
        color: earthyTones.brown,
        textAlign: "center",
        marginBottom: "28px",
        letterSpacing: "1px",
    },
    section: {
        background: earthyTones.light,
        borderRadius: "10px",
        padding: "18px 16px",
        marginBottom: "22px",
        boxShadow: `0 1px 6px ${earthyTones.mocha}22`,
    },
    label: {
        fontWeight: 600,
        color: earthyTones.mocha,
        marginBottom: "10px",
        display: "block",
        fontSize: "1.08rem",
    },
    group: {
        marginBottom: "16px",
    },
    checkboxLabel: {
        marginRight: "18px",
        color: earthyTones.clay,
        fontWeight: 500,
        cursor: "pointer",
        fontSize: "1rem",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "8px",
    },
    radioLabel: {
        marginRight: "18px",
        color: earthyTones.clay,
        fontWeight: 500,
        cursor: "pointer",
        fontSize: "1rem",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "8px",
    },
    input: {
        width: "100%",
        padding: "10px 14px",
        border: `1px solid ${earthyTones.mocha}`,
        borderRadius: "6px",
        fontSize: "1rem",
        marginTop: "8px",
        background: "#fff",
        color: earthyTones.clay,
        outline: "none",
        marginBottom: "10px",
        boxSizing: "border-box",
    },
    button: {
        width: "100%",
        background: earthyTones.brown,
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "14px",
        fontWeight: 700,
        fontSize: "1.1rem",
        cursor: "pointer",
        boxShadow: `0 2px 8px ${earthyTones.mocha}33`,
        marginTop: "18px",
        letterSpacing: "1px",
        transition: "background 0.2s",
    },
};

const symptomsList = [
    "صداع",
    "سعال",
    "حمى",
    "ألم في البطن",
    "دوخة",
    "أخرى",
];

const chronicList = [
    "سكر",
    "ضغط",
    "قلب",
    "ربو",
    "لا يوجد",
    "أخرى",
];

const PreCheckSurvey = () => {
    const [form, setForm] = useState({
        symptoms: [],
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

    const handleCheckbox = (field, value) => {
        setForm((prev) => {
            const arr = prev[field];
            if (arr.includes(value)) {
                return { ...prev, [field]: arr.filter((v) => v !== value) };
            } else {
                return { ...prev, [field]: [...arr, value] };
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("تم إرسال الاستبيان بنجاح!");
    };

    return (
        <div style={styles.wrapper}>
            <h2 style={styles.title}>استبيان ما قبل الكشف</h2>
            <form onSubmit={handleSubmit}>
                {/* أعراض حالية */}
                <div style={styles.section}>
                    <label style={styles.label}>ما هي الأعراض التي تعاني منها حاليًا؟</label>
                    <div style={styles.group}>
                        {symptomsList.map((symptom) => (
                            <label key={symptom} style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={form.symptoms.includes(symptom)}
                                    onChange={() => handleCheckbox("symptoms", symptom)}
                                />
                                {symptom}
                            </label>
                        ))}
                    </div>
                    {form.symptoms.includes("أخرى") && (
                        <input
                            style={styles.input}
                            type="text"
                            name="otherSymptom"
                            value={form.otherSymptom}
                            onChange={handleChange}
                            placeholder="يرجى ذكر الأعراض الأخرى"
                        />
                    )}
                </div>

                {/* مدة الأعراض */}
                <div style={styles.section}>
                    <label style={styles.label}>منذ متى بدأت هذه الأعراض؟</label>
                    <div style={styles.group}>
                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                name="duration"
                                value="أقل من 24 ساعة"
                                checked={form.duration === "أقل من 24 ساعة"}
                                onChange={handleChange}
                            />
                            أقل من 24 ساعة
                        </label>
                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                name="duration"
                                value="من يوم إلى 3 أيام"
                                checked={form.duration === "من يوم إلى 3 أيام"}
                                onChange={handleChange}
                            />
                            من يوم إلى 3 أيام
                        </label>
                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                name="duration"
                                value="أكثر من 3 أيام"
                                checked={form.duration === "أكثر من 3 أيام"}
                                onChange={handleChange}
                            />
                            أكثر من 3 أيام
                        </label>
                    </div>
                </div>

                {/* أمراض مزمنة */}
                <div style={styles.section}>
                    <label style={styles.label}>هل تعاني من أي أمراض مزمنة؟</label>
                    <div style={styles.group}>
                        {chronicList.map((chronic) => (
                            <label key={chronic} style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={form.chronic.includes(chronic)}
                                    onChange={() => handleCheckbox("chronic", chronic)}
                                />
                                {chronic}
                            </label>
                        ))}
                    </div>
                    {form.chronic.includes("أخرى") && (
                        <input
                            style={styles.input}
                            type="text"
                            name="otherChronic"
                            value={form.otherChronic}
                            onChange={handleChange}
                            placeholder="يرجى ذكر المرض المزمن"
                        />
                    )}
                </div>

                {/* أدوية حالية */}
                <div style={styles.section}>
                    <label style={styles.label}>هل تأخذ أي أدوية حاليًا؟</label>
                    <div style={styles.group}>
                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                name="takesMed"
                                value="نعم"
                                checked={form.takesMed === "نعم"}
                                onChange={handleChange}
                            />
                            نعم
                        </label>
                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                name="takesMed"
                                value="لا"
                                checked={form.takesMed === "لا"}
                                onChange={handleChange}
                            />
                            لا
                        </label>
                    </div>
                    {form.takesMed === "نعم" && (
                        <input
                            style={styles.input}
                            type="text"
                            name="meds"
                            value={form.meds}
                            onChange={handleChange}
                            placeholder="يرجى كتابة أسماء الأدوية"
                        />
                    )}
                </div>

                {/* زيارة الطبيب لنفس المشكلة */}
                <div style={styles.section}>
                    <label style={styles.label}>هل سبق لك زيارة الطبيب لنفس المشكلة؟</label>
                    <div style={styles.group}>
                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                name="visitedBefore"
                                value="نعم"
                                checked={form.visitedBefore === "نعم"}
                                onChange={handleChange}
                            />
                            نعم
                        </label>
                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                name="visitedBefore"
                                value="لا"
                                checked={form.visitedBefore === "لا"}
                                onChange={handleChange}
                            />
                            لا
                        </label>
                    </div>
                </div>

                {/* حساسية من أدوية */}
                <div style={styles.section}>
                    <label style={styles.label}>هل لديك حساسية من أدوية معينة؟</label>
                    <div style={styles.group}>
                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                name="hasAllergy"
                                value="نعم"
                                checked={form.hasAllergy === "نعم"}
                                onChange={handleChange}
                            />
                            نعم
                        </label>
                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                name="hasAllergy"
                                value="لا"
                                checked={form.hasAllergy === "لا"}
                                onChange={handleChange}
                            />
                            لا
                        </label>
                    </div>
                    {form.hasAllergy === "نعم" && (
                        <input
                            style={styles.input}
                            type="text"
                            name="allergyType"
                            value={form.allergyType}
                            onChange={handleChange}
                            placeholder="حدد نوع الحساسية"
                        />
                    )}
                </div>

                <button type="submit" style={styles.button}>إرسال</button>
            </form>
        </div>
    );
};

export default PreCheckSurvey;
