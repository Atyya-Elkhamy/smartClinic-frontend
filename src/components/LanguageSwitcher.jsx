import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/slices/language";

const LANGS = [
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "en", label: "English", dir: "ltr" },
];

const LanguageSwitcher = () => {
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    const selected = LANGS.find((l) => l.code === lang) || LANGS[0];
    document.documentElement.dir = selected.dir;
  }, [lang]);

  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle fw-semibold"
        type="button"
        id="langDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {LANGS.find((l) => l.code === lang)?.label || "Language"}
      </button>
      <ul className="dropdown-menu" aria-labelledby="langDropdown">
        {LANGS.map((l) => (
          <li key={l.code}>
            <button
              className={`dropdown-item${lang === l.code ? " active" : ""}`}
              onClick={() => dispatch(setLanguage(l.code))}
              disabled={lang === l.code}
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
