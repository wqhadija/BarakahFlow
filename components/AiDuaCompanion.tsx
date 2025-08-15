
import React, { useState } from 'react';
import Card from './shared/Card';
import { generateDua } from '../services/geminiService';
import { HeartIcon, WandIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const AiDuaCompanion: React.FC = () => {
    const { language, t } = useLanguage();
    const [userInput, setUserInput] = useState('');
    const [generatedDua, setGeneratedDua] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [duaLength, setDuaLength] = useState<'short' | 'standard'>('standard');

    const handleGenerateDua = async () => {
        if (!userInput.trim()) {
            setError(t('errorFeeling'));
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedDua('');
        try {
            const dua = await generateDua(userInput, language, duaLength);
            setGeneratedDua(dua);
        } catch (err) {
            setError(t('errorFailedDua'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title={t('aiDuaCompanionTitle')} icon={<HeartIcon className="w-6 h-6" />}>
            <div className="flex flex-col h-full">
                <p className="text-sm text-gray-400 mb-4">{t('aiDuaCompanionDescription')}</p>
                
                <div className="flex flex-wrap gap-y-4 gap-x-6 mb-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t('duaLength')}
                        </label>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                            <button 
                                onClick={() => setDuaLength('standard')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                    duaLength === 'standard' 
                                    ? 'bg-[#E8C2CA] text-[#1E1E2A]' 
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                {t('standard')}
                            </button>
                            <button 
                                onClick={() => setDuaLength('short')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                    duaLength === 'short' 
                                    ? 'bg-[#E8C2CA] text-[#1E1E2A]' 
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                {t('short')}
                            </button>
                        </div>
                    </div>
                </div>

                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={t('textAreaPlaceholder')}
                    className="w-full flex-grow p-3 bg-[#1E1E2A] border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#63b3ed] transition-colors duration-200 min-h-[80px]"
                />
                 {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                <button
                    onClick={handleGenerateDua}
                    disabled={isLoading}
                    className="mt-4 w-full bg-[#E8C2CA] text-[#1E1E2A] font-bold py-3 px-4 rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center disabled:bg-gray-500"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('generating')}
                        </>
                    ) : (
                        <>
                            <WandIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                            {t('generateDuaButton')}
                        </>
                    )}
                </button>

                {generatedDua && (
                    <div className="mt-6 p-4 bg-[#1E1E2A]/70 border-l-4 border-[#63b3ed] rounded-r-lg rtl:border-l-0 rtl:border-r-4 rtl:rounded-r-none rtl:rounded-l-lg">
                        <p className="font-serif italic text-gray-200 leading-relaxed">{generatedDua}</p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default AiDuaCompanion;