"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/header/Navbar";
import { ReactNode } from "react";
import Footer from "@/components/footer/Footer";

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/auth/login" && <Navbar />}
      {children}
      {pathname !== "/auth/login" && <Footer />}
    </>
  );
};

export default ClientLayout;
