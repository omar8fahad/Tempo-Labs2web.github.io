import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import CategoryGrid from "./CategoryGrid";
import AchievementBanner from "./AchievementBanner";
import Footer from "./Footer";
import { getAchievementData, initializeData } from "../lib/storage";

const HomePage = () => {
  const navigate = useNavigate();

  // State for theme toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // State for achievement data
  const [achievementData, setAchievementData] = useState({
    dailyProgress: 0,
    currentStreak: 0,
    totalCompletions: 0,
  });

  // State for Hijri date
  const [hijriDate, setHijriDate] = useState("١٤ رمضان ١٤٤٥");

  // Initialize data and load achievements on mount
  useEffect(() => {
    // Initialize local storage data
    initializeData();

    // Load achievement data
    const data = getAchievementData();
    setAchievementData(data);

    // Set up interval to refresh achievement data every minute
    const interval = setInterval(() => {
      const refreshedData = getAchievementData();
      setAchievementData(refreshedData);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Handle theme toggle
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Apply dark mode class to document
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Apply theme on initial load
  useEffect(() => {
    // Check for user preference or system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Handle category click
  const handleCategoryClick = (categoryId: string) => {
    // Navigate to the appropriate category page
    switch (categoryId) {
      case "morning":
        navigate("/morning-adhkar");
        break;
      case "evening":
        navigate("/evening-adhkar");
        break;
      case "sleep":
        navigate("/sleep-adhkar");
        break;
      case "ruqyah":
        navigate("/ruqyah");
        break;
      default:
        break;
    }
  };

  // Handle settings click
  const handleSettingsClick = () => {
    navigate("/settings");
  };

  // Handle profile click
  const handleProfileClick = () => {
    console.log("Opening profile");
    // Profile logic would go here
  };

  // Handle view all achievements click
  const handleViewAllAchievements = () => {
    navigate("/achievements");
  };

  // Handle achievements click in footer
  const handleAchievementsClick = () => {
    navigate("/achievements");
  };

  // Page transition animation
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Header */}
      <Header
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        onSettingsClick={handleSettingsClick}
        onProfileClick={handleProfileClick}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-6 px-4 md:px-8 space-y-8">
        {/* Welcome Banner */}
        <div className="w-full max-w-7xl text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold font-arabic text-emerald-700 dark:text-emerald-400 mb-4">
            بسم الله الرحمن الرحيم
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-arabic">
            مرحباً بك في تطبيق أذكاري - رفيقك اليومي للأذكار والأدعية
          </p>
        </div>

        {/* Category Grid */}
        <CategoryGrid onCategoryClick={handleCategoryClick} />

        {/* Achievement Banner */}
        <div className="w-full max-w-7xl mt-8">
          <AchievementBanner
            dailyProgress={achievementData.dailyProgress}
            currentStreak={achievementData.currentStreak}
            totalCompletions={achievementData.totalCompletions}
            onViewAllClick={handleViewAllAchievements}
          />
        </div>

        {/* Islamic Quote */}
        <div className="w-full max-w-7xl mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <blockquote className="text-center">
            <p className="text-xl font-arabic text-gray-700 dark:text-gray-200 mb-4">
              "مَنْ قَالَ حِينَ يُصْبِحُ وَحِينَ يُمْسِي: سُبْحَانَ اللَّهِ
              وَبِحَمْدِهِ، مِائَةَ مَرَّةٍ، لَمْ يَأْتِ أَحَدٌ يَوْمَ
              الْقِيَامَةِ بِأَفْضَلَ مِمَّا جَاءَ بِهِ، إِلَّا أَحَدٌ قَالَ
              مِثْلَ مَا قَالَ أَوْ زَادَ عَلَيْهِ"
            </p>
            <footer className="text-gray-500 dark:text-gray-400 font-arabic">
              رواه مسلم
            </footer>
          </blockquote>
        </div>
      </main>

      {/* Footer */}
      <Footer
        hijriDate={hijriDate}
        appVersion="1.0.0"
        onHomeClick={() => navigate("/")}
        onAchievementsClick={handleAchievementsClick}
        onSettingsClick={handleSettingsClick}
      />
    </motion.div>
  );
};

export default HomePage;
