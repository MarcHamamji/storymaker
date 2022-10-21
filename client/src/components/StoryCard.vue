<template>
  <div class="storycard">
    <h2 class="name">
      {{ story.name }}
    </h2>
    <strong>Last updated:</strong> {{ new Date(story.updated_at).toLocaleString() }}
    <div class="actions">
      <button
        class="open"
        @click="onOpen(story.id)"
      >
        Open
      </button>
      <button
        class="delete"
        @click="onDelete(story.id)"
      >
        <trash-icon />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import TrashIcon from './icons/TrashIcon.vue';
import type Story from '../types/Story';

export default defineComponent({
  components: {
    TrashIcon,
  },
  props: {
    onOpen: {
      type: Function,
      default: () => { },
    },
    onDelete: {
      type: Function,
      default: () => { },
    },
    story: {
      type: Object as PropType<Story>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
@import '../assets/mixins.scss';

.storycard {
  padding: 18px !important;
  width: 320px;
  @include primary-container;
  @include animated-primary-container;

  .name {
    margin-bottom: 12px;
  }

  .actions {
    display: flex;
    margin-top: 8px;
    gap: 8px;

    button {
      @include primary-container;
      @include clickable-primary-container;
    }

    .open {
      flex-grow: 1;
      font-size: 16px;
    }

    .delete {
      aspect-ratio: 1/1;
      padding: 8px;
    }
  }
}
</style>
