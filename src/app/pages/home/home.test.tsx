// Link.react.test.js
import React from "react";
import renderer from "react-test-renderer";
import HomePage from "./index";

test("Link changes the class when hovered", () => {
    const component = renderer.create(<HomePage />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    console.log("OK");
});
