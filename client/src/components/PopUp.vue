<template>
  <div class="overlay">
    <container class="container">
      <slot />
    </container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Container from './Container.vue';

export default defineComponent({
  components: { Container },
});
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  background-color: #00000066;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    animation: appear 300ms ease-out;
  }
}
</style>
