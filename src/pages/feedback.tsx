import {LocaleName} from "../../types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Tile} from "@/components/Tile";
import {useTranslation} from "next-i18next";
import {Headline} from "@/components/Headline";
import React, {useState} from "react";
import {UserAvatar} from "@/components/UserAvatar";
import {FeedbackForm} from "@/components/FeedbackForm";
import {animated, useSpring, useTransition} from "@react-spring/web";
import {trpc} from "@/utils/trpc";
import {Feedback} from "@prisma/client";
import {FeedbackCard} from "@/components/FeedbackCard";
import {LoadingSpinner} from "@/components/LoadingSpinner";


export default function FeedbackPage() {
    const [skip, setSkip] = useState(0);
    const feedback = trpc.feedback.create.useMutation();
    const feedbackQuery = trpc.feedback.list.useQuery({
        skip
    }, {
    });

    const {t} = useTranslation('feedback');
    const {scale, opacity} = useSpring({
        from: {scale: 0, opacity: 0},
        to: {scale: 1, opacity: 1},
        config: {mass: 2},
    });

    const onSubmit = (message: string, mood: {icon: string}, isPublic) => {
        return feedback.mutateAsync({
            message,
            mood: mood.icon,
            isPublic
        }).then(() => {
            feedbackQuery.refetch();
        })
    }

    const transitions = useTransition(feedbackQuery.isSuccess ? feedbackQuery.data : [], {
        trail: feedbackQuery.isSuccess ? 400 / feedbackQuery.data.length : 0,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
        delay: 300
    });

    if (feedbackQuery.isLoading || !feedbackQuery.data){
        return <LoadingSpinner isLoading={true} />
    }

    return (
        <div>
            <animated.div style={{scale, opacity}}>
                <Tile interactive={false} title={t('title')}
                      content={t('content')}
                      icon={"📧"}>
                    <div className="flex items-start p-5 py-10 space-x-4">
                        <div className="flex-shrink-0">
                            <UserAvatar width={64} height={64}/>
                        </div>
                        <div className="min-w-0 flex-1">
                            <FeedbackForm loading={feedback.isLoading} onSubmit={onSubmit}/>
                        </div>
                    </div>
                </Tile>
            </animated.div>

            <div className={'mt-10 flex justify-between items-center'}>
                <Headline size={'h2'}>{t("feedback")}</Headline>
                {/*<div>*/}
                {/*    <label htmlFor="filter" className="block text-sm font-medium leading-6 text-gray-900">*/}
                {/*        {t('filter.title')}*/}
                {/*    </label>*/}
                {/*    <select*/}
                {/*        id="filter"*/}
                {/*        name="filter"*/}
                {/*        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                {/*        defaultValue="MostVotes"*/}
                {/*    >*/}
                {/*        <option value={"MostVotes"}>{t("filter.mostVotes")}</option>*/}
                {/*        <option value={"Recent"}>{t('filter.recent')}</option>*/}
                {/*        <option value={"Solved"}>{t("filter.solved")}</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
            </div>
            {feedbackQuery.data && <div className={'grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 '}>
                {transitions((style, feedback: Feedback) => {
                    return <animated.div style={style} key={feedback.id}>
                        <FeedbackCard feedback={feedback}/>
                    </animated.div>
                })}
            </div>}
        </div>
    );
}

export const getServerSideProps = async ({
                                             locale,
                                         }: {
    locale: LocaleName;
}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "menu", "feedback"])),
        },
    };
};
