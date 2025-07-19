import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/slices/language";

const LanguageSwitcher = () => {
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "right", margin: "8px 32px" }}>
      <button onClick={() => dispatch(setLanguage("ar"))} disabled={lang === "ar"}>العربية</button>
      <button onClick={() => dispatch(setLanguage("en"))} disabled={lang === "en"} style={{ marginLeft: "8px" }}>English</button>
    </div>
  );
};

export default LanguageSwitcher;
