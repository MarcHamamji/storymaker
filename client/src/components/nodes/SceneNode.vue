<template>
  <div ref="el">
    <node
      title="Scene"
      background="#302579"
    >
      <div v-if="preview">
        <node-preview>
          This node represents a scene in the story. Each scene can have multiple choices.
        </node-preview>
      </div>
      <div
        v-else
        class="choice-inputs"
      >
        <textarea
          v-model="data.description"
          placeholder="Description"
          class="textarea"
          rows="5"
        />
        <div
          v-for="(_choice, index) in data.choices"
          :key="index"
          class="choice-line"
        >
          <input
            v-model="data.choices[index]"
            placeholder="Choice"
            class="choice-input"
            type="text"
          >
          <button
            class="choice-delete"
            @click="removeChoice(index)"
          >
            -
          </button>
        </div>
        <button
          class="choice-add"
          @click="addChoice"
        >
          +
        </button>
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
import useDrawflow from '../../stores/drawflow';
import NodePreview from './utils/NodePreview.vue';

interface Data {
  choices: string[];
  description: string;
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
    const store = useDrawflow();
    const nodeId = ref('');
    const data = reactive<Data>({
      choices: [],
      description: 'Description',
    });

    const getNode = () => store.editor?.getNodeFromId(nodeId.value);

    watch(data, (value) => {
      if (store.editor) {
        store.editor.updateNodeDataFromId(nodeId.value as string, value);
      }
    });

    const addChoice = () => {
      data.choices.push('');
      store.editor?.addNodeOutput(nodeId.value);
      setTimeout(() => {
        store.refreshConnections(`node-${nodeId.value}`);
      }, 50);
    };

    const removeChoice = (index: number) => {
      data.choices.splice(index, 1);
      store.editor?.removeNodeOutput(nodeId.value, `output_${index + 1}`);
      setTimeout(() => {
        store.refreshConnections(`node-${nodeId.value}`);
      }, 50);
    };

    onMounted(async () => {
      await nextTick();
      if (el.value?.parentElement && store.editor) {
        nodeId.value = el.value.parentElement.parentElement?.id.slice(5) as string;
        Object.assign(data, getNode()?.data);
      }
      await nextTick();
      setTimeout(() => {
        store.refreshConnections(`node-${nodeId.value}`);
      }, 50);
    });

    return {
      el,
      data,
      addChoice,
      removeChoice,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../../assets/variables.scss';
@import '../../assets/mixins.scss';

.choice-inputs {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .textarea {
    @include primary-container;
    resize: none;
    font-size: 14px;
    height: auto;
    @include primary-scrollbar;
  }

  .choice-line {
    display: flex;
    flex-direction: row;
    gap: 4px;

    .choice-input {
      @include primary-container;
      color: white;
      height: 28px;
      flex-grow: 1;
    }

    .choice-delete {
      @include primary-container;
      @include clickable-primary-container;
      font-size: 26px;
      display: inline;
      color: white;
      height: 28px;
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

  }

  .choice-add {
    @include primary-container;
    @include clickable-primary-container;
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
  }
}
</style>
