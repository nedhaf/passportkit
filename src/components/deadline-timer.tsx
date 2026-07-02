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

  const values = timeLeft ?? { days: 0, hours: 0, minutes: 0 };

  if (compact) {
    return (
      <div className="flex items-center gap-2 rounded-md bg-[#fff6df] px-3 py-2 text-sm font-semibold text-[#8a5b00]">
        <Clock3 className="h-4 w-4" aria-hidden="true" />
        <span>{values.days} days left</span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#ead7a2] bg-[#fff8e8] p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#8a5b00]">
        <Clock3 className="h-4 w-4" aria-hidden="true" />
        EU readiness deadline
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ["Days", values.days],
          ["Hours", values.hours],
          ["Minutes", values.minutes],
        ].map(([label, value]) => (
          <div className="rounded-md bg-white px-3 py-2" key={label}>
            <p className="text-2xl font-semibold text-[#17211b]">
              {value}
            </p>
            <p className="text-xs text-[#6b746d]">{label}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-[#6b746d]">
        Target date: November 28, 2026.
      </p>
    </div>
  );
}
