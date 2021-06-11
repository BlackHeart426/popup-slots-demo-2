<template>
  <app-popup v-if="isOpen" @close="close">
    <h1>
      Select user
    </h1>
    <hr/>
    <div class="description">
     You need select user from list
    </div>
    <hr/>
    <div class="content">
      <div v-if="listUser.length > 0 && !isLoading">
        <card-user v-for="user of listUser" :key="user.id" :user="user"></card-user>
      </div>
      <div v-else-if="isLoading">Loading...</div>
      <div v-else>Data not found</div>
    </div>
    <hr/>
    <div class="footer">
      <slot name="actions" :close="close" :confirm="confirm">
        <button @click="close">Cancel</button>
        &nbsp;
        <button @click="confirm">Accept</button>
      </slot>
    </div>
  </app-popup>
</template>

<script>
import {getUserList} from "@/api";
import AppPopup from "@/components/AppPopup";
import CardUser from "@/components/CardUser";

export default {
  components: {AppPopup, CardUser},

  currentPopupController: null,

  open() {
    let resolve;
    let reject;

    const popupPromise = new Promise((ok, fail) => {
      resolve = ok;
      reject = fail;
    });

    this.$options.currentPopupController = { resolve, reject };
    this.isOpen = true;

    return popupPromise;
  },

  data() {
    return {
      title: "Select user",
      listUser: [],
      isOpen: false,
      isLoading: Boolean,
    };
  },


  mounted() {
    document.addEventListener("keydown", this.handleKeydown);


  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  methods: {
    currentPopupController: null,

    open() {
      let resolve;
      let reject;

      const popupPromise = new Promise((ok, fail) => {
        resolve = ok;
        reject = fail;
      });

      this.$options.currentPopupController = { resolve, reject };
      this.isOpen = true;

      this.isLoading = true;

      getUserList(0, 30)
          .then((response) => response.json())
          .then((response) => this.listUser = response)
          .finally(() => this.isLoading = false)
          .then((json) => console.log(json));

      return popupPromise;
    },

    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.close();
      }

      if (this.isOpen && e.key === "Enter") {
        this.confirm();
      }
    },


    confirm() {
      this.$options.currentPopupController.resolve(true);
      this.isOpen = false;
    },

    close() {
      this.$options.currentPopupController.resolve(false);
      this.isOpen = false;
    },
  },
};
</script>

<style>

.content {
  overflow: auto;
  height: 320px;
}

.footer {
  padding: 20px;
  text-align: right;
}
</style>
