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
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    label="Board Name"
                    v-model="newBoardName"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    label="Description"
                    v-model="newBoardDescription"
                    required
                  ></v-textarea>
                </v-col>
                <v-col>
                  <div class="subheading pt-4">
                    Choose image background:
                  </div>
                  <v-row>
                    <v-col v-for="img in imgBackgrounds" :key="img.id" cols="4">
                      <v-img
                        :src="img.url"
                        aspect-ratio="1"
                        height="160"
                        width="160"
                        class="cursor-pointer background-item"
                        :class="{selected : (img.id === selected) }"
                        @click="selected = img.id; chooseBackground(img.id)"
                      >
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
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="closeDialog"
            >
              Close
            </v-btn>
            <!--          Simplify validation-->
            <!--          We could use validation libs such as Vuelidate in real project-->
            <v-btn
              color="blue darken-1"
              text
              :disabled="!newBoardName"
              @click="addBoard"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-row>
</template>

<script>

export default {
  data() {
    return {
      dialog: false,
      newBoardName: "",
      newBoardDescription: "",
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
      pickedBackground: "",
      selected: 1
    }
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    chooseBackground(url) {
      this.pickedBackground = url
    },
    clearDialog() {
      this.newBoardName = "";
      this.pickedBackground = "";
      this.newBoardDescription = "";
      this.selected = 1
    },
    closeDialog() {
      this.clearDialog();
      this.dialog = false;
    },
    addBoard() {
      let i = this.boards.length;
      const newBoard = {
        id: i += 1,
        name: this.newBoardName,
        description: this.newBoardDescription,
        imgUrl: this.imgBackgrounds.find( e => e.id === this.selected).url
      }
      this.$store.dispatch('addBoard', newBoard);
      this.closeDialog();
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
.background-item{
  border-radius: 5px;
  border: 2px solid transparent;
}
.selected {
  border-color: #15C39A;
}

a {
  text-decoration: none;
}
</style>
