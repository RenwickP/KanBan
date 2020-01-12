<template>
  <div class="comment text-left">
    <p class="p-tag">
      <button @click="deleteComment" class="btn btn-warning btn-sm">X</button>
      {{commentData.content}}
    </p>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: ["commentData"],
  data() {
    return {};
  },
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.commentData);
    }
  }
};
</script>

<style scoped>
.comment {
  background-color: grey;
}

.p-tag {
  background-color: grey;
  margin-top: -4px;
  margin-bottom: -4px;
}
</style>