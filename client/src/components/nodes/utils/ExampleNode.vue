<template>
  <div ref="el">
    <node
      title="Example"
      background="#302579"
    >
      <div v-if="preview">
        <node-preview>
          This node is an example node.
        </node-preview>
      </div>
      <div
        v-else
        class="content"
      >
        <input
          v-model="data.text"
          placeholder="Example"
          class="example-input"
        >
      </div>
    </node>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import Node from '../Node.vue';
import useStore from '@/stores/drawflow';
import NodePreview from './NodePreview.vue';

interface Data {
  text: string;
}

export default defineComponent({
  components: {
    Node,
    NodePreview,
  },
  props: {
    preview: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const el = ref<HTMLDivElement>();
    const store = useStore();
    const nodeId = ref('');
    const data = reactive<Data>({
      text: 'Example',
    });

    const getNode = () => store.editor?.getNodeFromId(nodeId.value);

    watch(data, (value) => {
      if (store.editor) {
        store.editor.updateNodeDataFromId(nodeId.value as string, value);
      }
    });

    onMounted(async () => {
      await nextTick();
      if (el.value?.parentElement && store.editor) {
        nodeId.value = el.value.parentElement.parentElement?.id.slice(5) as string;
        Object.assign(data, getNode()?.data);
      }
    });

    return {
      el,
      data,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../../../assets/mixins.scss';

.content {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .example-input {
    @include primary-container;
    font-size: 14px;
    width: 100%;
  }
}
</style>
