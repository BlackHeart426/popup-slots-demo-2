<template>
  <div v-if="isOpen" class="backdrop" @click="close">
    <div class="popup" @click.stop>
      <h1> <slot name="title"></slot></h1>
      <hr />
      <div class="description">
        <slot name="description"></slot>
      </div>
      <hr/>
      <div class="content">
        <slot name="list-user"></slot>
      </div>
      <hr/>
      <div class="footer">
        <slot name="actions" :close="close" :confirm="confirm">
          <button @click="close">Cancel</button>
          &nbsp;
          <button @click="confirm">Accept</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  currentPopupController: null,

  data() {
    return {
      isOpen: false,
      title: "Select user"
    };
  },


  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  methods: {
    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.close();
      }

      if (this.isOpen && e.key === "Enter") {
        this.confirm();
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

      return popupPromise;
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
.popup {
  top: 50px;
  height: 500px;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 101;
  background-color: white;
  border-radius: 10px;
}

.content {
  overflow: auto;
  height: 360px;
}

.popup h1 {
  text-align: center;
  margin: 0;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.footer {
  text-align: right;
}
</style>
