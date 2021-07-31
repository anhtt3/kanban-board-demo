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
       <TaskCard :board-id="boardId" type="todo"/>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>
          In progress <sub class="caption ml-2"> (max: 10)</sub>
        </v-card-title>
        <TaskCard :board-id="boardId" type="inProgress"/>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>
          Done <sub class="caption ml-2"> (max: 10)</sub>
        </v-card-title>
        <TaskCard :board-id="boardId" type="done"/>
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
      this.$store.dispatch('addTask', {id: this.boardId, payload: payload});
      this.closeAddTaskDialog();
    },
    closeAddTaskDialog() {
      this.addingTaskDialog = false;
      this.newTask =  {...taskModel}
    }
  }
}
</script>

