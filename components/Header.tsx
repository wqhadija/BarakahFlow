
import React, { useState, useRef, useEffect } from 'react';
import { CrescentIcon } from './Icons';
import { useLanguage, languageMap, Language } from '../contexts/LanguageContext';

const GlobeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
);


const Header: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setIsOpen(false);
    }

    return (
        <header className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <CrescentIcon className="h-8 w-8 text-[#E8C2CA]" />
                <h1 className="text-3xl font-bold font-serif text-[#EAE0D5]">
                    {t('appName')}
                </h1>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 px-3 py-2 bg-[#2D2D39] border border-gray-700/50 rounded-lg text-gray-300 hover:bg-gray-700/70 transition-colors"
                >
                    <GlobeIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{languageMap[language].name}</span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#2D2D39] border border-gray-700/50 rounded-lg shadow-lg z-10 animate-fade-in-fast rtl:left-0 rtl:right-auto">
                        <style>{`
                            @keyframes fadeInFast {
                                from { opacity: 0; transform: translateY(-10px); }
                                to { opacity: 1; transform: translateY(0); }
                            }
                            .animate-fade-in-fast { animation: fadeInFast 0.2s ease-out; }
                        `}</style>
                        <ul className="py-1">
                            {Object.keys(languageMap).map((langKey) => (
                                <li key={langKey}>
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); handleLanguageChange(langKey as Language); }}
                                        className={`block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/70 ${language === langKey ? 'font-bold text-[#E8C2CA]' : ''}`}
                                    >
                                        {languageMap[langKey as Language].name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
