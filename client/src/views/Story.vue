<template>
  <snack-bar
    v-model="isSnackBarOpen"
    :message="snackbarMessage"
  />
  <main class="main">
    <nav-bar class="navbar">
      <template #start>
        <router-link
          to="/dashboard"
          class="dashboard"
        >
          <button>
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
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
              />
            </svg>
          </button>
        </router-link>
        <h3 style="display: inline;">
          {{ storyName }}
        </h3>
      </template>
      <template #end>
        <user-info />
      </template>
    </nav-bar>

    <div class="content">
      <div class="sidebar">
        <h3 style="margin-bottom: 12px;">
          Controls
        </h3>
        <button
          class="save"
          @click="saveFlow"
        >
          <h3>
            Save
          </h3>
        </button>
        <div class="buttons">
          <button
            class="button"
            @click="play"
          >
            <h3>
              Play
            </h3>
          </button>
          <button
            class="button"
            @click="share"
          >
            <h3>
              Share
            </h3>
          </button>
        </div>
        <h3 style="margin-bottom: 12px;">
          Nodes
        </h3>
        <component
          :is="node.component"
          v-for="node in nodes"
          :key="node.name"
          :draggable="!disabledNodes.has(node.name)"
          class="node"
          v-bind="{ disabled: disabledNodes.has(node.name), preview: true }"
          @dragend="(e) => onDrop(e, node)"
        />
      </div>
      <div class="workspace">
        <button
          class="zoom zoom-in"
          @click="zoomIn"
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
          >
            <circle
              cx="11"
              cy="11"
              r="8"
            />
            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
            />
            <line
              x1="11"
              y1="8"
              x2="11"
              y2="14"
            />
            <line
              x1="8"
              y1="11"
              x2="14"
              y2="11"
            />
          </svg>
        </button>
        <button
          class="zoom zoom-out"
          @click="zoomOut"
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
          >
            <circle
              cx="11"
              cy="11"
              r="8"
            />
            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
            />
            <line
              x1="8"
              y1="11"
              x2="14"
              y2="11"
            />
          </svg>
        </button>
        <div
          id="drawflow"
          ref="drawflowElement"
          class="drawflow"
          @dragover.prevent=""
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
/* eslint-disable no-underscore-dangle, @typescript-eslint/ban-ts-comment */
import {
  ref, defineComponent, h, render, getCurrentInstance, onMounted,
} from 'vue';

import Drawflow, { type DrawflowExport } from 'drawflow';
import { useRoute } from 'vue-router';
import useStore from '../stores/drawflow';

import nodes, { type NodeObject } from '../nodes';
import StartNode from '../components/nodes/StartNode.vue';
import NavBar from '../components/NavBar.vue';
import UserInfo from '../components/UserInfo.vue';
import SnackBar from '../components/SnackBar.vue';
import useStories from '../stores/stories';

