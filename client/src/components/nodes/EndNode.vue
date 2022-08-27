<template>
  <node
    title="End"
    background="#881515"
  >
    <node-preview>
      Trigger this node to end the story.
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
});
</script>

<style lang="scss" scoped></style>
