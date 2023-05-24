"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = void 0;
const react_1 = require("react");
const LoadingSpinner_1 = require("@/components/utils/LoadingSpinner");
const react_2 = require("next-auth/react");
const useCurrentUser_1 = require("@/hooks/useCurrentUser");
const next_plausible_1 = require("next-plausible");
const AuthProvider = ({ children }) => {
    const { user } = (0, useCurrentUser_1.useCurrentUser)();
    const plausible = (0, next_plausible_1.usePlausible)();
    (0, react_1.useEffect)(() => {
        if (user.isLoading) {
            return;
        }
        if (!user.data) {
            (0, react_2.signIn)("credentials").then(() => {
                plausible("Registered");
            });
        }
    }, [plausible, user]);
    if (!user.data || user.isLoading) {
        return (<div className={"bg-orange-100 p-5 lg:p-12 h-screen w-screen"}>
        <h1 className={"text-7xl font-black pb-5"}>
          Geofind.io &mdash; Warte kurz ✌️
        </h1>
        <h2 className={"text-4xl text-gray-700 pl-2"}>
          Wir erstellen dir automatisch einen Gast Account...
        </h2>
        <LoadingSpinner_1.LoadingSpinner isLoading={true}/>
      </div>);
    }
    return <>{children}</>;
};
exports.AuthProvider = AuthProvider;
