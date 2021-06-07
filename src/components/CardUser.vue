<template>
  <div class="user">{{user.id}} - {{ user.title }}</div>
</template>

<script>
export default {
  name: "CardUser",

  props: {
    user: { id: Number, title: String },
  }
}
</script>

<style scoped>

.user {
  padding: 6px 5px;
}

.user:hover {
  background: aliceblue;
}
</style>