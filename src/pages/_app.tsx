import "@/styles/globals.css";
import type {AppType} from "next/app";
import {trpc} from "@/utils/trpc";
import {Layout} from "@/components/Layout";
import {appWithTranslation} from "next-i18next";
import React from "react";
import {getSession, SessionProvider, signIn} from "next-auth/react";
import {Session} from "next-auth";
import {RecoilRoot} from "recoil";
import PlausibleProvider from "next-plausible";
import {AuthProvider} from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const GeofindApp: AppType<{ session: Session | null }> = ({
                                                              Component,
                                                              pageProps,
                                                          }) => {
    const content = <PlausibleProvider
        enabled={true}
        selfHosted={true}
        customDomain={"http://localhost:8000"}
        trackLocalhost={true}
        domain={"geofind.io"}
    >
        <Component {...pageProps} />
    </PlausibleProvider>;

    const page = (Component as any).getLayout ? (Component as any).getLayout(content) : <Layout>{content}</Layout>

    return (
        <RecoilRoot>
            <SessionProvider session={pageProps.session}>
                <AuthProvider session={pageProps.session}>
                    {page}
                </AuthProvider>
            </SessionProvider>
        </RecoilRoot>
    );
};

GeofindApp.getInitialProps = async ({ctx}) => {
    const session = await getSession(ctx);
    if (!session) {
        return {
            session: null
        };
    }

    return {
        session: await getSession(ctx),
    };
};

export default trpc.withTRPC(appWithTranslation(GeofindApp));
