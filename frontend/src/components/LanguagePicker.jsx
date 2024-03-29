import useLanguage from '../hooks/useLanguage';
import './LanguagePicker.css';

export const LanguagePicker = () => {
  const { languages, selectedLanguage, handleLanguageChange, t } = useLanguage();

  return (
    <div className='language-container'>
      <h2>{t('Choose a language')}:</h2>
      <select value={selectedLanguage} onChange={(event) => handleLanguageChange(event.target.value)} className='language-picker'>
        {languages.map((language) => (
          <option key={language.id} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguagePicker;