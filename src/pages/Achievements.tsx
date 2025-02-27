import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ArrowLeft, Calendar, Trophy, Award, Star } from "lucide-react";
import { getDailyRecords, getAchievementData } from "../lib/storage";
import { DailyRecord } from "../lib/storage";

const Achievements = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<DailyRecord[]>([]);
  const [achievementData, setAchievementData] = useState({
    dailyProgress: 0,
    currentStreak: 0,
    totalCompletions: 0,
  });

  // Load data from local storage on component mount
  useEffect(() => {
    const storedRecords = getDailyRecords();
    setRecords(storedRecords);

    const data = getAchievementData();
    setAchievementData(data);
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  // Calculate statistics
  const totalCompletions = achievementData.totalCompletions;
  const currentStreak = achievementData.currentStreak;

  const morningCompletions = records.filter((r) => r.morning).length;
  const eveningCompletions = records.filter((r) => r.evening).length;
  const sleepCompletions = records.filter((r) => r.sleep).length;
  const ruqyahCompletions = records.filter((r) => r.ruqyah).length;

  // Format date to Hijri (this is a simplified mock implementation)
  const formatToHijri = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    // Mock Hijri months
    const hijriMonths = [
      "محرم",
      "صفر",
      "ربيع الأول",
      "ربيع الثاني",
      "جمادى الأولى",
      "جمادى الآخرة",
      "رجب",
      "شعبان",
      "رمضان",
      "شوال",
      "ذو القعدة",
      "ذو الحجة",
    ];
    const monthIndex = (date.getMonth() + 3) % 12; // Offset for mock Hijri calendar
    const year = date.getFullYear() - 579; // Approximate Hijri year

    return `${day} ${hijriMonths[monthIndex]} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-4 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold font-arabic text-center">
            الإنجازات
          </h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Achievement content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-amber-100 dark:border-amber-900/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 mb-2">
                <Trophy className="h-6 w-6" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-arabic">
                التتابع الحالي
              </p>
              <p className="text-2xl font-bold">{currentStreak} أيام</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-emerald-100 dark:border-emerald-900/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 mb-2">
                <Award className="h-6 w-6" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-arabic">
                إجمالي الإكمال
              </p>
              <p className="text-2xl font-bold">{totalCompletions} مرة</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-blue-100 dark:border-blue-900/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mb-2">
                <Calendar className="h-6 w-6" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-arabic">
                أيام النشاط
              </p>
              <p className="text-2xl font-bold">{records.length} يوم</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-purple-100 dark:border-purple-900/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 mb-2">
                <Star className="h-6 w-6" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-arabic">
                معدل الإكمال
              </p>
              <p className="text-2xl font-bold">
                {records.length > 0
                  ? Math.round((totalCompletions / (records.length * 4)) * 100)
                  : 0}
                %
              </p>
            </div>
          </motion.div>
        </div>

        {/* Category statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-6 font-arabic">
            إحصائيات الفئات
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-arabic">أذكار الصباح</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {morningCompletions} / {records.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-amber-500"
                  style={{
                    width: `${records.length > 0 ? (morningCompletions / records.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-arabic">أذكار المساء</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {eveningCompletions} / {records.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-indigo-500"
                  style={{
                    width: `${records.length > 0 ? (eveningCompletions / records.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-arabic">أذكار النوم</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {sleepCompletions} / {records.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-blue-500"
                  style={{
                    width: `${records.length > 0 ? (sleepCompletions / records.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-arabic">الرقية الشرعية</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {ruqyahCompletions} / {records.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-emerald-500"
                  style={{
                    width: `${records.length > 0 ? (ruqyahCompletions / records.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily records */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6 font-arabic">سجل الإنجازات</h2>

          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="calendar" className="font-arabic">
                <Calendar className="h-4 w-4 mr-2" />
                التقويم
              </TabsTrigger>
              <TabsTrigger value="list" className="font-arabic">
                <Trophy className="h-4 w-4 mr-2" />
                القائمة
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4">
              <div className="grid grid-cols-7 gap-1 text-center">
                {[
                  "الأحد",
                  "الإثنين",
                  "الثلاثاء",
                  "الأربعاء",
                  "الخميس",
                  "الجمعة",
                  "السبت",
                ].map((day) => (
                  <div
                    key={day}
                    className="text-xs font-medium text-gray-500 dark:text-gray-400 font-arabic"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {/* This is a simplified calendar view - in a real app you'd calculate proper offsets */}
                {records.slice(0, 28).map((record, index) => {
                  const completedCount =
                    (record.morning ? 1 : 0) +
                    (record.evening ? 1 : 0) +
                    (record.sleep ? 1 : 0) +
                    (record.ruqyah ? 1 : 0);

                  let bgColorClass = "bg-gray-200 dark:bg-gray-700";
                  if (completedCount === 4)
                    bgColorClass = "bg-emerald-500 dark:bg-emerald-600";
                  else if (completedCount === 3)
                    bgColorClass = "bg-emerald-400 dark:bg-emerald-500";
                  else if (completedCount === 2)
                    bgColorClass = "bg-emerald-300 dark:bg-emerald-400";
                  else if (completedCount === 1)
                    bgColorClass = "bg-emerald-200 dark:bg-emerald-300";

                  return (
                    <div
                      key={index}
                      className={`aspect-square rounded-md flex items-center justify-center ${bgColorClass} text-white text-xs font-medium`}
                    >
                      {new Date(record.date).getDate()}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {records.length > 0 ? (
                  records.map((record, index) => {
                    const completedCount =
                      (record.morning ? 1 : 0) +
                      (record.evening ? 1 : 0) +
                      (record.sleep ? 1 : 0) +
                      (record.ruqyah ? 1 : 0);

                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 border rounded-md border-gray-200 dark:border-gray-700"
                      >
                        <div>
                          <p className="font-arabic">
                            {formatToHijri(record.date)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(record.date).toLocaleDateString("ar-SA")}
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${record.morning ? "bg-amber-500" : "bg-gray-300 dark:bg-gray-600"}`}
                          ></div>
                          <div
                            className={`w-3 h-3 rounded-full ${record.evening ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-600"}`}
                          ></div>
                          <div
                            className={`w-3 h-3 rounded-full ${record.sleep ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
                          ></div>
                          <div
                            className={`w-3 h-3 rounded-full ${record.ruqyah ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"}`}
                          ></div>
                        </div>

                        <div className="text-sm font-medium">
                          {completedCount}/4
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400 font-arabic">
                    لا توجد سجلات بعد. ابدأ بإكمال الأذكار اليومية لتظهر هنا.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
