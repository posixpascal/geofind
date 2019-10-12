import * as React from "react";
import {shallow, mount, render} from 'enzyme';
import { Route } from "react-router";
import {Application} from "./main";
import {HomePage} from "./pages/home";
import {strings} from "./i18n";

describe("<Application />", () => {
    it("renders all routes correctly", () => {
        const wrapper = mount(<Application />);
        const pathMap = wrapper.find(Route).reduce((map, route) => {
            const routeProps = route.props();
            map[routeProps.path] = routeProps.component;
            return map;
        }, {});

        expect(pathMap["/"].displayName).toContain("HomePage");
        expect(pathMap["/lobby/:id"].displayName).toContain("RoomPage");
        expect(pathMap["/themes/"].displayName).toContain("ThemesPage");
    });

    it("renders the homepage, header and footer", () => {
        const wrapper = mount(<Application />);
        expect(wrapper).toIncludeText(strings.homeTitle);
        expect(wrapper).toIncludeText(strings.homeDescription);
        expect(wrapper).toIncludeText(strings.homeDescription2);
        expect(wrapper).toIncludeText(strings.createLobby);
    });
});
