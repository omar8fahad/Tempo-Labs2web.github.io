import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Trophy, Flame, Calendar, ArrowRight } from "lucide-react";

interface AchievementBannerProps {
  dailyProgress?: number;
  currentStreak?: number;
  totalCompletions?: number;
  onViewAllClick?: () => void;
}

const AchievementBanner = ({
  dailyProgress = 35,
  currentStreak = 7,
  totalCompletions = 124,
  onViewAllClick = () => {},
}: AchievementBannerProps) => {
  return (
    <Card className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-900/20 border-2 border-emerald-100 dark:border-emerald-900/50 p-4 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
            <Trophy className="h-6 w-6" />
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold font-arabic">إنجازاتك اليومية</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-arabic">
              تابع تقدمك في الأذكار اليومية
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="w-full md:w-48">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  اليوم
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {dailyProgress}%
                </span>
              </div>
              <Progress value={dailyProgress} className="h-2" />
            </div>
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
                <Flame className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-arabic">
                  التتابع
                </p>
                <p className="font-bold">{currentStreak} أيام</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-arabic">
                  الإكمال
                </p>
                <p className="font-bold">{totalCompletions} مرة</p>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            className="text-emerald-700 dark:text-emerald-300 font-arabic group"
            onClick={onViewAllClick}
          >
            عرض الكل
            <ArrowRight className="ml-2 h-4 w-4 transform rotate-180 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AchievementBanner;
