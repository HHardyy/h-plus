<!--
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-21 17:49:41
 * @Description:
-->
<template>
  Hello word component
  <h-icon color="red" :size="19" class="h-icon-sshanchu">hello word!</h-icon>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    console.log("setup running!!!");
  },
});
</script>