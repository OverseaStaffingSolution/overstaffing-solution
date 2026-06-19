import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, Language } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'EN';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    // Update HTML lang attribute for accessibility and SEO
    document.documentElement.lang = language.toLowerCase();
    
    // Update Title and Description meta tags for dynamic SEO
    const activeTranslations = translations[language];
    if (activeTranslations) {
      document.title = activeTranslations['seo.title'] || document.title;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', activeTranslations['seo.desc'] || '');
      }

      const metaOgTitle = document.querySelector('meta[property="og:title"]');
      if (metaOgTitle) {
        metaOgTitle.setAttribute('content', activeTranslations['seo.title'] || '');
      }

      const metaOgDesc = document.querySelector('meta[property="og:description"]');
      if (metaOgDesc) {
        metaOgDesc.setAttribute('content', activeTranslations['seo.desc'] || '');
      }
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
