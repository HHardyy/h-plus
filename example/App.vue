<template>
  test vite app
  <hr>
  <HelloWord />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWord from './src/component/Helloword.vue'

export default defineComponent({
  components: {
    HelloWord
  }
})
</script>