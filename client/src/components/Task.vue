<template>
  <div class="task">
    <div class="style-tasks">
      <div class="dropdown">
        <button @click="deleteTask" class="btn btn-warning btn-sm">X</button>
        {{taskData.description}}
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
        >
          Move Task
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <div v-for="list in lists" :key="list.id">
            <li>
              <a href="#">{{list.title}}</a>
              <button @click="moveTask(list.id)"></button>
            </li>
          </div>
        </ul>
      </div>
    </div>
    <form @submit.prevent="createComment">
      <input v-model="comment.content" type="text" required />
      <button type="submit" class="btn btn-primary btn-sm">+Comment</button>
    </form>
    <div v-for="comment in comments" :key="comment.id">
      <comment :commentData="comment" />
    </div>
  </div>
</template>

<script>
import comment from "@/components/Comment";
export default {
  name: "task",
  props: ["taskData"],
  mounted() {
    return this.$store.dispatch("getComments", this.taskData);
    console.log("this.taskdata", this.taskData);
  },
  data() {
    return {
      comment: {
        content: "",
        taskId: this.taskData.id,
        authorId: this.taskData.authorId
      }
    };
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
    },
    createComment() {
      let newComment = { ...this.comment };
      this.$store.dispatch("createComment", newComment);
      this.comment = {
        content: ""
      };
    },

    moveTask(listId) {
      let moveData = {
        task: this.taskData,
        newListId: listId
      };
      this.$store.dispatch("moveTask", moveData);
    }
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
    comments() {
      return this.$store.state.comments[this.taskData.id];
    }
  },

  components: {
    comment
  }
};
</script>

<style>
.style-tasks {
  text-align: left;
}
</style>