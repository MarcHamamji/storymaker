<template>
  <div :class="['node', disabled ? 'disabled' : '']">
    <div
      class="header"
      :style="background ? {
        background,
      } : {}"
    >
      {{ title }}
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import variables from '../../assets/variables.scss';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    background: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '../../assets/variables.scss';

.node {
  background: $primaryColor;
  border-radius: 14px 14px;

  &.disabled {
    filter: grayscale(40%) brightness(60%);
    cursor: not-allowed !important;
  }

  .header {
    padding: 10px 15px;
    border-radius: 14px 14px 0 0;
    background: $primaryColor;
  }

  .content {
    padding: 16px;
    background-color: $primaryColor;
    border-radius: 0 0 14px 14px;
  }
}
</style>
