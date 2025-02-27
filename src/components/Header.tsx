import React from "react";
import { Moon, Sun, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HeaderProps {
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

const Header = ({
  isDarkMode = false,
  onThemeToggle = () => {},
  onSettingsClick = () => {},
  onProfileClick = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-20 px-4 md:px-8 py-2 flex items-center justify-between border-b bg-background">
      {/* Logo */}
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-3">
          <span className="text-emerald-600 dark:text-emerald-400 text-2xl font-bold">
            أ
          </span>
        </div>
        <h1 className="text-2xl font-bold font-arabic text-primary">أذكاري</h1>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-4">
        {/* Theme toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2 bg-secondary/50 px-3 py-1.5 rounded-full">
                <Sun className="h-4 w-4 text-amber-500" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={onThemeToggle}
                  aria-label="Toggle theme"
                />
                <Moon className="h-4 w-4 text-indigo-500" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>تبديل المظهر (نهاري/ليلي)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Settings button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onSettingsClick}
                className="rounded-full hover:bg-secondary/80"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>الإعدادات</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Profile button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onProfileClick}
                className="rounded-full hover:bg-secondary/80"
              >
                <User className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>الملف الشخصي</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default Header;
