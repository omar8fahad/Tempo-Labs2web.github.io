import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DhikrCard from "./DhikrCard";
import { Button } from "./ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { recordCompletion } from "../lib/storage";

interface Dhikr {
  id: string;
  text: string;
  translation: string;
  source: string;
  count: number;
}

interface DhikrListProps {
  title: string;
  dhikrs: Dhikr[];
  category: "morning" | "evening" | "sleep" | "ruqyah";
  onComplete?: () => void;
  onBack?: () => void;
}

const DhikrList = ({
  title = "أذكار الصباح",
  category = "morning",
  dhikrs = [
    {
      id: "1",
      text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      translation: "Glory and praise be to Allah",
      source: "رواه مسلم",
      count: 33,
    },
    {
      id: "2",
      text: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
      translation:
        "There is no god but Allah, alone, without partner. His is the dominion and His is the praise, and He is powerful over everything",
      source: "رواه البخاري ومسلم",
      count: 100,
    },
    {
      id: "3",
      text: "أستغفر الله العظيم",
      translation: "I seek forgiveness from Allah the Almighty",
      source: "رواه الترمذي",
      count: 100,
    },
  ],
  onComplete = () => {},
  onBack = () => {},
}: DhikrListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedDhikrs, setCompletedDhikrs] = useState<string[]>([]);

  const handleNext = () => {
    if (currentIndex < dhikrs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (completedDhikrs.length === dhikrs.length) {
      // All dhikrs completed, show completion screen or return to categories
      onComplete();
      // Record completion in storage
      recordCompletion(category);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDhikrComplete = () => {
    const currentDhikr = dhikrs[currentIndex];
    if (!completedDhikrs.includes(currentDhikr.id)) {
      setCompletedDhikrs([...completedDhikrs, currentDhikr.id]);
    }

    // Automatically move to next dhikr after a short delay
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleSkip = () => {
    const currentDhikr = dhikrs[currentIndex];
    if (!completedDhikrs.includes(currentDhikr.id)) {
      setCompletedDhikrs([...completedDhikrs, currentDhikr.id]);
    }

    // Move to next dhikr immediately
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const progressPercentage = (completedDhikrs.length / dhikrs.length) * 100;

  // Update local storage when all dhikrs are completed
  useEffect(() => {
    if (completedDhikrs.length === dhikrs.length && dhikrs.length > 0) {
      recordCompletion(category);
    }
  }, [completedDhikrs, dhikrs.length, category]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-4 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold font-arabic text-center">{title}</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 mt-2">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Progress counter */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
          <span>
            {completedDhikrs.length} / {dhikrs.length}
          </span>
          <span className="font-arabic">
            {Math.round(progressPercentage)}% مكتمل
          </span>
        </div>
      </div>

      {/* Dhikr cards */}
      <div className="max-w-7xl mx-auto py-4">
        <AnimatePresence mode="wait">
          {currentIndex < dhikrs.length ? (
            <DhikrCard
              key={dhikrs[currentIndex].id}
              dhikrText={dhikrs[currentIndex].text}
              translation={dhikrs[currentIndex].translation}
              source={dhikrs[currentIndex].source}
              count={dhikrs[currentIndex].count}
              onComplete={handleDhikrComplete}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSkip={handleSkip}
            />
          ) : (
            <motion.div
              key="completion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center p-8"
            >
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-6 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <Check className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold font-arabic mb-4">
                أحسنت! لقد أكملت جميع الأذكار
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 font-arabic">
                تم تسجيل إنجازك اليومي
              </p>
              <Button
                onClick={onBack}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-arabic"
              >
                العودة إلى الرئيسية
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DhikrList;
