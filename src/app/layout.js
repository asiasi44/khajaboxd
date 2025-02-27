"use client"
import "./globals.css";
import { Ubuntu } from "next/font/google";
import NavBar from "@/components/NavBar";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/queryClient";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" className="h-full">
        <body className={`h-full ${ubuntu.className} bg-[#FCEFEF]`}>
          <NavBar />
          <ToastContainer />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
