<template>
  <button @click="openPopup">Select user</button>
  <div>Selected user list</div>
  <popup-select-users ref="confirmationPopup"></popup-select-users>
</template>

<script>
import PopupSelectUsers from "./components/PopupSelectUsers.vue";

export default {
  components: {PopupSelectUsers },

  methods: {
    async openPopup() {

      const popupResult = await this.$refs.confirmationPopup.open();

      if (popupResult) {
        alert("Confirmed!");
      }
    },
  },
};
</script>

