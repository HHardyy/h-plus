import { HIcon } from 'h-plus/es/components';
export * from 'h-plus/es/components';

const _components = [HIcon];
const _install = (app) => {
    _components.forEach(component => {
        app.use(component);
    });
};
var index = { install: _install };

export { index as default };
