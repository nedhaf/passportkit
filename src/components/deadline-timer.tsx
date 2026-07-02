"use client";

import NumberFlow from "@number-flow/react";
import { Clock3 } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useLanguage } from "@/components/language-provider";

const deadline = Date.parse("2026-11-28T00:00:00+01:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(now = Date.now()): TimeLeft {
  const diff = Math.max(deadline - now, 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

const serverTimeLeft: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function subscribeToClock(onStoreChange: () => void) {
  const interval = window.setInterval(onStoreChange, 1_000);

  return () => window.clearInterval(interval);
}

function AnimatedValue({
  value,
  className,
}: {
  value: number;
  className: string;
}) {
  return (
    <NumberFlow
      className={className}
      format={{ minimumIntegerDigits: value < 100 ? 2 : 1 }}
      value={value}
    />
  );
}

export function DeadlineTimer({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  const visibleTimeLeft = useSyncExternalStore(
    subscribeToClock,
    getTimeLeft,
    () => serverTimeLeft,
  );

  if (compact) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-[#ead7a2] bg-[#fff8e8] px-3 py-2 text-sm font-semibold text-[#8a5b00]">
        <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="inline-flex items-center gap-1 tabular-nums">
          <AnimatedValue
            className="font-semibold leading-none text-[#8a5b00]"
            value={visibleTimeLeft.days}
          />
          {t("timer.compact")}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#ead7a2] bg-[#fff8e8] px-5 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#8a5b00]">
        <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
        {t("timer.title")}
      </div>
      <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
        {[
          ["days", visibleTimeLeft.days],
          ["hours", visibleTimeLeft.hours],
          ["minutes", visibleTimeLeft.minutes],
          ["seconds", visibleTimeLeft.seconds],
        ].map(([label, value]) => (
          <span className="inline-flex items-baseline gap-1" key={label}>
            <AnimatedValue
              className="text-4xl font-semibold leading-none tracking-[-0.02em] text-[#17211b] tabular-nums md:text-5xl"
              value={value as number}
            />
            <span className="text-sm font-medium text-[#6b746d]">
              {t(
                `timer.${label}` as
                  | "timer.days"
                  | "timer.hours"
                  | "timer.minutes"
                  | "timer.seconds",
              )}
            </span>
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-[#6b746d]">
        {t("timer.target")}
      </p>
    </div>
  );
}
