import React, { ReactNode } from "react";
import { Backdrop } from "./Backdrop";

interface DialogProps {
  title?: string;
  children: ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ title, children }) => {
  return (
    <div
      className={"fixed inset-0 z-10 flex items-center justify-center flex-col"}
    >
      <Backdrop />
      <div className={"bg-white min-w-[200px] z-20 rounded-xl"}>
        <div className={"title"}>{title}</div>
        <div className={"p-5"}>{children}</div>
      </div>
    </div>
  );
};
