<template>
  <div class="backdrop" @click="closePopup">
    <div class="popup" @click.stop>
     <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppPopup",

  emits: ['close'],

  methods: {
    closePopup () {
      this.$emit('close');
    },
  },

}
</script>

<style scoped>


.popup {
  top: 50px;
  width: 400px;
  height: 500px;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 101;
  background-color: white;
  border-radius: 10px;
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


</style>