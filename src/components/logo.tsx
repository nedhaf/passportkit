import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  const activeCells = new Set([0, 1, 3, 4, 5, 8, 10, 12, 14, 16, 18, 20, 21, 23, 24]);

  return (
    <span
      aria-hidden="true"
      className={`grid aspect-square grid-cols-5 gap-0.5 rounded-lg bg-[#17211b] p-1.5 ${className}`}
    >
      {Array.from({ length: 25 }).map((_, index) => (
        <span
          className={`rounded-[1px] ${
            activeCells.has(index) ? "bg-white" : "bg-[#6fd79a]/55"
          }`}
          key={index}
        />
      ))}
    </span>
  );
}

export function Logo({
  href = "/",
  compact = false,
  className = "",
}: {
  href?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`inline-flex items-center gap-2 text-[#17211b] ${className}`}
      href={href}
    >
      <LogoMark className={compact ? "h-8 w-8" : "h-9 w-9"} />
      {!compact ? (
        <span className="hidden text-lg font-semibold tracking-[-0.01em] sm:inline">
          PassportKit
        </span>
      ) : null}
    </Link>
  );
}
