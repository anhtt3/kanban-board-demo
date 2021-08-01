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
    <TaskDialog v-if="addingTaskDialog" v-model="addingTaskDialog" v-on:confirm="addTask" />
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
    addTask(newTask) {
      this.$store.dispatch('addTask', {id: this.boardId, payload: newTask});
      this.closeTaskDialog();
    },
    closeTaskDialog() {
      this.addingTaskDialog = false;
      this.newTask =  {...taskModel}
    }
  }
}
</script>

