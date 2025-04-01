"use client";
import { Providers } from "../redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <ToastContainer position="top-right" autoClose={5000} />
        </Providers>
      </body>
    </html>
  );
}