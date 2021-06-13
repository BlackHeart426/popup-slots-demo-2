<template>
  <div
      class="user"
      :class="{
        ['active'] : isActive
      }"
      @click="onToggleSelect()">
    {{user.id}} - {{ user.title }}</div>
</template>

<script>
export default {
  name: "CardUser",

  props: {
    user: { id: Number, title: String, isActive: Boolean },
  },

  data () {
    return {
      isActive: false,
    }
  },

  emits: ['on-select-user'],

  mounted() {
    this.isActive = this.user.isActive;
  },
  methods: {
    onToggleSelect() {

      this.isActive = !this.isActive;
      this.$emit('on-select-user', this.user.id);
    },
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

.user.active  {
  background: bisque;
}
</style>