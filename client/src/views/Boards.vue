<template>
  <div class="boards">
    <h5>WELCOME TO THE BOARDS!!!</h5>
    <button @click="logout" class="btn btn-danger">Logout</button>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button type="submit">Create Board</button>
    </form>
    <div class="text-left ml-5 mt-5" v-for="board in boards" :key="board._id">
      <button @click="deleteBoard(board._id)" class="btn btn-secondary">Delete</button>
      <router-link
        class="text-dark"
        :to="{name: 'board', params: {boardId: board._id}}"
      >{{board.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    logout() {
      this.$store.dispatch("logout");
    },
    deleteBoard(deleteBoard) {
      this.$store.dispatch("deleteBoard", deleteBoard);
    }
  }
};
</script>

<style>
body {
  background-image: url("https://images.unsplash.com/photo-1578167597239-14f8fc680b6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2156&q=80");
}
</style>