<template>
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() { },
});
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
@import '../assets/mixins.scss';

.container {
  width: 600px;
  max-width: 90%;
  border: 2px solid red;
  margin: 8px auto 0px auto;
  @include primary-container(16px);
}
</style>
