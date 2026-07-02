"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useState } from "react";

const deadline = new Date("2026-11-28T00:00:00+01:00").getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(deadline - Date.now(), 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes };
}

export function DeadlineTimer({ compact = false }: { compact?: boolean }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-[#ead7a2] bg-[#fff8e8] px-3 py-2 text-sm font-semibold text-[#8a5b00]">
        <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="tabular-nums">{timeLeft.days} days left</span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#ead7a2] bg-[#fff8e8] px-5 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#8a5b00]">
        <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
        Countdown to EU readiness deadline
      </div>
      <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
        {[
          ["days", timeLeft.days],
          ["hours", timeLeft.hours],
          ["minutes", timeLeft.minutes],
        ].map(([label, value]) => (
          <span className="inline-flex items-baseline gap-1" key={label}>
            <span className="text-4xl font-semibold leading-none tracking-[-0.02em] text-[#17211b] tabular-nums md:text-5xl">
              {value}
            </span>
            <span className="text-sm font-medium text-[#6b746d]">{label}</span>
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-[#6b746d]">
        Target date: November 28, 2026.
      </p>
    </div>
  );
}
