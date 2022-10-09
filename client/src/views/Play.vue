<template>
  <div v-if="!story">
    Loading...
  </div>
  <div
    v-else-if="currentNode.class === 'EndNode'"
    class="end"
  >
    END
  </div>
  <div
    v-else
    class="view"
  >
    <div
      class="text"
    >
      <div class="description">
        {{ currentNode.data.description }}
      </div>
    </div>
    <div class="choices">
      <button
        v-for="(node, index) in currentNode.data.choices"
        :key="index"
        class="button"
        @click="nextNode(index)"
      >
        {{ node }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type Story from '@/types/Story';
import useAPI from '../stores/api';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const api = useAPI();

    const story = ref<Story | null>(null);
    const currentNodeId = ref('');
    const nodes = computed(() => story.value!.flow!.drawflow!.Home.data);
    const currentNode = computed(() => nodes.value[currentNodeId.value]);

    const nextNode = (outputIndex: number = 0) => {
      if (currentNode.value.class === 'EndNode') return;
      currentNodeId.value = currentNode.value.outputs[`output_${outputIndex + 1}`].connections[0].node;
    };

    api.fetch(`${api.serverURL}/api/v1/play/${route.params.id}`)
      .then((response) => {
        if (response.status === 404) {
          router.push('/');
          return false;
        }
        return response.json();
      })
      .then((data) => {
        story.value = data.story;
        // eslint-disable-next-line prefer-destructuring
        currentNodeId.value = Object.entries(nodes.value)
          .find((node) => node[1].class === 'StartNode')![0];
        nextNode();
      });

    return {
      story,
      currentNode,
      nextNode,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
@import '../assets/mixins.scss';

.end {
  height: 100vh;
  width: 100vw;
  background-color: #180123;
  background-size: 20px 20px;
  background-image: $backgroundImage;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18vmin;
}

.view {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;

  .text {
    flex-grow: 1;
    background-color: #180123;
    background-size: 20px 20px;
    background-image: $backgroundImage;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4vmin;
    padding: 22px;
    text-align: justify;
    overflow-y: scroll;
    @include primary-scrollbar;

    .description {
      animation: appear 300ms ease-out;
    }

  }

  .choices {
    @include primary-container;
    border-radius: 0;
    display: flex;
    padding: 16px;
    gap: 8px;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;

    .button {
      font-size: 28px;
      min-height: 58px;
      @include primary-container;
      @include clickable-primary-container;
    }
  }

}

</style>
