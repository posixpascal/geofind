"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithButton = exports.Icon = exports.Basic = void 0;
const MockedTrpcProvider_1 = require("@/stories/mocks/MockedTrpcProvider");
const PageHeader_1 = require("@/components/layout/PageHeader");
const PageHeaderIcon_1 = require("@/components/layout/PageHeaderIcon");
const IconButton_1 = require("@/components/controls/IconButton");
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "UI/PageHeader",
    component: PageHeader_1.PageHeader,
    decorators: [MockedTrpcProvider_1.MockedTrpcProvider],
    tags: ["autodocs"],
    parameters: {
        controls: {},
        layout: "centered",
    },
    argTypes: {},
};
exports.default = meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
exports.Basic = {
    parameters: {},
    name: "Basic",
    args: {
        title: "Sample Header",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
};
exports.Icon = {
    parameters: {},
    name: "Icon",
    args: {
        title: "Sample Header with Icon",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        icon: <PageHeaderIcon_1.PageHeaderIcon icon={"❤️"}/>,
    },
};
exports.WithButton = {
    parameters: {},
    name: "WithButton",
    args: {
        title: "Sample Header with Button",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        icon: <IconButton_1.IconButton>Some Action</IconButton_1.IconButton>,
    },
};
