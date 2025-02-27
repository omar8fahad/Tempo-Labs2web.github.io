import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

interface DhikrCardProps {
  dhikrText: string;
  translation?: string;
  source?: string;
  count: number;
  onComplete?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const DhikrCard = ({
  dhikrText = "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
  translation = "Glory and praise be to Allah",
  source = "رواه مسلم",
  count = 33,
  onComplete = () => {},
  onNext = () => {},
  onPrevious = () => {},
}: DhikrCardProps) => {
  const [currentCount, setCurrentCount] = useState(count);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleTap = () => {
    if (currentCount > 0 && !isCompleted) {
      // Play sound effect (would be implemented with actual audio in a full app)
      // Vibration effect if supported
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }

      setCurrentCount(currentCount - 1);

      if (currentCount === 1) {
        setIsCompleted(true);
        onComplete();
      }
    }
  };

  const progressPercentage = ((count - currentCount) / count) * 100;

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto my-4 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`w-full overflow-hidden cursor-pointer transition-all duration-300 ${isCompleted ? "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/20 border-2 border-green-200 dark:border-green-800" : "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 border-2 border-amber-200 dark:border-amber-800"}`}
        onClick={handleTap}
      >
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700">
          <motion.div
            className={`h-full ${isCompleted ? "bg-green-500" : "bg-amber-500"}`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-6 text-center">
          {/* Dhikr text */}
          <motion.p
            className="text-2xl md:text-3xl font-bold font-arabic mb-4 text-gray-800 dark:text-gray-100 leading-relaxed"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 0.3, times: [0, 0.5, 1] }}
          >
            {dhikrText}
          </motion.p>

          {/* Translation */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {translation}
          </p>

          {/* Source */}
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-6 font-arabic">
            {source}
          </p>

          {/* Counter */}
          <div className="flex justify-center items-center mb-4">
            <motion.div
              className={`text-4xl font-bold rounded-full w-20 h-20 flex items-center justify-center ${isCompleted ? "bg-green-200 dark:bg-green-800/50 text-green-700 dark:text-green-300" : "bg-amber-200 dark:bg-amber-800/50 text-amber-700 dark:text-amber-300"}`}
              whileTap={{ scale: 0.95 }}
              animate={isCompleted ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {isCompleted ? (
                <CheckCircle className="h-10 w-10" />
              ) : (
                currentCount
              )}
            </motion.div>
          </div>

          {/* Instructions */}
          <p className="text-sm text-gray-600 dark:text-gray-400 font-arabic">
            {isCompleted ? "تم الانتهاء من هذا الذكر" : "انقر للعد"}
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="text-gray-600 dark:text-gray-300 font-arabic"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            السابق
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="text-gray-600 dark:text-gray-300 font-arabic"
          >
            التالي
            <ArrowLeft className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default DhikrCard;
