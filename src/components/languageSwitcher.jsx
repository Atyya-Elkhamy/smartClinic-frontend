import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
      >
        {i18n.language === "ar" ? "العربية" : "English"}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button className="dropdown-item" onClick={() => i18n.changeLanguage("ar")}>العربية</button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => i18n.changeLanguage("en")}>English</button>
        </li>
      </ul>
    </div>
  );
};
export default LanguageSwitcher;
