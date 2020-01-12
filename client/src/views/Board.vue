<template>
  <div class="board container mt-5">
    <div class="row">
      <div class="col-12">
        <div class="text-left">
          <router-link class="home-button" :to="{ path: '/' }">Home</router-link>
        </div>
        <div>{{board.title}}</div>

        <form @submit.prevent="createList">
          <input v-model="list.title" type="text" placeholder="List Name" />
          <button class="btn btn-success">Add</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-4" v-for="list in lists" :key="list.id">
        <List-info :listData="list" />
      </div>
    </div>
  </div>
</template>

<script>
import ListInfo from "@/components/ListInfo";

export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getListsByBoard", this.$props.boardId);
  },
  components: {
    ListInfo
  },
  data() {
    return {
      list: {
        title: "",
        authorId: this.$store.state.user._id,
        boardId: this.$props.boardId
      }
    };
  },
  methods: {
    createList() {
      let newList = { ...this.list };
      this.$store.dispatch("createList", newList);
      this.list = {
        title: ""
      };
    }

    // createTask(createTask) {
    //   let newTask = { ...this.task };
    //   this.$store.dispatch("createTask", newTask);
    //   this.task = {
    //     description: "",
    //     listId: this.,
    //     authorId: this.$store.state.user._id,
    //     boardId: this.$props.boardId,
    //     comments: []
    //   };
    // }
  },
  computed: {
    // goodLists() {
    //   return this.$store.state.lists;
    // },
    // tasks() {
    //   return this.$store.state.tasks;
    // },
    lists() {
      return this.$store.state.lists;
    },
    board() {
      return (
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    }
  },
  props: ["boardId"]
};
</script>
<style scoped>
.home-button {
  font-size: 20px;
  color: white;
}
</style>