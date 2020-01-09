<template>
  <div class="task">
    <p class="style-tasks">
      <button @click="deleteTask" class="btn btn-warning btn-sm">X</button>
      {{taskData.description}}
    </p>
  </div>
</template>

<script>
export default {
  name: "task",
  props: ["taskData"],
  data() {
    return {};
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
    }
  }
};
</script>

<style>
.style-tasks {
  text-align: left;
}
</style>