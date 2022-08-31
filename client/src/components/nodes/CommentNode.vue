<template>
  <div ref="el">
    <node
      title="Comment"
      background="#30133e"
    >
      <div v-if="preview">
        <node-preview>
          This node is can be used as a comment, Storymaker completely ignores it.
        </node-preview>
      </div>
      <div
        v-else
        class="content"
      >
        <textarea
          v-model="data.text"
          placeholder="Comment"
          class="textarea"
          rows="3"
        />
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
import Node from './Node.vue';
import useStore from '../../stores/drawflow';
import NodePreview from './utils/NodePreview.vue';

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
      text: 'Comment',
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
@import '../../assets/variables.scss';
@import '../../assets/mixins.scss';

.preview-text {
  font-size: 14px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .textarea {
    @include primary-container;
    resize: none;
    font-size: 14px;
    height: auto;
    scrollbar-color: $primaryColor #FFFFFF00;

  }
}
</style>
