import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAPI = defineStore('api', () => {
  const serverURL = ref(import.meta.env.VITE_SERVER_URL);

  function customFetch(input: RequestInfo | URL, init?: RequestInit | undefined) {
    return fetch(input, {
      ...init,
      headers: {
        authorization: window.localStorage.getItem('jwt') || '',
        ...init?.headers,
      },
    });
  }

  async function isLoggedIn() {
    const response = await customFetch(`${serverURL.value}/api/v1/ping`, {
      method: 'GET',
    });
    return response.status === 200;
  }

  return {
    serverURL,
    fetch: customFetch,
    isLoggedIn,
  };
});

export default useAPI;
