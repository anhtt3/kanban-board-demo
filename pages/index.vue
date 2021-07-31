<template>
  <v-row>
      <v-col cols="6" sm="4" md="3" xl="2" v-for="item in boards" :key="item.id">
        <nuxt-link :to="{ name: 'board-id', params: { id: item.id }}">
          <v-card class="board-card" :id="item.id">
            <v-img
              :src="item.imgUrl"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              aspect-ratio="1.9"
            >
              <v-card-title>{{ item.name }}</v-card-title>
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

          </v-card>
        </nuxt-link>
      </v-col>
      <v-col cols="6" sm="4" md="3" xl="2">
        <v-card class="board-card" @click="dialog = true">
          <v-img
            class="white--text align-center justify-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            aspect-ratio="1.9"
          >
            <div class="mb-0 text-center">Create new board</div>

          </v-img>
        </v-card>
      </v-col>
    <BoardDialog v-if="dialog" v-model="dialog" v-on:confirm="onSaveBoard"></BoardDialog>
  </v-row>
</template>

<script>

export default {
  data() {
    return {
      dialog: false,
      newBoardName: "",
      newBoardDescription: "",
      pickedBackground: "",
      imgBackgrounds: [
        {
          id: 1,
          url: "https://cdn.vuetifyjs.com/images/cards/house.jpg"
        },
        {
          id: 2,
          url: "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        }
      ],
      selected: 1
    }
  },
  computed: {
    boards() {
      return this.$store.getters.boardsInfo;
    }
  },
  methods: {
    chooseBackground(url) {
      this.pickedBackground = url
    },
    onSaveBoard(newBoard) {
      //Because not using real server so this function is for creating ID for board
      const id = this.$store.state.generatedId;
      newBoard.id = id;
      this.$store.dispatch('addBoard', newBoard);
      this.$store.dispatch('generateId');
      this.$router.push(`/board/${id}`);
    }
  }
}
</script>
<style lang="scss" scoped>
.board-card {
  height: 100%;
  cursor: pointer;
  position: relative;

  &:hover {
    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #333;
      opacity: 0.2;
    }
  }

  .new-board-text {
    position: absolute;
  }
}
a {
  text-decoration: none;
}
</style>
