
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/layouts/header";
import Sidebar from "@/components/layouts/sidebar";
import { getCurrentUser } from "@/libs/api"; // For fetching user in header

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevSpot",
  description: "Technology Owner Profiles",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser(); // Fetch user data for header

  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden bg-[#13131A] text-gray-200">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header user={user} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-[1440px] mx-auto"> 
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}