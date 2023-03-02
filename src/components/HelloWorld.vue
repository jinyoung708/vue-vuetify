<template>
  <v-container>
    <p class="red">red</p>
    <p class="blue">blue</p>
    <div class="layer-popup" v-if="overlay">
      <button type="button" class="close-btn" @click="overlay = false">X</button>
      <FlipbookPopup />
    </div>
  </v-container>
</template>

<script>
import FlipbookPopup from '@/components/flipBookPopup.vue'
export default {
  name: 'HelloWorld',
  components: { FlipbookPopup },
  data: () => ({
    overlay: true,
  }),
}
</script>
<style lang="scss" scoped>
.layer-popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(33,33,33,0.46);
  text-align: center;
  &::after {
    display: inline-block;
    content:'';
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
  .close-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: #fff;
    width: 50px;
    height: 50px;
    font-size: 1.5em;
    font-weight: 700;
    border-radius: 50%;
  }
}
</style>
