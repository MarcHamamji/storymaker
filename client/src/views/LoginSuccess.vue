<template>
  Loading...
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import useAPI from '../stores/api';

export default defineComponent({
  async setup() {
    const route = useRoute();
    const api = useAPI();

    const { jwt } = route.query;
    if (!jwt) {
      window.location.href = '/';
    }

    window.localStorage.setItem('jwt', String(jwt));

    const response = await api.fetch(`${api.serverURL}/api/v1/ping`, {
      method: 'GET',
    });

    if (response.status !== 200) {
      window.localStorage.removeItem('jwt');
      window.location.href = '/';
    } else {
      window.location.href = '/#/dashboard';
      window.location.reload();
    }

    return {};
  },
});
</script>
