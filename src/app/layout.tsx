import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { Wrapper } from "@/components/layout/wrapper";
import { ThemeProvider } from "@/contexts/theme-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Wrapper>
            <Toaster />
            {children}
          </Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
