import Footer from "@/app/footer/page";
import Navbar from "@/app/navbar/page";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Framecast AI",
  description: "Generate awesome headshots in minutes using AI",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NextTopLoader color="#2564eb" height={5} showSpinner={false} />
        <Suspense
          fallback={
            <div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center gap-8 justify-between h-[69px]" />
          }
        ></Suspense>
        <main className="flex-grow items-center">
          {children}
          <SpeedInsights />
        </main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
