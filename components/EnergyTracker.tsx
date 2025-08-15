import React, { useState } from 'react';
import Card from './shared/Card';
import JournalModal from './shared/JournalModal';
import { DropletIcon, MoonIcon, BookOpenIcon as AdhkarIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';

const EnergyTracker: React.FC = () => {
    const { t, language } = useLanguage();
    const [fatigueLevel, setFatigueLevel] = useState(3);
    const [habits, setHabits] = useState({
        hydration: false,
        qailulah: false,
        adhkar: false,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleHabitToggle = (habit: keyof typeof habits) => {
        setHabits(prev => ({ ...prev, [habit]: !prev[habit] }));
    };
    
    const handleSaveLog = (notes: string) => {
        // In a real app, you'd save this data to a backend or local storage.
        // For this demo, we'll just show an alert.
        const logData = {
            fatigueLevel: energyLabels[fatigueLevel-1],
            habits,
            notes,
            timestamp: new Date().toISOString(),
        };
        console.log("Entry Logged:", logData);
        alert("Your entry has been logged successfully!");
    };

    const energyLabels = [
        translations.energyLabels.veryLow[language], 
        translations.energyLabels.low[language], 
        translations.energyLabels.moderate[language], 
        translations.energyLabels.high[language], 
        translations.energyLabels.veryHigh[language]
    ];

    return (
        <>
            <Card title={t('energyTrackerTitle')} icon={<DropletIcon className="w-6 h-6" />}>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="fatigue" className="block text-sm font-medium text-gray-300 mb-2">
                            {t('energyLevelQuestion')} <span className="font-bold text-[#EAE0D5]">{energyLabels[fatigueLevel-1]}</span>
                        </label>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm">{translations.energyLabels.low[language]}</span>
                            <input
                                type="range"
                                id="fatigue"
                                min="1"
                                max="5"
                                value={fatigueLevel}
                                onChange={(e) => setFatigueLevel(Number(e.target.value))}
                                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-sm">{translations.energyLabels.high[language]}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-300 mb-3">{t('sunnahHabits')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <HabitButton
                                icon={<DropletIcon className="w-5 h-5"/>}
                                label={t('hydrationGoal')}
                                active={habits.hydration}
                                onClick={() => handleHabitToggle('hydration')}
                            />
                            <HabitButton
                                icon={<MoonIcon className="w-5 h-5"/>}
                                label={t('middayNap')}
                                active={habits.qailulah}
                                onClick={() => handleHabitToggle('qailulah')}
                            />
                            <HabitButton
                                icon={<AdhkarIcon className="w-5 h-5"/>}
                                label={t('morningAdhkar')}
                                active={habits.adhkar}
                                onClick={() => handleHabitToggle('adhkar')}
                            />
                        </div>
                    </div>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-[#63b3ed] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#4a8fe7] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#63b3ed] focus:ring-offset-2 focus:ring-offset-[#1E1E2A]">
                        {t('logEntryButton')}
                    </button>
                </div>
            </Card>
            <JournalModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveLog}
                title={t('logEntryTitle')}
                prompt={t('journalPrompt')}
            />
        </>
    );
};

interface HabitButtonProps {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
}

const HabitButton: React.FC<HabitButtonProps> = ({ icon, label, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
                active
                    ? 'bg-[#63b3ed]/20 border-[#63b3ed]'
                    : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
            }`}
        >
            <span className={`mb-1 ${active ? 'text-[#63b3ed]' : 'text-gray-400'}`}>{icon}</span>
            <span className={`text-xs text-center ${active ? 'text-white' : 'text-gray-300'}`}>{label}</span>
        </button>
    );
}

export default EnergyTracker;