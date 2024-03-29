import useLanguage from '../hooks/useLanguage';

export const LanguagePicker = () => {
  const { languages, selectedLanguage, handleLanguageChange, t } = useLanguage();

  return (
    <>
      <h2>{t('Choose a language')}:</h2>
      <select value={selectedLanguage} onChange={(event) => handleLanguageChange(event.target.value)}>
        {languages.map((language) => (
          <option key={language.id} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default LanguagePicker;