<template>
  <v-row>
    <v-col cols="6" sm="4" md="3" xl="2" v-for="item in boards" :key="item.id" >
      <nuxt-link :to="{ name: 'board-id', params: { id: item.id }}">
        <v-card class="board-card" :id="item.id">
          <v-img
            :src="item.imgUrl"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            aspect-ratio="1.9"
          >
            <v-card-title v-text="item.name"></v-card-title>
          </v-img>

        </v-card>
      </nuxt-link>
    </v-col>
    <v-col cols="6" sm="4" md="3" xl="2">
      <v-card class="board-card">
        <v-img
          class="white--text align-center justify-center"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          aspect-ratio="1.9"
        >
            <p class="mb-0 text-center">Create new board</p>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Vuex from 'vuex'

export default {
  data () {
    return {
      boards: [
        {
          id: 1,
          name: "board 1",
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/house.jpg"
        },
        {
          id: 2,
          name: "board 2",
          imgUrl: "https://cdn.vuetifyjs.com/images/cards/road.jpg"
        },
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
.board-card{
  height: 100%;
  cursor: pointer;
  position: relative;
  &:hover{
    &::after{
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
  .new-board-text{
    position: absolute;

  }
}
</style>
