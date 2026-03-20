
import { FoodFlag, FoodFlagCard } from "./FoodFlagCard";

interface FoodFlagGridProps {
  foodFlags: FoodFlag[];
  variant?: "default" | "compact";
  onFoodFlagClick?: (id: string) => void;
}

export function FoodFlagGrid({ foodFlags, variant = "default", onFoodFlagClick }: FoodFlagGridProps) {
  const gridClass = variant === "compact"
    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6";
    
  return (
    <div className={gridClass}>
      {foodFlags.map((foodFlag) => (
        <FoodFlagCard
          key={foodFlag.id}
          foodFlag={foodFlag}
          variant={variant}
          onClick={onFoodFlagClick ? () => onFoodFlagClick(foodFlag.id) : undefined}
        />
      ))}
    </div>
  );
}
