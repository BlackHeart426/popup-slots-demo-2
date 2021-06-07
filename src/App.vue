<template>
  <button @click="openPopup">Select user</button>
  <div>Selected user list</div>
  <popup-select-users ref="confirmationPopup">
    <template #title>Select user Popup</template>
    <template #description>
      Вы действительно хотите освоить правильные подходы к проектированию систем
      во Vue?
    </template>

    <template #list-user>
      <div v-if="listUser.length > 0">
          <card-user v-for="user of listUser" :key="user.id" :user="user"></card-user>
      </div>
<!--      <div v-else-if="isLoading">Loading...</div>-->
<!--      <div v-else>  Not found </div>-->
    </template>

<!--    <template #actions="{ confirm }">-->
<!--      <button @click="confirm" :disabled="isConfirmationCorrect">Accept</button>-->
<!--    </template>-->
  </popup-select-users>
</template>

<script>
import PopupSelectUsers from "./components/PopupSelectUsers.vue";
import CardUser from "@/components/CardUser";
import { getUserList } from "./api"

export default {
  components: { CardUser, PopupSelectUsers },
  data() {
    return {
      listUser: [],
      isLoading: Boolean,
    };
  },

  created() {
    this.isLoading = true;

    getUserList(0,30)
        .then((response) => response.json())
        .then((response) => this.listUser = response)
        .finally(() => this.isLoading = false)
        .then((json) => console.log(json));
  },

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

