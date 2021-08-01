<template>
  <v-dialog
    :value="value" @input="$emit('input')"
    max-width="500px"
  >
    <v-card>
      <form @submit="submitTask">
        <v-card-title>
          Add new task
        </v-card-title>
        <v-card-text>
          <v-text-field
            autofocus
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
            @click="closeDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            type="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['value', 'taskDetail'],
  data() {
    const taskModel = {
      id: "",
      description: "",
    };
    return {
      addingTaskDialog: false,
      group: 'all-tasks',
      newTask: this.taskDetail ? this.taskDetail : Object.assign({}, taskModel )
    }
  },
  methods: {
    submitTask(e) {
      e.preventDefault();
      this.$emit('confirm', this.newTask)
    },
    closeDialog() {
      this.$emit('input');
    },
  },
}
</script>

