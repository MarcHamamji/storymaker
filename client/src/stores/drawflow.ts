import type Drawflow from 'drawflow';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import useAPI from './api';

const useDrawflow = defineStore('drawflow', () => {
  const editor = ref<Drawflow | null>(null);

  function setEditor(df: Drawflow) {
    editor.value = df;
  }

  function refreshConnections(nodeid: string) {
    editor.value?.updateConnectionNodes(nodeid);
  }

  async function saveFlow(storyId: string) {
    if (editor.value === null) {
      throw new Error('Editor not initialized');
    }
    const api = useAPI();
    const response = await api.fetch(`${api.serverURL}/api/v1/stories/${storyId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        flow: editor.value.export(),
      }),
    });
    const json = await response.json();

    if (json.message !== 'OK') {
      throw new Error(json.message || 'Unable to save story');
    }
  }

  return {
    editor,
    setEditor,
    refreshConnections,
    saveFlow,
  };
});

export default useDrawflow;
