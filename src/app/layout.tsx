import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/layouts/header";
import Sidebar from "@/components/layouts/sidebar";
import { getCurrentUser } from "@/libs/api"; 
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
  const user = await getCurrentUser(); 
  return (
    <html lang="en">
     
      <body className="h-screen overflow-hidden bg-[#13131A] text-gray-200">
       
        <div className="flex flex-col h-screen">

         
          <Header user={user} />

          
          <div className="flex flex-1 overflow-hidden"> 

           
            <Sidebar />

           
            <main className="flex-1 overflow-y-auto w-full pt-3 pl-12 pr-3 pb-4 md:pb-8">
              {children}
            </main>

          </div> 
        </div> 
        
      </body>
    </html>
  );
}