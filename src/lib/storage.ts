// Local storage utility functions for the app

// Achievement data type
export interface AchievementData {
  dailyProgress: number;
  currentStreak: number;
  totalCompletions: number;
  lastCompletionDate?: string;
}

// Completion record for a specific day
export interface DailyRecord {
  date: string;
  morning: boolean;
  evening: boolean;
  sleep: boolean;
  ruqyah: boolean;
}

// App settings
export interface AppSettings {
  isDarkMode: boolean;
  theme: string;
  soundEnabled: boolean;
  soundVolume: number;
  vibrationEnabled: boolean;
  vibrationIntensity: number;
  notificationsEnabled: boolean;
  morningNotificationTime: string;
  eveningNotificationTime: string;
  sleepNotificationTime: string;
}

// Default settings
const defaultSettings: AppSettings = {
  isDarkMode: false,
  theme: "green",
  soundEnabled: true,
  soundVolume: 70,
  vibrationEnabled: true,
  vibrationIntensity: 50,
  notificationsEnabled: true,
  morningNotificationTime: "05:00",
  eveningNotificationTime: "16:00",
  sleepNotificationTime: "22:00",
};

// Default achievement data
const defaultAchievementData: AchievementData = {
  dailyProgress: 0,
  currentStreak: 0,
  totalCompletions: 0,
};

// Storage keys
const SETTINGS_KEY = "adhkar_app_settings";
const ACHIEVEMENT_DATA_KEY = "adhkar_achievement_data";
const DAILY_RECORDS_KEY = "adhkar_daily_records";

// Get settings from local storage
export const getSettings = (): AppSettings => {
  try {
    const settingsJson = localStorage.getItem(SETTINGS_KEY);
    if (settingsJson) {
      return { ...defaultSettings, ...JSON.parse(settingsJson) };
    }
  } catch (error) {
    console.error("Error getting settings from local storage:", error);
  }
  return defaultSettings;
};

// Save settings to local storage
export const saveSettings = (settings: Partial<AppSettings>): void => {
  try {
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
  } catch (error) {
    console.error("Error saving settings to local storage:", error);
  }
};

// Get achievement data from local storage
export const getAchievementData = (): AchievementData => {
  try {
    const dataJson = localStorage.getItem(ACHIEVEMENT_DATA_KEY);
    if (dataJson) {
      return { ...defaultAchievementData, ...JSON.parse(dataJson) };
    }
  } catch (error) {
    console.error("Error getting achievement data from local storage:", error);
  }
  return defaultAchievementData;
};

// Save achievement data to local storage
export const saveAchievementData = (data: Partial<AchievementData>): void => {
  try {
    const currentData = getAchievementData();
    const updatedData = { ...currentData, ...data };
    localStorage.setItem(ACHIEVEMENT_DATA_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error("Error saving achievement data to local storage:", error);
  }
};

// Get daily records from local storage
export const getDailyRecords = (): DailyRecord[] => {
  try {
    const recordsJson = localStorage.getItem(DAILY_RECORDS_KEY);
    if (recordsJson) {
      return JSON.parse(recordsJson);
    }
  } catch (error) {
    console.error("Error getting daily records from local storage:", error);
  }
  return [];
};

// Save daily records to local storage
export const saveDailyRecords = (records: DailyRecord[]): void => {
  try {
    localStorage.setItem(DAILY_RECORDS_KEY, JSON.stringify(records));
  } catch (error) {
    console.error("Error saving daily records to local storage:", error);
  }
};

// Record completion of a specific category
export const recordCompletion = (
  category: "morning" | "evening" | "sleep" | "ruqyah",
): void => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const records = getDailyRecords();

    // Find today's record or create a new one
    let todayRecord = records.find((record) => record.date === today);

    if (!todayRecord) {
      todayRecord = {
        date: today,
        morning: false,
        evening: false,
        sleep: false,
        ruqyah: false,
      };
      records.unshift(todayRecord); // Add to the beginning of the array
    }

    // Update the specific category
    todayRecord[category] = true;

    // Save updated records
    saveDailyRecords(records);

    // Update achievement data
    updateAchievementData();
  } catch (error) {
    console.error("Error recording completion:", error);
  }
};

// Update achievement data based on daily records
export const updateAchievementData = (): void => {
  try {
    const records = getDailyRecords();

    if (records.length === 0) return;

    // Calculate total completions
    const totalCompletions = records.reduce((total, record) => {
      return (
        total +
        (record.morning ? 1 : 0) +
        (record.evening ? 1 : 0) +
        (record.sleep ? 1 : 0) +
        (record.ruqyah ? 1 : 0)
      );
    }, 0);

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    // Check if there's a record for today or yesterday
    const hasToday = records.some(
      (record) =>
        record.date === today &&
        (record.morning || record.evening || record.sleep || record.ruqyah),
    );

    const hasYesterday = records.some(
      (record) =>
        record.date === yesterdayStr &&
        (record.morning || record.evening || record.sleep || record.ruqyah),
    );

    if (hasToday || hasYesterday) {
      // Count consecutive days with at least one completion
      for (let i = 0; i < records.length; i++) {
        const record = records[i];
        if (record.morning || record.evening || record.sleep || record.ruqyah) {
          currentStreak++;

          // Check if the next record is consecutive
          if (i < records.length - 1) {
            const currentDate = new Date(record.date);
            const nextDate = new Date(records[i + 1].date);
            const diffDays = Math.round(
              (currentDate.getTime() - nextDate.getTime()) /
                (1000 * 60 * 60 * 24),
            );

            if (diffDays !== 1) break;
          }
        } else {
          break;
        }
      }
    }

    // Calculate daily progress (percentage of categories completed today)
    const todayRecord = records.find((record) => record.date === today);
    const dailyProgress = todayRecord
      ? ((todayRecord.morning ? 1 : 0) +
          (todayRecord.evening ? 1 : 0) +
          (todayRecord.sleep ? 1 : 0) +
          (todayRecord.ruqyah ? 1 : 0)) *
        25
      : 0;

    // Save updated achievement data
    saveAchievementData({
      dailyProgress,
      currentStreak,
      totalCompletions,
      lastCompletionDate: today,
    });
  } catch (error) {
    console.error("Error updating achievement data:", error);
  }
};

// Initialize data on app start
export const initializeData = (): void => {
  // Make sure we have settings
  const settings = getSettings();
  saveSettings(settings);

  // Update achievement data
  updateAchievementData();
};
