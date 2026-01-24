import { useState, useEffect } from 'react';

interface CountdownResult {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

export function useCountdown(timerEndAt?: string | null): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<CountdownResult>(() => calculateTimeLeft(timerEndAt));

  useEffect(() => {
    if (!timerEndAt) return;
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(timerEndAt));
    }, 1000);

    return () => clearInterval(timer);
  }, [timerEndAt]);

  return timeLeft;
}

function calculateTimeLeft(timerEndAt?: string | null): CountdownResult {
  if (!timerEndAt) {
    return { hours: 0, minutes: 0, seconds: 0, isExpired: true, totalSeconds: 0 };
  }

  const now = new Date().getTime();
  const endTime = new Date(timerEndAt).getTime();
  const difference = endTime - now;

  if (difference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, isExpired: true, totalSeconds: 0 };
  }

  const totalSeconds = Math.floor(difference / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds, isExpired: false, totalSeconds };
}
