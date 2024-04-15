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
  //   const [isOpen, setIsOpen] = useState(false);
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
      <div
        className="lang-icon"
        onClick={() => {
          //   if (!isLanguageMenuOpen) {
          //     setIsOpen(false);
          //   }
          setIsLanguageMenuOpen(!isLanguageMenuOpen);
        }}
      >
        <FontAwesomeIcon icon={faGlobe} className="header-icon" />
        <span>{selectedLanguageName}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="header-icon"
          style={{ fontSize: "10px" }}
        />
      </div>
      <div
        
        className={`overflow-menu ${isLanguageMenuOpen ? "show" : ""}`}
        ref={languageMenuRef}
      >
        <ul data-testid="language-overflow" className="language-menu-item">
          {languages.map((language) => (
            <li
              key={language.id}
              onClick={() => {
                handleLanguageChange(language.code);
                setIsLanguageMenuOpen(false);
              }}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageOverflow;
