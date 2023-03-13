import React, { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className={"relative bg-orange-100 min-h-screen"}>
      <div className={"flex flex-col max-w-7xl mx-auto"}>
        <Navbar />
        <div className={"p-3 md:p-5 lg:p-10 "}>{children}</div>
      </div>
    </main>
  );
};
