<template>
  <snack-bar
    v-model="isSnackBarOpen"
    :message="snackbarMessage"
  />
  <pop-up v-if="popups.delete.open">
    <div class="popup">
      <div class="title">
        <h3>
          Are you sure you want to delete this story?
        </h3>
        <div style="flex-grow: 1;" />
        <button
          type="button"
          class="close"
          @click="popups.delete.open = false"
        >
          <x-icon />
        </button>
      </div>
      <div class="buttons">
        <button
          class="submit half"
          @click="popups.delete.storyId = null; popups.delete.open = false"
        >
          No
        </button>
        <button
          class="submit half"
          @click="onConfirmDelete"
        >
          Yes
        </button>
      </div>
    </div>
  </pop-up>
  <pop-up v-if="popups.create.open">
    <form
      class="popup"
      @submit.prevent="onCreate"
    >
      <div class="title">
        <h3>
          Create a new Story
        </h3>
        <div style="flex-grow: 1;" />
        <button
          type="button"
          class="close"
          @click="popups.create.open = false"
        >
          <x-icon />
        </button>
      </div>
      <input
        v-model="popups.create.name"
        type="text"
        class="name-input"
        placeholder="Name"
      >
      <button
        type="submit"
        class="submit"
      >
        Submit
      </button>
    </form>
  </pop-up>
  <div class="main">
    <nav-bar>
      <template #start>
        <h3>
          Storymaker
        </h3>
      </template>
      <template #end>
        <user-info :logout="true" />
      </template>
    </nav-bar>
    <div class="content">
      <container class="container">
        <div class="title">
          <h2>
            Stories
          </h2>
          <div style="flex-grow: 1;" />
          <button
            class="add"
            @click="popups.create.open = true;"
          >
            <plus-icon />
          </button>
        </div>
        <div
          v-if="stories.stories.length > 0"
          class="cards"
        >
          <story-card
            v-for="story in stories.stories"
            :key="story.id"
            :on-open="openStory"
            :on-delete="onDelete"
            :story="story"
          />
        </div>
        <div
          v-else
          style="margin-top: 12px;"
        >
          You have no stories. Press on the + to create one.
        </div>
      </container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import useStories from '../stores/stories';
import NavBar from '../components/NavBar.vue';
import Container from '../components/Container.vue';
import PopUp from '../components/PopUp.vue';
import UserInfo from '../components/UserInfo.vue';
import SnackBar from '../components/SnackBar.vue';
import XIcon from '../components/icons/XIcon.vue';
import PlusIcon from '../components/icons/PlusIcon.vue';
import StoryCard from '../components/StoryCard.vue';

export default defineComponent({
  components: {
    NavBar,
    Container,
    PopUp,
    UserInfo,
    SnackBar,
    XIcon,
    PlusIcon,
    StoryCard,
  },
  setup() {
    const stories = useStories();

    const popups = reactive({
      create: {
        open: false,
        name: '',
      },
      delete: {
        open: false,
        storyId: null as string | null,
      },
    });

    const isSnackBarOpen = ref(false);
    const snackbarMessage = ref('');

    const showSnackBar = (message: string) => {
      snackbarMessage.value = message;
      isSnackBarOpen.value = true;
    };

    stories.refreshStories();

    const openStory = (storyId: any) => {
      window.location.href = `/#/story/${storyId}`;
      window.location.reload();
    };

    const onCreate = () => {
      console.log(popups.create.name);
      stories.createStory(popups.create.name);
      popups.create.open = false;
      showSnackBar(`Successfully created story "${popups.create.name}"`);
      popups.create.name = '';
    };

    const onDelete = (storyId: string) => {
      popups.delete.open = true;
      popups.delete.storyId = storyId;
    };

    const onConfirmDelete = () => {
      stories.deleteStory(popups.delete.storyId!);
      popups.delete.open = false;
      showSnackBar(`Successfully deleted story "${popups.delete.storyId!}"`);
      popups.delete.storyId = null;
    };

    return {
      stories,
      openStory,
      onCreate,
      onDelete,
      onConfirmDelete,
      isSnackBarOpen,
      snackbarMessage,
      popups,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
@import '../assets/mixins.scss';

.popup {
  .title {
    display: flex;
    justify-content: center;
    align-items: center;

    .close {
      aspect-ratio: 1/1;
      @include primary-container;
      @include clickable-primary-container;
    }
  }

  .name-input {
    @include primary-container;
    width: 100%;
    font-size: 16px;
    margin-top: 12px;
    padding: 6px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .submit {
    @include primary-container;
    @include clickable-primary-container;
    margin-top: 12px;
    font-size: 16px;
    padding: 6px;
    width: 100%;

    &.half {
      width: unset;
      flex-grow: 1;
    }
  }
}

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
      margin: 22px auto;
      width: 1020px;

      .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .add {
          @include primary-container;
          @include clickable-primary-container;
          aspect-ratio: 1/1;
        }
      }

      .cards {
        margin-top: 16px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
