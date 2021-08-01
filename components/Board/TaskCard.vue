<template>
  <div class="task_list">
    <v-list class="list">
      <draggable v-model="listData" :group="{name: group, put: !(type !== 'todo' && listData.length > 9)}"
                 ghost-class="ghost">
        <v-list-item v-for="item in listData" :key="item.id">
          <v-hover v-slot="{ hover }">
            <v-card class="task-card d-flex">
              {{ item.description }}
              <div class="actions">
                <v-btn v-if="hover" icon class="task-edit-btn" color="info" @click="openEditDialog({...item})">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn v-if="hover" icon class="task-edit-btn" color="red" @click="deleteTask(item.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-hover>
        </v-list-item>
      </draggable>
    </v-list>
    <TaskDialog v-if="editTaskDialog" v-model="editTaskDialog" :task-detail="taskModel" v-on:confirm="submitEditedTask" />
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
      editTaskDialog: false,
      taskModel: {...taskModel},
      group: 'all-tasks',
    }
  },
  computed: {
    listData: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters.taskList(this.boardId, this.type)))
      },
      set(value) {
        this.$store.dispatch('editTask', {id: this.boardId, type: this.type, payload: value})
      }
    },
  },
  methods: {
    deleteTask(id) {
      this.$store.dispatch('deleteTask', {boardId: this.boardId, type: this.type, id: id});
    },
    openEditDialog(model) {
      this.taskModel = {...model};
      this.editTaskDialog = true;
    },
    submitEditedTask(editedTask) {
      const payload = this.listData.map(item => {
        if(item.id === editedTask.id) {
            item.description = editedTask.description
        }
        return item;
      })
      this.$store.dispatch('editTask', {id: this.boardId, type: this.type, payload: payload});
      this.editTaskDialog = false;
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .task-card {
  position: relative;
  background: #222;
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;

  .actions{
    position: absolute;
    right: 1rem;
    top: 0.5rem;
  }
}
</style>
