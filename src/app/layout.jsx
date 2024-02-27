"use client";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoSSR from "./components/NoSSR";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NoSSR>
          {children}
          <ToastContainer />
        </NoSSR>
      </body>

      <Script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js" />
    </html>
  );
}
