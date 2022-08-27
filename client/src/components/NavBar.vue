<template>
  <nav class="nav">
    <slot name="start" />
    <div style="flex-grow: 1;" />
    <slot name="end" />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";

.nav {
  background-color: $primaryColor;
  color: white;
  font-size: 18px;
  padding: 0.6rem;
  border-bottom: 2px solid $lightPrimaryColor;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 58px;
}
</style>
