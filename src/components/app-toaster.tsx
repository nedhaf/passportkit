"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "border border-[#dfe5dc] bg-white text-[#17211b] shadow-xl shadow-[#23432f]/10",
          title: "font-semibold",
          description: "text-[#526057]",
        },
      }}
    />
  );
}
