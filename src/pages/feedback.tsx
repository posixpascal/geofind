import { LocaleName } from "../../types";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { UserAvatar } from "@/components/user/UserAvatar";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { animated, useSpring, useTransition } from "@react-spring/web";
import { trpc } from "@/utils/trpc";
import { FeedbackCard } from "@/components/feedback/FeedbackCard";
import { LoadingSpinner } from "@/components/utils/LoadingSpinner";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageHeaderIcon } from "@/components/layout/PageHeaderIcon";
import { Container } from "@/components/layout/Container";
import { pick } from "next/dist/lib/pick";

export default function FeedbackPage() {
  const [skip, setSkip] = useState(0);
  const feedback = trpc.feedback.create.useMutation();
  const feedbackQuery = trpc.feedback.list.useQuery(
    {
      skip,
    },
    {}
  );

  const t = useTranslations("feedback");
  const { scale, opacity } = useSpring({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: { mass: 2 },
  });

  const onSubmit = (
    message: string,
    mood: { icon: string },
    isPublic: boolean
  ) => {
    return feedback
      .mutateAsync({
        message,
        mood: mood.icon,
        isPublic,
      })
      .then(() => {
        feedbackQuery.refetch();
      });
  };

  const transitions = useTransition(
    feedbackQuery.isSuccess ? feedbackQuery.data : [],
    {
      trail: feedbackQuery.isSuccess ? 400 / feedbackQuery.data.length : 0,
      from: { opacity: 0, scale: 0 },
      enter: { opacity: 1, scale: 1 },
      leave: { opacity: 0, scale: 0 },
      delay: 300,
    }
  );

  if (feedbackQuery.isLoading || !feedbackQuery.data) {
    return <LoadingSpinner isLoading={true} />;
  }

  return (
    <Container>
      <PageHeader
        title={t("title")}
        description={t("content")}
        icon={<PageHeaderIcon icon={"📧"} />}
      />
      <animated.div style={{ scale, opacity }}>
        <div className="flex items-start my-10 space-x-4">
          <div className="flex-shrink-0">
            <UserAvatar width={64} height={64} />
          </div>
          <div className="min-w-0 flex-1">
            <FeedbackForm loading={feedback.isLoading} onSubmit={onSubmit} />
          </div>
        </div>
      </animated.div>

      <PageHeader title={t("feedback")} description={""}></PageHeader>
      {feedbackQuery.data && (
        <div
          className={"grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 "}
        >
          {transitions((style, feedback: any) => {
            return (
              <animated.div style={style} key={feedback.id}>
                <FeedbackCard feedback={feedback} />
              </animated.div>
            );
          })}
        </div>
      )}
    </Container>
  );
}

const namespaces = ["common", "menu", "feedback"];
export const getServerSideProps = async ({
  locale,
}: {
  locale: LocaleName;
}) => {
  return {
    props: {
      messages: pick(
        (await import(`../../public/locales/${locale ?? "en"}.json`)).default,
        namespaces
      ),
    },
  };
};
