"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiPlayerSessions = exports.multiPlayerState = void 0;
const state_1 = require("@legendapp/state");
exports.multiPlayerState = (0, state_1.observable)();
exports.multiPlayerSessions = (0, state_1.observable)();
