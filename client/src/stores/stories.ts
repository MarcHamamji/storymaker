import { defineStore } from 'pinia';
import { ref } from 'vue';
import type Story from '@/types/Story';
import useAPI from './api';

const useStories = defineStore('stories', () => {
  const stories = ref<Story[]>([]);

  async function refreshStories() {
    const api = useAPI();
    const response = await api.fetch(`${api.serverURL}/api/v1/stories`, {
      method: 'GET',
    });
    const data = await response.json();
    stories.value = data.stories;
  }

  async function getStory(storyId: string) {
    const api = useAPI();
    const response = await api.fetch(`${api.serverURL}/api/v1/stories/${storyId}`, {
      method: 'GET',
    });
    if (response.status !== 200) {
      window.location.href = '/';
    }
    const data = await response.json();
    return data;
  }

  return {
    stories,
    refreshStories,
    getStory,
  };
});

export default useStories;
