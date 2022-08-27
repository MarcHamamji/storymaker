<template>
  <transition>
    <div
      v-if="enabled"
      class="snackbar"
    >
      {{ message }}
      <button
        class="close"
        @click="enabled = false"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="css-i6dzq1"
        ><line
          x1="18"
          y1="6"
          x2="6"
          y2="18"
        /><line
          x1="6"
          y1="6"
          x2="18"
          y2="18"
        /></svg>
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const enabled = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        return ctx.emit('update:modelValue', value);
      },
    });

    watch(enabled, () => {
      if (enabled.value === true) {
        setTimeout(() => {
          enabled.value = false;
        }, 5000);
      }
    });

    return {
      enabled,
    };
  },
});

</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

.snackbar {
  position: fixed;
  bottom: 10px;
  left: calc(50%);
  z-index: 5;
  @include primary-container(12px);
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  max-width: 90vw;

  .close {
    aspect-ratio: 1/1;
  @include primary-container;
  @include clickable-primary-container;
  }
}

.v-enter-active,
.v-leave-active {
  transition: transform 300ms ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-50%) translateY(100px);
}
</style>
