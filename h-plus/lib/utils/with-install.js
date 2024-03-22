"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._withInstall = void 0;
const _withInstall = (comp) => {
    comp.install = function (app) {
        app.component(comp.name, comp);
    };
    return comp;
};
exports._withInstall = _withInstall;
