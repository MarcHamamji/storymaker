import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '../router';
import useAPI from './api';

export interface User {
  created_at: string,
  updated_at: string,
  id: number,
  email: string,
  name: string,
  avatar_url: string,
}

const useUser = defineStore('user', () => {
  const user = ref<User | null>(null);

  function deleteJWT() {
    window.localStorage.removeItem('jwt');
  }

  async function refreshUser() {
    const api = useAPI();

    const response = await api.fetch(`${api.serverURL}/api/v1/users`, {
      method: 'GET',
    });

    const json = await response.json();
    if (json.message === 'jwt expired') {
      deleteJWT();
      return;
    }

    user.value = json?.user;
  }

  function logout() {
    deleteJWT();
    refreshUser();
    router.push('/');
  }

  return {
    user,
    refreshUser,
    deleteJWT,
    logout,
  };
});

export default useUser;
