(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HPlus = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

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

  const _withInstall = (comp) => {
      comp.install = function (app) {
          app.component(comp.name, comp);
      };
      return comp;
  };

  const HIcon = _withInstall(script);

  const _components = [HIcon];
  const _install = (app) => {
      _components.forEach(component => {
          app.use(component);
      });
  };
  var index = { install: _install };

  exports.HIcon = HIcon;
  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
