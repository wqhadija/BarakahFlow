import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations } from '../lib/translations';

export type Language = 'en' | 'ms' | 'ar';
export type TranslationKey = keyof typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languageMap: Record<Language, { name: string; dir: 'ltr' | 'rtl' }> = {
    en: { name: 'English', dir: 'ltr' },
    ms: { name: 'Bahasa Melayu', dir: 'ltr' },
    ar: { name: 'العربية', dir: 'rtl' },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = languageMap[language].dir;
    if (language === 'ar') {
        document.body.classList.add('font-arabic');
    } else {
        document.body.classList.remove('font-arabic');
    }
  }, [language]);
  
  const t = (key: TranslationKey): string => {
    return translations[key][language] || translations[key]['en'];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { languageMap };
