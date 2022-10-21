<template>
  <div class="main">
    <nav-bar>
      <template #start>
        <h3>
          Storymaker
        </h3>
      </template>
      <template #end>
        <user-info v-if="isLoggedIn" />
      </template>
    </nav-bar>
    <div class="content">
      <container
        v-if="!isLoggedIn"
        class="container"
      >
        <h2>Login</h2>
        <button
          class="login"
          @click="login('google')"
        >
          <google-icon />
          Login with Google
        </button>
        <button
          class="login"
          @click="login('github')"
        >
          <github-icon />
          Login with Github
        </button>
      </container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '../components/NavBar.vue';
import Container from '../components/Container.vue';
import useAPI from '../stores/api';
import UserInfo from '../components/UserInfo.vue';
import GithubIcon from '../components/icons/GithubIcon.vue';
import GoogleIcon from '../components/icons/GoogleIcon.vue';

export default defineComponent({
  components: {
    NavBar,
    Container,
    UserInfo,
    GithubIcon,
    GoogleIcon,
  },
  setup() {
    const API = useAPI();

    const login = (provider: string) => {
      window.location.href = `${API.serverURL}/api/v1/auth/${provider}`;
    };

    const isLoggedIn = !!window.localStorage.getItem('jwt');

    return {
      login,
      isLoggedIn,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
@import '../assets/mixins.scss';

.main {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .content {
    flex-grow: 1;
    background-color: #180123;
    background-size: 20px 20px;
    background-image: $backgroundImage;

    .container {
      margin-top: 22px;

      .login {
        width: 100%;
        margin-top: 16px;
        font-size: 16px;
        @include primary-container(8px);
        @include clickable-primary-container;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 16px;
      }
    }
  }
}
</style>
