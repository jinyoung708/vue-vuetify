<template>
  <Flipbook
      class="flipbook"
      :pages="pages"
      :pagesHiRes="pagesHiRes"
      :startPage="pageNum"
      v-slot="flipbook"
      ref="flipbook"
      @flip-left-start="onFlipLeftStart"
      @flip-left-end="onFlipLeftEnd"
      @flip-right-start="onFlipRightStart"
      @flip-right-end="onFlipRightEnd"
      @zoom-start="onZoomStart"
      @zoom-end="onZoomEnd"
    >
      <div class="action-bar">
        <button
          class="btn left"
          :class="{ disabled: !flipbook.canFlipLeft }"
          @click="flipbook.flipLeft"
        >&lt;</button>
        <button
          class="btn plus"
          :class="{ disabled: !flipbook.canZoomIn }"
          @click="flipbook.zoomIn"
        >+</button>
        <span class="page-num">
          Page {{ flipbook.page }} of {{ flipbook.numPages }}
        </span>
        <button
          class="btn minus"
          :class="{ disabled: !flipbook.canZoomOut }"
          @click="flipbook.zoomOut">-</button>
        <button
          class="btn right"
          :class="{ disabled: !flipbook.canFlipRight }"
          @click="flipbook.flipRight">&gt;</button>
      </div>
    </Flipbook>
</template>

<script>
import Flipbook from 'flipbook-vue/vue2'
export default {
    components: { Flipbook },
    data: () => ({
        pages: [],
        pagesHiRes: [],
        pageNum: null,
    }),
    methods: {
        onFlipLeftStart(page) { console.log('flip-left-start', page) },
        onFlipLeftEnd(page) {
        console.log('flip-left-end', page)
        // window.location.hash = '#' + page
        },
        onFlipRightStart(page) { console.log('flip-right-start', page) },
        onFlipRightEnd(page) {
        console.log('flip-right-end', page)
        // window.location.hash = '#' + page
        },
        onZoomStart(zoom) {
        console.log('zoom-start', zoom)
        },
        onZoomEnd(zoom) {
        console.log('zoom-end', zoom)
        },
        setPageFromHash() {
        const n = parseInt(window.location.hash.slice(1), 10)
        if (isFinite(n)) this.pageNum = n
        },
    },
    mounted() {
        window.addEventListener('keydown', (ev) => {
        const flipbook = this.$refs.flipbook
        if (!flipbook) return
        if (ev.keyCode == 37 && flipbook.canFlipLeft) flipbook.flipLeft()
        if (ev.keyCode == 39 && flipbook.canFlipRight) flipbook.flipRight()
        })

        // Simulate asynchronous pages initialization
        setTimeout(() => {
        this.pages = [
            null,
            require('@/assets/images/1.jpg'),
            require('@/assets/images/2.jpg'),
            require('@/assets/images/3.jpg'),
            require('@/assets/images/4.jpg'),
            require('@/assets/images/5.jpg'),
            require('@/assets/images/6.jpg'),
        ]
        this.pagesHiRes = [
            null,
            require('@/assets/images-large/1.jpg'),
            require('@/assets/images-large/2.jpg'),
            require('@/assets/images-large/3.jpg'),
            require('@/assets/images-large/4.jpg'),
            require('@/assets/images-large/5.jpg'),
            require('@/assets/images-large/6.jpg'),
        ]
        }, 1)

        window.addEventListener('hashchange', this.setPageFromHash)
        this.setPageFromHash()
    },
}
</script>

<style lang="scss" scoped>
.flipbook {
    display: inline-block;
    width: 90vw;
    height: 90vh;
    vertical-align: middle;
}
.action-bar {
    margin-bottom: 10px;
    text-align: center;
    color: #fff;
    button {
        width: 20px;
        height: 20px;
        background-color: #000;
        border-radius: 5px;
        margin: 0 5px;
    }
}
</style>