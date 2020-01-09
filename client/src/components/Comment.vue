<template>
  <div class="comment">
    <p>
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

<style>
</style>