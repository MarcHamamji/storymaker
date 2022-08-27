<template>
  <node
    title="Start"
    background="#248232"
    :disabled="disabled"
  >
    <node-preview>
      This node is triggered when the story starts.
    </node-preview>
  </node>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import Node from './Node.vue';
import NodePreview from './utils/NodePreview.vue';

export default defineComponent({
  components: {
    Node,
    NodePreview,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped></style>
