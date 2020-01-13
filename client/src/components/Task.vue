<template>
  <div class>
    <div class="style-tasks">
      <div class="row">
        <h5 class="col text-center">{{taskData.description}}</h5>
      </div>
      <div class="dropdown">
        <button @click="deleteTask" class="delete-task btn btn-warning btn-sm">X</button>
        <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown">
          Move
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <div v-for="list in lists" :key="list.id">
            <button class="dropdown-item" @click="moveTask(list.id)">{{list.title}}</button>
          </div>
        </ul>
      </div>
    </div>
    <form @submit.prevent="createComment" class="form-body">
      <input v-model="comment.content" type="text" placeholder="Add comment" required />
      <button type="submit" class="btn btn-primary btn-sm">+</button>
    </form>
    <div v-for="comment in comments" :key="comment.id">
      <div class>
        <comment class :commentData="comment" />
      </div>
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
      this.comment.content = "";
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

.delete-task {
  font-size: 12px;
}

.form-body {
  background-color: grey;
}

.dropdown {
  background-color: grey;
}

.beige {
  background-color: beige;
}
</style>