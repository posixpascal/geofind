import "@/styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "@/utils/trpc";
import { Layout } from "@/components/layout/Layout";
import React from "react";
import { getSession, SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import PlausibleProvider from "next-plausible";
import { AuthProvider } from "@/components/utils/AuthProvider";
import { NextIntlProvider } from "next-intl";
import { NextPageContext } from "next";

const GeofindApp: AppType<{ messages: any; session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  const content = (
    <PlausibleProvider
      enabled={true}
      selfHosted={true}
      customDomain={"http://localhost:8000"}
      trackLocalhost={true}
      domain={"geofind.io"}
    >
      <Component {...pageProps} />
    </PlausibleProvider>
  );

  const page = (Component as any).getLayout ? (
    (Component as any).getLayout(content)
  ) : (
    <Layout>{content}</Layout>
  );

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <SessionProvider session={pageProps.session}>
        <AuthProvider session={pageProps.session}>{page}</AuthProvider>
      </SessionProvider>
    </NextIntlProvider>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  return {
    session,
    messages: await import(`../../public/locales/${ctx.locale}.json`),
  };
}

export default trpc.withTRPC(GeofindApp);
