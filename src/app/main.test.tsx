import * as React from "react";
import {shallow, mount, render} from 'enzyme';
import { Route } from "react-router";
import {Application} from "./main";

describe("<Application />", () => {
    it("renders all routes correctly", () => {
        const wrapper = mount(<Application />);
        const pathMap = wrapper.find(Route).reduce((map, route) => {
            const routeProps = route.props();
            map[routeProps.path] = routeProps.component;
            return map;
        }, {});

        expect(pathMap["/"].displayName).toContain("HomePage");
    });
});
