import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faChevronDown,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useRef, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import "./Header.css";

const LanguageOverflow = () => {
  const { languages, selectedLanguage, handleLanguageChange } =
    useContext(LanguageContext);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef();
  const selectedLanguageName = languages.find(
    (lang) => lang.code === selectedLanguage
  )?.name;

  useEffect(() => {
    const handleLanguageMenuClickOutside = (e) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(e.target) &&
        !e.target.closest(".lang-icon")
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleLanguageMenuClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleLanguageMenuClickOutside);
    };
  }, [isLanguageMenuOpen]);

  return (
    <div className="header-language">
      <button
        className="lang-icon"
        onClick={() => {
          setIsLanguageMenuOpen(!isLanguageMenuOpen);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsLanguageMenuOpen(!isLanguageMenuOpen);
          }
        }}
      >
        <FontAwesomeIcon icon={faGlobe} className="header-icon" />
        <span>{selectedLanguageName}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="header-icon"
          style={{ fontSize: "10px" }}
        />
      </button>
      <div
        className={`overflow-menu ${isLanguageMenuOpen ? "show" : ""}`}
        ref={languageMenuRef}
      >
        <div data-testid="language-overflow" className="language-menu-item">
          {languages.map((language) => (
            <button
              key={language.id}
              onClick={() => {
                handleLanguageChange(language.code);
                setIsLanguageMenuOpen(false);
              }}
              className="language-menu-button"
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`header-icon ${
                  language.code == selectedLanguage
                    ? "checkcircle-active"
                    : "checkcircle-inactive"
                }`}
              />
              <span className="hover-underline-animation">{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageOverflow;
