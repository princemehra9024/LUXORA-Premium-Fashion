import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface CountdownTimerProps {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountdownTimer = ({ hours = 24, minutes = 0, seconds = 0 }: CountdownTimerProps) => {
  const { theme } = useTheme();
  
  // Calculate total seconds, defaulting to a specific duration if none provided
  const initialTime = hours * 3600 + minutes * 60 + seconds;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // If we've hit 0, don't do anything (or reset, depending on logic)
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Format time components
  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  const padZero = (num: number) => num.toString().padStart(2, '0');

  const TimeBlock = ({ value, label }: { value: string, label: string }) => (
    <div className="flex flex-col items-center mx-1 sm:mx-2">
      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-3xl font-bold shadow-lg ${
        theme === 'dark' 
          ? 'bg-red-950/40 border border-red-500/30 text-red-500' 
          : 'bg-white border border-red-200 text-red-600'
      }`} style={{ fontFamily: 'Teko, sans-serif' }}>
        {value}
      </div>
      <span className={`text-[10px] sm:text-xs mt-2 uppercase tracking-wider font-bold ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      }`}>{label}</span>
    </div>
  );

  return (
    <div className="flex items-start justify-center">
      <TimeBlock value={padZero(h)} label="Hours" />
      <div className={`text-2xl sm:text-4xl font-bold mt-2 sm:mt-3 ${theme === 'dark' ? 'text-red-500/50' : 'text-red-300'}`}>:</div>
      <TimeBlock value={padZero(m)} label="Mins" />
      <div className={`text-2xl sm:text-4xl font-bold mt-2 sm:mt-3 ${theme === 'dark' ? 'text-red-500/50' : 'text-red-300'}`}>:</div>
      <TimeBlock value={padZero(s)} label="Secs" />
    </div>
  );
};

export default CountdownTimer;
