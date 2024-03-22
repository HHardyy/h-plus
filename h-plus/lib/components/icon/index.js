'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var withInstall = require('h-plus/lib/utils/with-install');

const iconProps = {
    size: {
        type: Number
    },
    color: {
        type: String
    }
};

var script = vue.defineComponent({
    name: "h-icon",
    props: iconProps,
    setup(props) {
        const _style = vue.computed(() => {
            if (!props.color && !props.size)
                return {};
            return Object.assign(Object.assign({}, (props.size ? { "font-size": props.size + "px" } : {})), (props.color ? { color: props.color } : {}));
        });
        return { style: _style };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("i", {
    class: "h-icon",
    style: vue.normalizeStyle(_ctx.style)
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 4 /* STYLE */))
}

script.render = render;
script.__file = "packages/components/icon/src/icon.vue";

const HIcon = withInstall._withInstall(script);

exports.HIcon = HIcon;
exports.default = HIcon;
