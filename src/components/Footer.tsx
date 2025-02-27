import React from "react";
import { Home, Award, Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface FooterProps {
  hijriDate?: string;
  appVersion?: string;
  onHomeClick?: () => void;
  onAchievementsClick?: () => void;
  onSettingsClick?: () => void;
}

const Footer = ({
  hijriDate = "١٤ رمضان ١٤٤٥",
  appVersion = "1.0.0",
  onHomeClick = () => {},
  onAchievementsClick = () => {},
  onSettingsClick = () => {},
}: FooterProps) => {
  return (
    <footer className="w-full h-16 border-t bg-white dark:bg-gray-950 shadow-sm flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-arabic">
          {hijriDate}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          v{appVersion}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onHomeClick}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Home className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-arabic">الرئيسية</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onAchievementsClick}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Award className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-arabic">الإنجازات</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onSettingsClick}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-arabic">الإعدادات</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </footer>
  );
};

export default Footer;