export default defineComponent({
  components: {
    StartNode,
    NavBar,
    UserInfo,
    SnackBar,
  },
  setup() {
    const drawflowElement = ref<HTMLDivElement>();
    const drawflow = useStore();
    const Vue = { version: 3, h, render };

    const route = useRoute();
    const stories = useStories();

    const storyId = ref<string>();
    const storyName = ref<string>();

    const isSnackBarOpen = ref(false);
    const snackbarMessage = ref('');

    const disabledNodes = ref<Set<string>>(new Set());

    const showSnackBar = (message: string) => {
      snackbarMessage.value = message;
      isSnackBarOpen.value = true;
    };

    const onDrop = (e: DragEvent, node: NodeObject) => {
      if (drawflow.editor) {
        // @ts-ignore
        // eslint-disable-next-line max-len
        const x = e.clientX * (drawflow.editor.precanvas.clientWidth / (drawflow.editor.precanvas.clientWidth * drawflow.editor.zoom)) - (drawflow.editor.precanvas.getBoundingClientRect().x * (drawflow.editor.precanvas.clientWidth / (drawflow.editor.precanvas.clientWidth * drawflow.editor.zoom)));
        // @ts-ignore
        // eslint-disable-next-line max-len
        const y = e.clientY * (drawflow.editor.precanvas.clientHeight / (drawflow.editor.precanvas.clientHeight * drawflow.editor.zoom)) - (drawflow.editor.precanvas.getBoundingClientRect().y * (drawflow.editor.precanvas.clientHeight / (drawflow.editor.precanvas.clientHeight * drawflow.editor.zoom)));
        drawflow.editor.addNode(node.name, node.inputs, node.outputs, x, y, node.name, node.data, node.name, 'vue');
      }
    };

    const zoomIn = () => {
      drawflow.editor?.zoom_in();
      drawflow.editor?.zoom_in();
    };

    const zoomOut = () => {
      drawflow.editor?.zoom_out();
      drawflow.editor?.zoom_out();
    };

    (async () => {
      storyId.value = route.params.id as string;
      const data = await stories.getStory(storyId.value);
      storyName.value = data.story.name;
      drawflow.editor?.import(data.story.flow as DrawflowExport);
      if (Object.values((data.story.flow as DrawflowExport).drawflow.Home.data).find((n) => n.name === 'StartNode')) {
        disabledNodes.value.add('StartNode');
      }
    })();

    const saveFlow = async () => {
      try {
        await drawflow.saveFlow(storyId.value!);
        showSnackBar('Successfully saved story');
      } catch (error) {
        showSnackBar((error as Error).message);
      }
    };

    const play = () => {
      window.open(`/#/play/${storyId.value}`, '_blank');
    };

    const share = () => {
      navigator.clipboard.writeText(`${window.location.origin}/#/play/${storyId.value}`);
      showSnackBar('Successfully copied story link');
    };

    onMounted(() => {
      drawflow.setEditor(new Drawflow(
        drawflowElement.value as HTMLDivElement,
        Vue,
        getCurrentInstance()!.appContext.app._context,
      ));
      if (drawflow.editor) {
        drawflow.editor.zoom_min = 0.3;
        drawflow.editor.force_first_input = true;
        drawflow.editor.start();

        nodes.forEach((node: NodeObject) => {
          drawflow.editor?.registerNode(node.name, node.component, {}, {});
        });

        drawflow.editor.on('nodeCreated', (event) => {
          if (drawflow.editor?.getNodeFromId(event).class === 'StartNode') {
            disabledNodes.value.add('StartNode');
          }
        });

        // eslint-disable-next-line func-names
        drawflow.editor.removeNodeId = function (id) {
          this.removeConnectionNodeId(id);
          // @ts-ignore
          const moduleName = this.getModuleFromNodeId(id.slice(5));
          // @ts-ignore
          if (this.module === moduleName) {
            // @ts-ignore
            this.container.querySelector(`#${id}`).remove();
          }
          // @ts-ignore
          this.dispatch('nodeRemoved', id.slice(5)); // Changed
          // @ts-ignore
          delete this.drawflow.drawflow[moduleName].data[id.slice(5)]; // Changed
        };

        drawflow.editor.on('connectionCreated', (event) => {
          const nodeInfo = drawflow.editor!.getNodeFromId(event.output_id);
          if (nodeInfo.outputs[event.output_class].connections.length > 1) {
            const removeConnectionInfo = nodeInfo.outputs[event.output_class].connections[0];
            // @ts-ignore
            // eslint-disable-next-line max-len
            drawflow.editor!.removeSingleConnection(event.output_id, removeConnectionInfo.node, event.output_class, removeConnectionInfo.output);
          }
        });

        drawflow.editor.on('nodeRemoved', (event) => {
          console.log(event);
          if (drawflow.editor?.getNodeFromId(event).class === 'StartNode') {
            disabledNodes.value.delete('StartNode');
          }
        });
      }
    });
    return {
      drawflowElement,
      onDrop,
      nodes,
      disabledNodes,
      zoomIn,
      zoomOut,
      saveFlow,
      storyName,
      isSnackBarOpen,
      snackbarMessage,
      play,
      share,
    };
  },
});

</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
@import '../assets/mixins.scss';

.main {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .dashboard {
    margin-right: 8px;
    aspect-ratio: 1/1;
    color: white;
    text-decoration: none !important;

    button {
      aspect-ratio: 1/1;
      @include primary-container;
      @include clickable-primary-container;
    }
  }

  .content {
    min-height: 0;
    display: flex;
    flex-grow: 1;

    .sidebar {
      width: 320px;
      max-width: 35vw;
      padding: 1rem;
      background: $primaryColor;
      color: white;
      border-right: 2px solid $lightPrimaryColor;
      overflow-y: scroll;
      @include primary-scrollbar($lightPrimaryColor);

      .save {
        width: 100%;
        height: 32px;
        @include primary-container;
        @include clickable-primary-container;
        margin-bottom: 8px;
      }

      .buttons {
        display: flex;
        flex-direction: row;
        gap: 8px;
        margin-bottom: 12px;

        .button {
          flex-grow: 1;
          flex-basis: 0;
          height: 32px;
          @include primary-container;
          @include clickable-primary-container;
        }
      }

      .card {
        background-color: var(--surface-b);
        padding: 0;

        .title {
          font-size: 16px;
        }

        .content {
          font-size: 12px;
        }
      }

      .node {
        background-color: $lightPrimaryColor;
        border: 2px solid $lightPrimaryColor;
        border-radius: 16px;
        padding: 0px;
        margin-bottom: 12px;
        cursor: grab;
      }
    }

    .workspace {
      flex-grow: 1;
      position: relative;

      .zoom {
        position: absolute;
        width: 42px;
        height: 42px;
        z-index: 2;
        @include primary-container;
        @include clickable-primary-container;
      }

      .zoom-in {
        top: 10px;
        right: 10px;
      }

      .zoom-out {
        top: 60px;
        right: 10px;
      }

      .drawflow {
        height: 100%;
      }
    }
  }
}
</style>
