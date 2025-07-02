import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgroVision",
  description: "AgroVision - Your Agricultural Companion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${nunito.className} `}>
          <Toaster closeButton richColors={true} position={"top-right"} />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
