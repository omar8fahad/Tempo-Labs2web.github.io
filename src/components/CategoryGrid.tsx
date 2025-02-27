import React from "react";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories?: {
    id: string;
    title: string;
    description: string;
    icon: "morning" | "evening" | "sleep" | "ruqyah";
    completionPercentage?: number;
  }[];
  onCategoryClick?: (categoryId: string) => void;
}

const CategoryGrid = ({
  categories = [
    {
      id: "morning",
      title: "أذكار الصباح",
      description: "الأذكار المستحبة في الصباح لبدء يومك بذكر الله",
      icon: "morning" as const,
      completionPercentage: 75,
    },
    {
      id: "evening",
      title: "أذكار المساء",
      description: "الأذكار المستحبة في المساء لختام يومك بذكر الله",
      icon: "evening" as const,
      completionPercentage: 50,
    },
    {
      id: "sleep",
      title: "أذكار النوم",
      description: "الأذكار المستحبة قبل النوم لراحة وطمأنينة",
      icon: "sleep" as const,
      completionPercentage: 25,
    },
    {
      id: "ruqyah",
      title: "الرقية الشرعية",
      description: "آيات وأدعية للرقية الشرعية والحماية",
      icon: "ruqyah" as const,
      completionPercentage: 0,
    },
  ],
  onCategoryClick = () => {},
}: CategoryGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="w-full py-8 px-4 md:px-8 bg-white dark:bg-gray-900">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-center mb-8 font-arabic text-gray-800 dark:text-gray-100">
          الأذكار اليومية
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <CategoryCard
                title={category.title}
                description={category.description}
                icon={category.icon}
                completionPercentage={category.completionPercentage}
                onClick={() => onCategoryClick(category.id)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryGrid;
