"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expForCurrentLevel = exports.nextExpLevel = exports.expLevel = void 0;
const EXP_CONSTANT = 0.2;
const expLevel = (exp) => {
    return Math.max(1, Math.floor(EXP_CONSTANT * Math.sqrt(exp)));
};
exports.expLevel = expLevel;
const nextExpLevel = (exp) => {
    const current = (0, exports.expLevel)(exp);
    const next = (0, exports.expForCurrentLevel)(current + 1);
    return next;
};
exports.nextExpLevel = nextExpLevel;
const expForCurrentLevel = (level) => {
    return (level / 0.2) * (level / 0.2);
};
exports.expForCurrentLevel = expForCurrentLevel;
