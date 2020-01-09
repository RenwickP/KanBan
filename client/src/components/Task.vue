<template>
  <div class="task">
    <p class="style-tasks">
      <button @click="deleteTask" class="btn btn-warning btn-sm">X</button>
      {{taskData.description}}
    </p>
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
        taskId: this.taskData.id
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
    }
  },
  computed: {
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