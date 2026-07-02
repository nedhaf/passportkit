import type { Metadata } from "next";
import { AppToaster } from "@/components/app-toaster";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "PassportKit",
  description:
    "QR product passports and readiness tools for small fashion brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
          <AppToaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
