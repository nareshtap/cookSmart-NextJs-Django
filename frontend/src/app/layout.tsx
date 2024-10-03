import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/redux/stroreProvider";
import { Toaster } from "react-hot-toast";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "CookSmart",
  description: "a recipe finder app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dzdsvt79u/image/upload/v1727859896/logo_pdr2gy.jpg"
          sizes="any"
        />
      </head>
      <body>
        <StoreProvider>
          <ClientLayout>
            <Toaster />
            {children}
          </ClientLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
