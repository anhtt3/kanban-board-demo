<template>
  <div>
    <v-row v-if="boardDetail">
      <v-col cols="10">
        <p class="text-h4 text-capitalize">{{ boardDetail.name }}</p>
        <p class="text-subtitle-1 font-italic">{{ boardDetail.description }}</p>
      </v-col>
      <v-col cols="2" class="d-flex">
        <div class="spacer"></div>
        <v-btn fab dark small color="info" class="mx-2" @click="editBoardDialog = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn fab dark small color="red" class="mx-2" @click="deleteDialog = true">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <BoardDialog v-if="editBoardDialog" :board-detail="boardDetail" v-model="editBoardDialog"
                     v-on:confirm="onSaveBoard"></BoardDialog>
        <!--      DELETE DIALOG-->
        <v-dialog
          v-model="deleteDialog"
          persistent
          max-width="400"
        >
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this board?
            </v-card-title>
            <v-card-text>
              This action cannot be undone.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="darken-1"
                text
                @click="deleteDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="red darken-1"
                text
                @click="deleteBoard"
              >
                Confirm
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <KanbanBoard  v-if="boardDetail" :boardId="this.currentBoardId" :max-task="boardDetail.maxTasksOfColumns" ></KanbanBoard>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentBoardId: null,
      deleteDialog: false,
      editBoardDialog: false,
    }
  },
  mounted() {
    this.currentBoardId = parseInt(this.$route.params.id);
    this.$store.commit('setMainBackground', this.boardDetail.image.url)
  },
  computed: {
    boardDetail() {
      return this.$store.getters.boardDetails(this.currentBoardId);
    }
  },

  methods: {
    deleteBoard() {
      this.deleteDialog = false;
      this.$router.push('/');
      this.$store.dispatch('deleteBoard', this.currentBoardId);
    },
    onSaveBoard(newBoard) {
      this.$store.dispatch('editBoard', newBoard);
      this.editBoardDialog = false;
    }
  }
}
</script>
<style lang="scss">
.v-card__title {
  word-break: unset;
}
</style>
