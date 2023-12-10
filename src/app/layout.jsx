"use client";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoSSR from "./components/NoSSR";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NoSSR>
          {children}
          <ToastContainer />
        </NoSSR>
      </body>
    </html>
  );
}
