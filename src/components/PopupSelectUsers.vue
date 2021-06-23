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
    <div class="search">
      <input v-model="searchQuery" placeholder="Поиск">
    </div>
    <hr/>
    <div class="content">
      <div v-if="listUser.length > 0 && !isLoading">
        <card-user
            @on-select-user="onChangeSelectUser"
            v-for="user of filteredListUser"
            :key="user.id"
            :user="user"></card-user>
      </div>
      <div v-else-if="isLoading">Loading...</div>
      <div v-else>Data not found</div>
      <div>  <button @click="getMoreUser">Cancel</button> </div>
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

  props: {
    oldSelectedUserList: []
  },

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
      searchQuery: '',
      listUser: [
        { id: 1, title: 'first'},
        { id: 2, title: 'second'}
      ],
      isOpen: false,
      isLoading: Boolean,
      selectedUserList: [],
    };
  },


  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  watch: {
    searchQuery(newValue) {
      console.log(newValue)
    }
  },

  computed: {

    filteredListUser() {
      return this.listUser.filter(ticker => ticker.title.includes(this.searchQuery));
    },
  },

  methods: {
    currentPopupController: null,

    getIsActive(id) {
      return !!this.oldSelectedUserList.includes(id)
    },

    onChangeSelectUser(id) {
      if (this.selectedUserList.includes(id)) {
        this.selectedUserList = [...this.selectedUserList.filter(user => user !== id)];
      } else {
        this.selectedUserList = [...this.selectedUserList, id]
      }
    },

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

      getUserList(0, 10)
          .then((response) => response.json())
          .then((response) => {
                this.listUser = response.map(user => {
                   user.isActive = this.getIsActive(user.id)
                return user})})
          .finally(() => this.isLoading = false)

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

    getMoreUser() {

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
  height: 280px;
}

.footer {
  padding: 20px;
  text-align: right;
}
</style>
