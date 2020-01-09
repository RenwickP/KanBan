<template>
  <div class="task">
    <button class="btn btn-warning btn-sm">X</button>
    {{taskData.description}}
  </div>
</template>

<script>
export default {
  name: "task",
  props: ["taskData"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>