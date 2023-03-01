import '@/styles/globals.css'
import type {AppType} from 'next/app'
import {trpc} from '@/utils/trpc';
import {Layout} from '@/components/Layout';
import {appWithTranslation} from "next-i18next";
import React from "react";
import {getSession, SessionProvider} from 'next-auth/react';
import {Session} from "next-auth";

const GeofindApp: AppType<{session: Session|null}> = ({Component, pageProps}) => {
    return <SessionProvider session={pageProps.session}><Layout>
        <Component {...pageProps} />
    </Layout></SessionProvider>
};

GeofindApp.getInitialProps = async ({ctx}) => {
    return {
        session: await getSession(ctx),
    };
}
export default trpc.withTRPC(appWithTranslation(GeofindApp));