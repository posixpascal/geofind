import React from "react";
import {Feedback} from "@prisma/client";
import {User} from "next-auth";
import {UserAvatar} from "@/components/UserAvatar";

const moods = [
    {name: 'Excited', value: 'excited', icon: '🔥'},
    {name: 'Loved', value: 'loved', icon: '❤️'},
    {name: 'Happy', value: 'happy', icon: "😁"},
    {name: 'Sad', value: 'sad', icon: "🙁"},
    {name: 'Thumbsy', value: 'thumbsy', icon: "👍"},
    {name: 'I feel nothing', value: null, icon: "😶"},
]

interface FeedbackProps {
    feedback: Feedback & { user: User }
}

export const FeedbackCard: React.FC<FeedbackProps> = ({feedback}) => {
    return <div className={'bg-white dark:bg-slate-700 dark:text-slate-300 p-5 rounded-xl'}>
        <div className={'flex justify-between'}>
            <div className={'flex gap-4 items-center text-2xl'}>
                <UserAvatar width={44} height={44} user={feedback.user}/>
                <p className={'font-black'}>
                    {feedback.user.name}
                </p>
            </div>
            <div className={'text-4xl'}>
                {feedback.mood}
            </div>
        </div>
        <p className={'font-italic font-times italic text-xl leading-6 mb-5 mt-2 pb-5'}>
            "{feedback.message}"
        </p>
        <div className={'text-xs'}>
            {feedback.isSolved && <div>
                ✅ Gelöst
            </div>}

            {!feedback.isSolved && <div>
                ⌛️ Noch nicht gelöst
            </div>}
        </div>
    </div>
}