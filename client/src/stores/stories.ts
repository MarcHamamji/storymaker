import { defineStore } from 'pinia';
import type Story from '@/types/Story';
import useAPI from './api';

const useStories = defineStore({
  id: 'stories',
  state: () => ({
    stories: [] as Story[],
  }),
  actions: {
    async refreshStories() {
      const api = useAPI();
      const response = await api.fetch(`${api.serverURL}/api/v1/stories`, {
        method: 'GET',
      });
      const data = await response.json();
      this.stories = data.stories;
    },
    async getStory(storyId: string) {
      const api = useAPI();
      const response = await api.fetch(`${api.serverURL}/api/v1/stories/${storyId}`, {
        method: 'GET',
      });
      if (response.status !== 200) {
        window.location.href = '/';
      }
      const data = await response.json();
      return data;
    },
  },
});

export default useStories;
