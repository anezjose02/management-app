import { useRouter } from 'next/router';
const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale } = router;

  const handleLanguageChange = (lang: string) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div className="switchContainer mt-4">
      <button
        className={`switchButton ${locale === 'en' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('en')}
      >
        English
      </button>
      <button
        className={`switchButton ${locale === 'es' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('es')}
      >
        Español
      </button>
    </div>
  );
};

export default LanguageSwitcher;