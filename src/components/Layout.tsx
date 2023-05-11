import React, {ReactNode, useEffect, useState} from "react";
import {Navbar} from "@/components/Navbar";
import {useLocalStorage} from "react-use";
import {Settings} from "@prisma/client";
import {trpc} from "@/utils/trpc";
import {DEFAULT_SETTINGS} from "@/server/constants/settings";
import {Globals} from "@react-spring/web";
import {useRecoilState} from "recoil";
import {settingsState} from "@/state/settings";
import {Footer} from "@/components/Footer";
import { DSGVO } from "./DSGVO";

export const Layout: React.FC<{ children: ReactNode }> = ({children}) => {
    const [settings, setSettings] = useRecoilState<Partial<Settings>>(settingsState);
    const [ready, setReady] = useState(false);
    trpc.settings.subscribe.useSubscription({}, {
        onData(result){
            Globals.assign({ skipAnimation: !result.enableAnimations });

            setSettings(result);
            setReady(true);
        },
    });

    useEffect(() => {
        const html = document.querySelector('html')
        if (!html || !settings){
            return;
        }
        html.setAttribute('class', settings.colorPalette!);
    }, [settings])

    // TODO this slows down rendering
    if (!ready){
        return <></>
    }

    return (
        <main className={settings.colorPalette}>
            <div className={'theme-transition bg-background min-h-screen relative'}>
                <div className={"flex flex-col min-h-screen w-full mx-auto relative"}>
                    <Navbar/>
                    <div className={"p-3 md:p-5 lg:p-10 "}>{children}</div>
                    <div className={'mx-auto w-full max-w-7xl'}>
                        <DSGVO />
                    </div>
                </div>
                <Footer />
            </div>
        </main>
    );
};
