<template>
  <div class="task_list">
    <v-list class="list">
      <draggable v-model="listData" :group="{name: group}" ghost-class="ghost">
        <v-list-item v-for="item in listData" :key="item.id">
          <v-hover v-slot="{ hover }">
            <v-card class="task-card d-flex">
              {{ item.description }}
              <v-spacer></v-spacer>
              <v-btn v-if="hover" icon class="task-edit-btn" color="info" @click="editBoardDialog = true">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-card>
          </v-hover>
        </v-list-item>
      </draggable>
    </v-list>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

const taskModel = {
  id: "",
  description: "",
}
export default {
  props: ['boardId', 'type'],
  components: {
    draggable,
  },
  data() {
    return {
      addingTaskDialog: false,
      newTask: {...taskModel},
      group: 'all-tasks'
    }
  },
  computed: {
    listData: {
      get() {
        if(this.type === 'todoList') {
          return this.$store.getters.todoList(this.boardId)
        }
        if(this.type === 'inProgressList') {
          return this.$store.getters.inProgressList(this.boardId)
        }
        if(this.type === 'doneList') {
          return this.$store.getters.doneList(this.boardId)
        }
      },
      set(value) {
        const id = this.boardId;
        if(this.type === 'todoList') {
          this.$store.dispatch('editTodo', {id: id, payload: value})
        }
        if(this.type === 'inProgressList') {
          this.$store.dispatch('editInProgress', {id: id, payload: value})
        }
        if(this.type === 'doneList') {
          this.$store.dispatch('editDone', {id: id, payload: value})
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .task-card{
  position: relative;
  background: #222;
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  .task-edit-btn{
    position: absolute;
    right: 1rem;
    top: 0.5rem;
  }
}
</style>
