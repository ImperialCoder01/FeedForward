
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineUpdate {
  date: string;
  content: string;
}

interface DisasterTimelineProps {
  updates: TimelineUpdate[];
}

export function DisasterTimeline({ updates }: DisasterTimelineProps) {
  // Sort updates chronologically (newest first)
  const sortedUpdates = [...updates].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedUpdates.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No updates available yet.</p>
      ) : (
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {sortedUpdates.map((update, index) => (
            <li key={index} className="mb-6 ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {new Date(update.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {update.content}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
