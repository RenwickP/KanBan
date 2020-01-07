<template>
  <div class="board">
    <div>{{board.title}}</div>
    <form @submit.prevent="createList">
      <input v-model="list.title" type="text" placeholder="List Name" />
      <button class="btn btn-success">Add</button>
    </form>
    <div v-for="goodList in goodLists" :key="goodList.id">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">{{goodList.title}}</h5>
          <p class="card-text"></p>
          <button class="btn btn-danger btn-sm">x</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getListsByBoard", this.$props.boardId);
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
      console.log("this", this.$store.state.user._id);
      let newList = { ...this.list };
      this.$store.dispatch("createList", newList);
      console.log();
      this.list = {
        title: ""
      };
    }
  },
  computed: {
    goodLists() {
      return this.$store.state.lists;
    },

    board() {
      return (
        // this.$store.state.
        //FIXME This does not work on page reload because the boards array is empty in the store
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    }
  },
  props: ["boardId"]
};
</script>
