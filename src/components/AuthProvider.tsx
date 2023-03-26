import {ReactNode, useEffect} from "react";
import {LoadingSpinner} from "@/components/LoadingSpinner";
import {signIn} from "next-auth/react";
import {useCurrentUser} from "@/hooks/useCurrentUser";

interface AuthProviderProps {
    children: ReactNode;
    session: any;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children, session}) => {
    const {user} = useCurrentUser();
    useEffect(() => {
        if (user.isLoading){
            return;
        }

        if (!user.data){
          signIn('credentials');
        }
    }, [user])

    if (!user.data || user.isLoading) {
        return <div className={'bg-orange-100 p-5 lg:p-12 h-screen w-screen'}>
            <h1 className={'text-7xl font-black pb-5'}>
                Geofind.io &mdash; Warte kurz ✌️
            </h1>
            <h2 className={'text-4xl text-gray-700 pl-2'}>
                Wir erstellen dir automatisch einen Gast Account...
            </h2>
            <LoadingSpinner/>
        </div>
    }

    return <>{children}</>
}