<template>
  <div>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <!-- <div v-for="ld in listData" :key="ld.id"> -->
        <h5 class="card-title border">{{listData.title}}</h5>
        <!-- insert below: @submit="createTask" -->
        <form>
          <input type="text" placeholder="Task" />
          <button class="btn btn-secondary">+</button>
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
  methods: {
    deleteList(data) {
      console.log("from delete", data);

      this.$store.dispatch("deleteList", data);
    }
  }
};
</script>

<style scoped>
</style>
