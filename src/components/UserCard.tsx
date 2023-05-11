import React from "react";
import {User} from "@prisma/client";
import {UserAvatar} from "@/components/UserAvatar";
import {trpc} from "@/utils/trpc";
import {LoadingSpinner} from "@/components/LoadingSpinner";
import {IconButton} from "@/components/IconButton";

interface UserCardProps {
    user: User
}

export const UserCard: React.FC<UserCardProps> = ({user}) => {
    const {data, isLoading} = trpc.profile.user.useQuery({
        id: user.id
    });

    return <div className={'relative'}>
        <LoadingSpinner isLoading={isLoading}/>
        <div className={'p-4'}>
            <div className={'absolute -top-[60px] left-[50%] -translate-x-1/2 z-20'}>
                <UserAvatar width={80} height={80} user={user}/>
            </div>
        </div>
        <h3 className={'text-center text-2xl font-bold'}>
            {user.name}
        </h3>
        {(data && data.user) && <>
            <div>

            </div>
        </>}

        <div className={'flex-col mt-4 flex gap-4'}>
            <IconButton full={true} variant={'positive'}>
                Folgen
            </IconButton>
            <IconButton full={true} variant={'negative'}>
                Schließen
            </IconButton>
        </div>
    </div>
}