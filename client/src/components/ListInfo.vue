<template>
  <div>
    <div class="card mt-5" style="width: 18rem;">
      <div class="card-body">
        <!-- <div v-for="ld in listData" :key="ld.id"> -->
        <h5 class="card-title border list-title">{{listData.title}}</h5>
        <form @submit.prevent="createTask">
          <input v-model="task.description" type="text" placeholder="Add task" />
          <button type="submit" class="btn btn-secondary">+</button>
        </form>
        <!-- </div> -->
      </div>
      <button @click="deleteList(listData)" class="btn btn-warning">Delete List</button>
      <div v-for="task in tasks" :key="task.id">
        <!-- <div class="row"> -->
        <task :taskData="task" />
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import task from "@/components/Task";

export default {
  name: "ListInfo",
  props: ["listData"],
  components: {
    task
  },
  mounted() {
    return this.$store.dispatch("getTasks", this.listData);
  },
  data() {
    return {
      task: {
        description: "",
        listId: this.$props.listData.id,
        authorId: this.$store.state.user._id,
        boardId: this.$props.listData.boardId
      }
    };
  },
  methods: {
    deleteList(data) {
      this.$store.dispatch("deleteList", data);
    },
    // task methods
    createTask() {
      let newTask = { ...this.task };
      this.$store.dispatch("createTask", newTask);
      this.task.description = "";
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData.id];
    }
  }
};
</script>

<style scoped>
.list-title {
  background-color: beige;
}

.card-body {
  background-color: grey;
}
</style>
