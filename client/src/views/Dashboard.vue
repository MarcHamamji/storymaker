<template>
  <snack-bar
    v-model="isSnackBarOpen"
    :message="snackbarMessage"
  />
  <pop-up v-if="isDeletePopupOpen">
    <div
      class="popup"
    >
      <div class="title">
        <h3>
          Are you sure you want to delete the story "{{ deleteStory!.name }}"
        </h3>
        <div style="flex-grow: 1;" />
        <button
          type="button"
          class="close"
          @click="isDeletePopupOpen = false"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="css-i6dzq1"
          ><line
            x1="18"
            y1="6"
            x2="6"
            y2="18"
          /><line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
          /></svg>
        </button>
      </div>
      <div class="buttons">
        <button
          class="submit half"
          @click="deleteStory = undefined; isDeletePopupOpen = false"
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
  <pop-up v-if="isCreatePopupOpen">
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
          @click="isCreatePopupOpen = false"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="css-i6dzq1"
          ><line
            x1="18"
            y1="6"
            x2="6"
            y2="18"
          /><line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
          /></svg>
        </button>
      </div>
      <input
        v-model="newStoryName"
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
        <user-info />
      </template>
    </nav-bar>
    <div class="content">
      <container
        class="container"
      >
        <div class="title">
          <h2>
            Stories
          </h2>
          <div style="flex-grow: 1;" />
          <button
            class="add"
            @click="isCreatePopupOpen = true;"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="css-i6dzq1"
            ><line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
            /><line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
            /></svg>
          </button>
        </div>
        <div
          v-if="stories.stories.length > 0"
          class="cards"
        >
          <div
            v-for="(story, index) in stories.stories"
            :key="index"
            class="storycard"
          >
            <h2 class="name">
              {{ story.name }}
            </h2>
            <strong>Last updated:</strong> {{ new Date(story.updated_at).toLocaleString() }}
            <div class="actions">
              <button
                class="open"
                @click="openStory(story.id)"
              >
                Open
              </button>
              <button
                class="delete"
                @click="onDelete(story)"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="css-i6dzq1"
                ><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </button>
            </div>
          </div>
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
import { defineComponent, ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import Container from '../components/Container.vue';
import useAPI from '../stores/api';
import useStories from '../stores/stories';
import PopUp from '../components/PopUp.vue';
import UserInfo from '../components/UserInfo.vue';
import SnackBar from '../components/SnackBar.vue';

import type Story from '../types/Story';

export default defineComponent({
  components: {
    NavBar,
    Container,
    PopUp,
    UserInfo,
    SnackBar,
  },
  setup() {
    const api = useAPI();
    const stories = useStories();

    const isCreatePopupOpen = ref(false);
    const isDeletePopupOpen = ref(false);

    const deleteStory = ref<Story>();

    const newStoryName = ref('');

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
      console.log(newStoryName.value);
      api.fetch(`${api.serverURL}/api/v1/stories`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: newStoryName.value,
        }),
      }).then(() => {
        stories.refreshStories();
      });
      isCreatePopupOpen.value = false;
      showSnackBar(`Successfully created story "${newStoryName.value}"`);
      newStoryName.value = '';
    };

    const onDelete = (story: Story) => {
      isDeletePopupOpen.value = true;
      deleteStory.value = story;
    };

    const onConfirmDelete = () => {
      api.fetch(`${api.serverURL}/api/v1/stories/${deleteStory.value!.id}`, {
        method: 'DELETE',
      }).then(() => {
        stories.refreshStories();
      });
      isDeletePopupOpen.value = false;
      showSnackBar(`Successfully deleted story "${deleteStory.value?.name}"`);
      deleteStory.value = undefined;
    };

    return {
      stories,
      openStory,
      onCreate,
      newStoryName,
      isCreatePopupOpen,
      isDeletePopupOpen,
      onDelete,
      deleteStory,
      onConfirmDelete,
      isSnackBarOpen,
      snackbarMessage,
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

        .storycard {
          padding: 18px !important;
          width: 320px;
          @include primary-container;

          .name {
            margin-bottom: 12px;
          }

          .actions {
            display: flex;
            margin-top: 8px;
            gap: 8px;

            button {
              @include primary-container;
              @include clickable-primary-container;
            }

            .open{
              flex-grow: 1;
              font-size: 16px;
            }

            .delete {
              aspect-ratio: 1/1;
              padding: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
