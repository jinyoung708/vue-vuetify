<template>
  <v-container>
    <p class="red">red</p>
    <p class="blue">blue</p>
    <v-btn @click="overlay = true">flip book open</v-btn>
    <v-fade-transition>
      <div class="layer-popup" v-if="overlay">
        <v-btn class="mx-2 close-btn" fab small @click="overlay = false"><v-icon dark>mdi-close</v-icon></v-btn>
        <FlipbookPopup />
      </div>
    </v-fade-transition>
  </v-container>
</template>

<script>
import FlipbookPopup from '@/components/flipBookPopup.vue'
export default {
  name: 'HelloWorld',
  components: { FlipbookPopup },
  data: () => ({
    overlay: false,
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
    top: 10px;
  }
}
</style>
