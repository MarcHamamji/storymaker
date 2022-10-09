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
        <x-icon />
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue';
import XIcon from './icons/XIcon.vue';

export default defineComponent({
  components: {
    XIcon,
  },
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
    const timeout = ref<number>();

    const enabled = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        return ctx.emit('update:modelValue', value);
      },
    });

    watch(enabled, () => {
      console.log('ENABLED CHANGED');
      if (enabled.value === true) {
        clearTimeout(timeout.value);
        timeout.value = setTimeout(() => {
          enabled.value = false;
        }, 5000);
      }
    });

    watch(() => props.message, () => {
      if (enabled.value === true) {
        clearTimeout(timeout.value);
        timeout.value = setTimeout(() => {
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
