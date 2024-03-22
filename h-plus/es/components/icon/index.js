import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, renderSlot } from 'vue';
import { _withInstall } from 'h-plus/es/utils/with-install';

const iconProps = {
    size: {
        type: Number
    },
    color: {
        type: String
    }
};

var script = defineComponent({
    name: "h-icon",
    props: iconProps,
    setup(props) {
        const _style = computed(() => {
            if (!props.color && !props.size)
                return {};
            return Object.assign(Object.assign({}, (props.size ? { "font-size": props.size + "px" } : {})), (props.color ? { color: props.color } : {}));
        });
        return { style: _style };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("i", {
    class: "h-icon",
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 4 /* STYLE */))
}

script.render = render;
script.__file = "packages/components/icon/src/icon.vue";

const HIcon = _withInstall(script);

export { HIcon, HIcon as default };
