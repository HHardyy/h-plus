'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var components = require('h-plus/lib/components');

const _components = [components.HIcon];
const _install = (app) => {
    _components.forEach(component => {
        app.use(component);
    });
};
var index = { install: _install };

exports.default = index;
Object.keys(components).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return components[k]; }
  });
});
