import React, { ReactNode, useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { trpc } from "@/utils/trpc";
import { Globals } from "@react-spring/web";
import { settingsState } from "@/state/settings";
import { Footer } from "@/components/layout/Footer";
import { DSGVO } from "../utils/DSGVO";
import { useSelector } from "@legendapp/state/react";

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const settings = useSelector(() => settingsState.get());
  const [ready, setReady] = useState(false);
  trpc.settings.subscribe.useSubscription(
    {},
    {
      onData(result) {
        Globals.assign({ skipAnimation: !result.enableAnimations });

        settingsState.set(result);
        setReady(true);
      },
    }
  );

  useEffect(() => {
    const html = document.querySelector("html");
    if (!html || !settings) {
      return;
    }
    html.setAttribute("class", settings.colorPalette!);
  }, [settings]);

  // TODO this slows down rendering
  if (!ready) {
    return <></>;
  }

  return (
    <main className={settings.colorPalette}>
      <div className={"theme-transition bg-background min-h-screen relative"}>
        <div className={"flex flex-col min-h-screen w-full mx-auto relative"}>
          <Navbar />
          <div className={"p-3 md:p-5 lg:p-10 "}>{children}</div>
          <div className={"mx-auto w-full max-w-7xl"}>
            <DSGVO />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
};
