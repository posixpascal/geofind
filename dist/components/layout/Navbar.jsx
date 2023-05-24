"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const web_1 = require("@react-spring/web");
const react_1 = __importDefault(require("react"));
const AnimatedBackButton_1 = require("@/components/controls/AnimatedBackButton");
const Container_1 = require("@/components/layout/Container");
const UserProfileStatus_1 = require("@/components/user/UserProfileStatus");
const UsersOnlineCounter_1 = require("@/components/user/UsersOnlineCounter");
const router_1 = require("next/router");
const Navbar = ({}) => {
    const route = (0, router_1.useRouter)();
    const hideNavbar = route.pathname.includes("/singleplayer") ||
        route.pathname.includes("/multiplayer");
    const style = (0, web_1.useSpring)({
        from: {
            translateY: `0%`,
            scale: 1,
            opacity: 1,
        },
        to: {
            translateY: hideNavbar ? `-150%` : `0%`,
            //scale: hideNavbar ? 0 : 1,
            opacity: hideNavbar ? 0 : 1,
        },
    });
    return (<Container_1.Container className={"mx-auto z-20 w-full max-w-7xl"}>
      <web_1.animated.nav style={style} className={"flex py-2 mt-4 bg-background/70 backdrop-blur px-5 rounded-xl text-card-headline w-full justify-between"}>
        <div className={"flex items-center justify-between w-full gap-3"}>
          <AnimatedBackButton_1.AnimatedBackButton />
          <UserProfileStatus_1.UserProfileStatus />
          <UsersOnlineCounter_1.UsersOnlineCounter />
        </div>
      </web_1.animated.nav>
    </Container_1.Container>);
};
exports.Navbar = Navbar;
