import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  ArrowLeft,
  Moon,
  Sun,
  Volume2,
  Bell,
  Vibration,
  Palette,
} from "lucide-react";
import { getSettings, saveSettings, AppSettings } from "../lib/storage";

const themeOptions = [
  {
    id: "green",
    name: "أخضر",
    light: "from-emerald-50 to-emerald-100",
    dark: "from-emerald-900/30 to-emerald-800/20",
  },
  {
    id: "blue",
    name: "أزرق",
    light: "from-blue-50 to-blue-100",
    dark: "from-blue-900/30 to-blue-800/20",
  },
  {
    id: "purple",
    name: "بنفسجي",
    light: "from-purple-50 to-purple-100",
    dark: "from-purple-900/30 to-purple-800/20",
  },
  {
    id: "amber",
    name: "ذهبي",
    light: "from-amber-50 to-amber-100",
    dark: "from-amber-900/30 to-amber-800/20",
  },
  {
    id: "teal",
    name: "فيروزي",
    light: "from-teal-50 to-teal-100",
    dark: "from-teal-900/30 to-teal-800/20",
  },
  {
    id: "indigo",
    name: "نيلي",
    light: "from-indigo-50 to-indigo-100",
    dark: "from-indigo-900/30 to-indigo-800/20",
  },
];

const Settings = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(70);
  const [vibrationIntensity, setVibrationIntensity] = useState(50);
  const [selectedTheme, setSelectedTheme] = useState("green");
  const [morningTime, setMorningTime] = useState("05:00");
  const [eveningTime, setEveningTime] = useState("16:00");
  const [sleepTime, setSleepTime] = useState("22:00");

  // Load settings from local storage on component mount
  useEffect(() => {
    const settings = getSettings();
    setIsDarkMode(settings.isDarkMode);
    setSoundEnabled(settings.soundEnabled);
    setVibrationEnabled(settings.vibrationEnabled);
    setNotificationsEnabled(settings.notificationsEnabled);
    setSoundVolume(settings.soundVolume);
    setVibrationIntensity(settings.vibrationIntensity);
    setSelectedTheme(settings.theme);
    setMorningTime(settings.morningNotificationTime);
    setEveningTime(settings.eveningNotificationTime);
    setSleepTime(settings.sleepNotificationTime);
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSaveSettings = () => {
    // Save settings to local storage
    const settings: AppSettings = {
      isDarkMode,
      theme: selectedTheme,
      soundEnabled,
      soundVolume,
      vibrationEnabled,
      vibrationIntensity,
      notificationsEnabled,
      morningNotificationTime: morningTime,
      eveningNotificationTime: eveningTime,
      sleepNotificationTime: sleepTime,
    };

    saveSettings(settings);
    navigate("/");
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
            الإعدادات
          </h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Settings content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="appearance" className="font-arabic">
              <Palette className="h-4 w-4 mr-2" />
              المظهر
            </TabsTrigger>
            <TabsTrigger value="notifications" className="font-arabic">
              <Bell className="h-4 w-4 mr-2" />
              التنبيهات
            </TabsTrigger>
            <TabsTrigger value="feedback" className="font-arabic">
              <Volume2 className="h-4 w-4 mr-2" />
              التفاعل
            </TabsTrigger>
          </TabsList>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 font-arabic">وضع العرض</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-amber-500" />
                  <Label htmlFor="theme-mode" className="font-arabic">
                    وضع النهار / الليل
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="theme-mode"
                    checked={isDarkMode}
                    onCheckedChange={handleThemeToggle}
                  />
                  <Moon className="h-5 w-5 text-indigo-500" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 font-arabic">
                ألوان التطبيق
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {themeOptions.map((theme) => (
                  <motion.div
                    key={theme.id}
                    className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${selectedTheme === theme.id ? "border-emerald-500 dark:border-emerald-400" : "border-gray-200 dark:border-gray-700"}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <div
                      className={`h-16 rounded-md mb-2 bg-gradient-to-br ${isDarkMode ? theme.dark : theme.light}`}
                    ></div>
                    <p className="text-center font-arabic">{theme.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 font-arabic">التنبيهات</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="font-arabic">
                    تفعيل التنبيهات
                  </Label>
                  <Switch
                    id="notifications"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>

                {notificationsEnabled && (
                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <Label className="font-arabic">تنبيه أذكار الصباح</Label>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <input
                          type="time"
                          value={morningTime}
                          onChange={(e) => setMorningTime(e.target.value)}
                          className="bg-gray-100 dark:bg-gray-700 rounded p-2"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-arabic">تنبيه أذكار المساء</Label>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <input
                          type="time"
                          value={eveningTime}
                          onChange={(e) => setEveningTime(e.target.value)}
                          className="bg-gray-100 dark:bg-gray-700 rounded p-2"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-arabic">تنبيه أذكار النوم</Label>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <input
                          type="time"
                          value={sleepTime}
                          onChange={(e) => setSleepTime(e.target.value)}
                          className="bg-gray-100 dark:bg-gray-700 rounded p-2"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 font-arabic">الصوت</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound" className="font-arabic">
                    تفعيل الصوت
                  </Label>
                  <Switch
                    id="sound"
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                </div>

                {soundEnabled && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="sound-volume" className="font-arabic">
                        مستوى الصوت
                      </Label>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {soundVolume}%
                      </span>
                    </div>
                    <Slider
                      id="sound-volume"
                      min={0}
                      max={100}
                      step={1}
                      value={[soundVolume]}
                      onValueChange={(value) => setSoundVolume(value[0])}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 font-arabic">الاهتزاز</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="vibration" className="font-arabic">
                    تفعيل الاهتزاز
                  </Label>
                  <Switch
                    id="vibration"
                    checked={vibrationEnabled}
                    onCheckedChange={setVibrationEnabled}
                  />
                </div>

                {vibrationEnabled && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label
                        htmlFor="vibration-intensity"
                        className="font-arabic"
                      >
                        شدة الاهتزاز
                      </Label>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {vibrationIntensity}%
                      </span>
                    </div>
                    <Slider
                      id="vibration-intensity"
                      min={0}
                      max={100}
                      step={1}
                      value={[vibrationIntensity]}
                      onValueChange={(value) => setVibrationIntensity(value[0])}
                    />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save button */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleSaveSettings}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-arabic px-8 py-6 text-lg"
          >
            حفظ الإعدادات
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
