<template>
  <div class="box">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useUser from '../stores/user';

export default defineComponent({
  setup() {
    const user = useUser();
    if (!user.user.id) {
      user.refreshUser();
    }

    return {
      user,
    };
  },
});

</script>

<style lang="scss" scoped>
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
  }
}
</style>
