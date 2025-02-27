import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Moon, Sun, Book, Shield } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: "morning" | "evening" | "sleep" | "ruqyah";
  completionPercentage?: number;
  onClick?: () => void;
}

const CategoryCard = ({
  title = "أذكار الصباح",
  description = "الأذكار المستحبة في الصباح لبدء يومك بذكر الله",
  icon = "morning",
  completionPercentage = 0,
  onClick = () => {},
}: CategoryCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case "morning":
        return <Sun className="h-12 w-12 text-amber-500" />;
      case "evening":
        return <Moon className="h-12 w-12 text-indigo-500" />;
      case "sleep":
        return <Moon className="h-12 w-12 text-blue-500" />;
      case "ruqyah":
        return <Shield className="h-12 w-12 text-emerald-500" />;
      default:
        return <Book className="h-12 w-12 text-gray-500" />;
    }
  };

  const getGradientClass = () => {
    switch (icon) {
      case "morning":
        return "from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20";
      case "evening":
        return "from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/20";
      case "sleep":
        return "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20";
      case "ruqyah":
        return "from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20";
      default:
        return "from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/20";
    }
  };

  return (
    <Card
      className={`w-full h-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md bg-gradient-to-br ${getGradientClass()} border-2 hover:border-opacity-70 hover:scale-[1.01]`}
      onClick={onClick}
    >
      <CardHeader className="pb-2 text-right">
        <div className="flex justify-between items-start">
          <div className="p-3 rounded-full bg-white/80 dark:bg-gray-800/50 shadow-sm">
            {getIcon()}
          </div>
          <CardTitle className="text-2xl font-bold text-right font-arabic">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-right">
        <CardDescription className="text-lg font-arabic">
          {description}
        </CardDescription>

        {completionPercentage > 0 && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-green-600"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-right">
              {completionPercentage}% مكتمل
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-end pt-0">
        <Button variant="ghost" className="text-right font-arabic group">
          ابدأ الآن
          <ArrowRight className="ml-2 h-4 w-4 transform rotate-180 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
