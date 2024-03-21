<!--
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-21 18:30:14
 * @Description:
-->
<template>
  <i class="h-icon" :style="style">
    <slot></slot>
  </i>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { iconProps } from "./icon";

export default defineComponent({
  name: "h-icon",
  props: iconProps,
  setup(props) {
    const _style = computed(() => {
      if (!props.color && !props.size) return {};
      return {
        ...(props.size ? { "font-size": props.size + "px" } : {}),
        ...(props.color ? { color: props.color } : {}),
      };
    });

    return { style: _style };
  },
});
</script>