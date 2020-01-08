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
    </div>
  </div>
</template>

<script>
export default {
  name: "ListInfo",
  props: ["listData"],
  data() {
    return {
      task: {
        description: "",
        listId: this.$props.listData.id,
        authorId: this.$store.state.user._id,
        boardId: this.$props.listData.boardId,
        comments: []
      }
    };
  },
  methods: {
    deleteList(data) {
      console.log("from delete", data);

      this.$store.dispatch("deleteList", data);
    },
    // task methods
    createTask() {
      console.log("info getter", this.$props.listData.boardId);
      let newTask = { ...this.task };
      this.$store.dispatch("createTask", newTask);
      console.log("task creation", newTask);

      this.task = {
        description: ""
        // listId: this.$props.listData.id,
        // authorId: this.$store.state.user._id,
        // boardId: this.$props.boardId,
        // comments: []
      };
    }
  }
};
</script>

<style scoped>
</style>
