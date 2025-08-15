import React, { useState, useEffect } from 'react';
import { CloseIcon } from '../Icons';
import { useLanguage } from '../../contexts/LanguageContext';

interface JournalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (entry: string) => void;
    title: string;
    prompt?: string;
}

const JournalModal: React.FC<JournalModalProps> = ({ isOpen, onClose, onSave, title, prompt }) => {
    const { t } = useLanguage();
    const [entry, setEntry] = useState('');

    useEffect(() => {
        if (!isOpen) {
            // Reset entry when modal is closed to not show old text
            setTimeout(() => setEntry(''), 300); // delay to allow fade out animation
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSave = () => {
        onSave(entry);
        onClose(); // Close modal after saving
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 animate-fade-in"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
            <div 
                className="bg-[#2D2D39] rounded-2xl p-6 shadow-lg border border-gray-700/50 w-full max-w-md flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-semibold text-[#EAE0D5] mb-4">{title}</h2>
                {prompt && <p className="font-serif italic text-sm text-gray-400 mb-4">"{prompt}"</p>}
                
                <textarea
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder={t('journalPlaceholder')}
                    className="w-full flex-grow p-3 bg-[#1E1E2A] border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#63b3ed] transition-colors duration-200 min-h-[150px] resize-none"
                    aria-label="Journal entry"
                />

                <div className="flex justify-end space-x-3 rtl:space-x-reverse mt-6">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-colors duration-300"
                    >
                        {t('cancel')}
                    </button>
                     <button 
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#63b3ed] text-white font-bold rounded-lg hover:bg-[#4a8fe7] transition-colors duration-300"
                    >
                        {t('saveEntry')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JournalModal;