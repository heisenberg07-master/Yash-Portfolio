"use client";
import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { GitCommit } from 'lucide-react';

export default function GithubGraph() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setTheme(isDark ? 'dark' : 'light');
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-12 sm:mt-16 w-full max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center">
          <GitCommit className="w-4 h-4 text-dark-900 dark:text-white" />
        </div>
        <h3 className="text-xl font-bold text-dark-900 dark:text-white">GitHub Contributions</h3>
      </div>
      <div className="bg-gray-50/50 dark:bg-dark-800/50 rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-dark-700 overflow-x-auto w-full text-center">
        <div className="min-w-[750px] inline-block mx-auto text-left">
          {mounted ? (
            <GitHubCalendar 
              username="heisenberg07-master"
              colorScheme={theme}
              blockSize={12}
              blockMargin={5}
              fontSize={12}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
            />
          ) : (
            <div className="h-[140px] w-full animate-pulse bg-gray-200/50 dark:bg-dark-700/50 rounded-xl" />
          )}
        </div>
      </div>
    </div>
  );
}
