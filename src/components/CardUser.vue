<template>
  <div
      class="user"
      :class="{
        ['active'] : getIsActive
      }"
      @click="onToggleSelect()">
    {{user.id}} - {{ user.title }}</div>
</template>

<script>
export default {
  name: "CardUser",

  props: {
    user: { id: Number, title: String },
    isActive: Boolean,
  },

  data () {
    return {
      newIsActive: false,
    }
  },

  emits: ['on-select-user'],

  methods: {

    getIsActive() {
      return this.newIsActive;
    },

    onToggleSelect() {
      console.log( this.isActive)

      this.newIsActive = !this.newIsActive;
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

.user.active {
  background: bisque;
}
</style>