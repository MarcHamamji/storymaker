import { defineStore } from 'pinia';

const useAPI = defineStore({
  id: 'api',
  state: () => ({
    serverURL: import.meta.env.VITE_SERVER_URL,
  }),
  actions: {
    fetch(input: RequestInfo | URL, init?: RequestInit | undefined) {
      return fetch(input, {
        ...init,
        headers: {
          authorization: window.localStorage.getItem('jwt') || '',
          ...init?.headers,
        },
      });
    },
    async isLoggedIn() {
      const response = await this.fetch(`${this.serverURL}/api/v1/ping`, {
        method: 'GET',
      });
      return response.status === 200;
    },
  },
});

export default useAPI;
