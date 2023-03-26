import {useTranslation} from "next-i18next";
import {useCurrentUser} from "@/hooks/useCurrentUser";

export const ProfileForm = () => {
    const {user} = useCurrentUser();
    const {t} = useTranslation('profile')

    return <div>
        <h2 className={'text-3xl font-black mb-4'}>{t('edit.title')}</h2>
        <div className="grid grid-cols-1 gap-y-8">
            <div className="">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    {t('username')}
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        defaultValue={user.data!.name!}
                        className="block w-full px-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    {t('username')}
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        defaultValue={user.data!.name!}
                        className="block w-full px-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
        </div>
    </div>
}