<template>
  <v-row>
    <v-col cols="4">
      <v-card>
        <v-card-title class="d-flex">
          <span>Todo</span>
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            icon
            @click="addingTaskDialog = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
       <TaskCard :board-id="boardId" type="todoList"/>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>
          In progress
        </v-card-title>
        <TaskCard :board-id="boardId" type="inProgressList"/>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>
          Done
        </v-card-title>
        <TaskCard :board-id="boardId" type="doneList"/>
      </v-card>
    </v-col>

<!--    ADD TASK DIALOG-->
    <v-dialog
      v-model="addingTaskDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          Add new task
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Task Description"
            v-model="newTask.description"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closeAddTaskDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addTask"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>
</template>
<script>

const taskModel =  {
  id: "",
  description: "",
}

export default {
  props: ['boardId'],
  data() {
    return {
      addingTaskDialog: false,
      newTask: {...taskModel},
      group: 'all-tasks'
    }
  },

  methods: {
    addTask() {
      const payload = {...this.newTask};
      const id = this.boardId;
      this.$store.dispatch('addTask', {id: id, payload: payload});
      this.closeAddTaskDialog();
    },
    closeAddTaskDialog() {
      this.addingTaskDialog = false;
      this.newTask =  {...taskModel}
    }
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
