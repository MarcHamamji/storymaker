<template>
  <div
    v-if="user.user"
    class="box"
  >
    <div class="text">
      <span>
        {{ user.user.name }}
      </span>
    </div>
    <img
      class="avatar"
      :src="user.user.avatar_url"
      alt="avatar"
    >
    <div
      v-if="logout"
      class="logout"
      title="Logout"
      @click="onLogout"
    >
      <logout-icon />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useUser from '../stores/user';
import LogoutIcon from './icons/LogoutIcon.vue';

export default defineComponent({
  components: {
    LogoutIcon,
  },
  props: {
    logout: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const user = useUser();
    if (!user.user?.id) {
      user.refreshUser();
    }

    const onLogout = () => {
      user.logout();
    };

    return {
      user,
      onLogout,
    };
  },
});

</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

.box {
  height: 100%;
  display: flex;
  flex-direction: row;

  .text {
    display: flex;
    flex-direction: column;
    text-align: right;
    justify-content: center;
    margin-left: 8px;
  }
  .avatar {
    height: 100%;
    border-radius: 8px;
    margin-left: 8px;
    @include primary-container(0);
  }

  .logout {
    margin-left: 6px;
    @include primary-container;
    @include clickable-primary-container;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
