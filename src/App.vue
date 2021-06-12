<template>
  <button @click="openPopup">Select user</button>
  <div>Selected user list</div>
  <div v-for="user in selectedUserList" :key="user">{{user}}</div>
  <popup-select-users
      ref="confirmationPopup"
      :old-selected-user-list="selectedUserList"
  ></popup-select-users>
</template>

<script>
import PopupSelectUsers from "./components/PopupSelectUsers.vue";

export default {
  components: { PopupSelectUsers },

  data () {
    return {
      selectedUserList: [],
    }
  },

  methods: {
    async openPopup() {

      const popupResult = await this.$refs.confirmationPopup.open();

      if (popupResult) {
        this.selectedUserList = Array.from(this.$refs.confirmationPopup.selectedUserList);
        console.log(Array.from(this.$refs.confirmationPopup.selectedUserList));
      }
    },
  },
};
</script>

