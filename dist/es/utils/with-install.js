/*
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-22 02:47:55
 * @Description:
 */
export const _withInstall = (comp) => {
    comp.install = function (app) {
        app.component(comp.name, comp);
    };
    return comp;
};