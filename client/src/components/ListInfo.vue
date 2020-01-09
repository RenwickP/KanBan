<template>
  <div>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <!-- <div v-for="ld in listData" :key="ld.id"> -->
        <h5 class="card-title border">{{listData.title}}</h5>
        <form @submit.prevent="createTask">
          <input v-model="task.description" type="text" placeholder="Task" />
          <button type="submit" class="btn btn-secondary">+</button>
        </form>
        <!-- </div> -->
      </div>
      <button @click="deleteList(listData)" class="btn btn-warning">X</button>
      <div v-for="task in tasks" :key="task.id">
        <task :taskData="task" />
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
      this.task = {
        description: ""
      };
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
</style>
