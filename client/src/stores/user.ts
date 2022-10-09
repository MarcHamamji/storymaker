import router from '@/router';
import { defineStore } from 'pinia';
import useAPI from './api';

export interface User {
  created_at: string,
  updated_at: string,
  id: number,
  email: string,
  name: string,
  avatar_url: string,
}

const useUser = defineStore({
  id: 'user',
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async refreshUser() {
      const api = useAPI();

      const response = await api.fetch(`${api.serverURL}/api/v1/users`, {
        method: 'GET',
      });

      const json = await response.json();
      if (json.message === 'jwt expired') {
        this.deleteJWT();
        return;
      }

      this.user = json?.user;
    },
    deleteJWT() {
      window.localStorage.removeItem('jwt');
    },
    logout() {
      this.deleteJWT();
      this.refreshUser();
      router.push('/');
    },
  },
});

export default useUser;
