
import React, { useState, useEffect } from 'react';
import Card from './shared/Card';
import { getDailyInspiration } from '../services/geminiService';
import type { DailyInspiration } from '../types';
import { SparklesIcon, BookOpenIcon, SunnahIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const FaithHub: React.FC = () => {
  const { t } = useLanguage();
  const [inspiration, setInspiration] = useState<DailyInspiration | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInspiration = async () => {
      setIsLoading(true);
      // NOTE: The content from this service is currently only in English.
      // To fully support i18n, the API prompt would need to be updated to request a specific language.
      const data = await getDailyInspiration();
      setInspiration(data);
      setIsLoading(false);
    };
    fetchInspiration();
  }, []);

  const LoadingSkeleton = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        <div className="mt-6 h-4 bg-gray-600 rounded w-full"></div>
        <div className="h-4 bg-gray-600 rounded w-5/6"></div>
    </div>
  );

  return (
    <Card title={t('faithHubTitle')} icon={<SparklesIcon className="w-6 h-6" />}>
      {isLoading ? <LoadingSkeleton /> : (
        <div className="space-y-5 text-gray-300">
            <div>
                <h3 className="font-semibold text-lg text-[#E8C2CA] flex items-center mb-1">
                    <SunnahIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0"/>
                    {t('barakahTip')}
                </h3>
                <p className="text-sm leading-relaxed">{inspiration?.tip}</p>
            </div>
            <div className="border-t border-gray-700/60 my-4"></div>
            <div>
                <h3 className="font-semibold text-lg text-[#E8C2CA] flex items-center mb-1">
                    <BookOpenIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t('quranReflection')}
                </h3>
                <p className="font-serif italic text-sm leading-relaxed">"{inspiration?.quranPrompt}"</p>
            </div>
        </div>
      )}
    </Card>
  );
};

export default FaithHub;
