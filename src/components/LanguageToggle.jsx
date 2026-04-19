function LanguageToggle({ currentLanguage, onChange }) {
  return (
    <div className="lang-toggle">
      <button
        type="button"
        className={`lang-btn${currentLanguage === 'en' ? ' active' : ''}`}
        onClick={() => onChange('en')}
      >
        A
      </button>
      <button
        type="button"
        className={`lang-btn${currentLanguage === 'mr' ? ' active' : ''}`}
        onClick={() => onChange('mr')}
      >
        अ
      </button>
    </div>
  )
}

export default LanguageToggle
