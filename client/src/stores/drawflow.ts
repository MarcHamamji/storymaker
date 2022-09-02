import type Drawflow from 'drawflow';
import { defineStore } from 'pinia';
import useAPI from './api';

const useDrawflow = defineStore({
  id: 'drawflow',
  state: () => ({
    editor: null as Drawflow | null,
  }),
  actions: {
    setEditor(df: Drawflow) {
      this.editor = df;
    },
    refreshConnections(nodeid: string) {
      this.editor?.updateConnectionNodes(nodeid);
    },
    async saveFlow(storyId: string) {
      if (!this.editor) {
        throw new Error('Editor not initialized');
      }
      const api = useAPI();
      const response = await api.fetch(`${api.serverURL}/api/v1/stories/${storyId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          flow: this.editor.export(),
        }),
      });
      const json = await response.json();

      if (json.message !== 'OK') {
        throw new Error(json.message || 'Unable to save story');
      }
    },
  },
});

export default useDrawflow;
