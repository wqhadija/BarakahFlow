import React, { useState, useEffect } from 'react';
import Card from './shared/Card';
import JournalModal from './shared/JournalModal';
import { getDailyGrowthMindset } from '../services/geminiService';
import type { GrowthMindsetContent } from '../types';
import { PlantIcon, QuoteIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const GrowthMindset: React.FC = () => {
    const { t } = useLanguage();
    const [content, setContent] = useState<GrowthMindsetContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            // NOTE: The content from this service is currently only in English.
            const data = await getDailyGrowthMindset();
            setContent(data);
            setIsLoading(false);
        };
        fetchContent();
    }, []);

    const handleSaveJournal = (entry: string) => {
        console.log("Journal Entry Saved:", { prompt: content?.gratitudePrompt, entry });
        alert("Your thoughts have been saved for reflection.");
    };

    const LoadingSkeleton = () => (
        <div className="space-y-5 animate-pulse">
            <div>
                <div className="h-5 bg-gray-600 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-600 rounded w-5/6"></div>
            </div>
            <div className="border-t border-gray-700/60 my-4"></div>
            <div>
                <div className="h-5 bg-gray-600 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-full"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2 mt-2"></div>
            </div>
        </div>
    );

    return (
        <>
            <Card title={t('growthMindsetTitle')} icon={<PlantIcon className="w-6 h-6" />}>
                <div className="space-y-5 text-gray-300 h-full flex flex-col justify-between">
                    {isLoading || !content ? <LoadingSkeleton /> : (
                        <>
                            <div>
                                <h3 className="font-semibold text-lg text-[#E8C2CA] flex items-center mb-1">
                                    {t('gratitudeVision')}
                                </h3>
                                <p className="font-serif italic text-sm leading-relaxed">"{content.gratitudePrompt}"</p>
                            </div>
                            <div className="border-t border-gray-700/60 my-4"></div>
                            <div>
                                <h3 className="font-semibold text-lg text-[#E8C2CA] flex items-center mb-1">
                                    <QuoteIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0"/>
                                    {t('mindsetBooster')}
                                </h3>
                                <blockquote className="font-serif italic text-sm leading-relaxed border-l-2 border-[#E8C2CA] pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pr-3 rtl:pl-0">
                                    {content.mindsetBooster}
                                    <cite className="block not-italic text-xs text-gray-400 mt-1">- {content.boosterSource}</cite>
                                </blockquote>
                            </div>
                        </>
                    )}
                     <button 
                        onClick={() => setIsModalOpen(true)}
                        disabled={isLoading}
                        className="mt-4 w-full bg-transparent border-2 border-[#63b3ed] text-[#63b3ed] font-bold py-2 px-4 rounded-lg hover:bg-[#63b3ed] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t('journalThoughtsButton')}
                    </button>
                </div>
            </Card>
            <JournalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveJournal}
                title={t('journalGratitudeTitle')}
                prompt={content?.gratitudePrompt}
            />
        </>
    );
};

export default GrowthMindset;