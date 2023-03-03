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
        <v-btn class="mx-2 btn left" :disabled="!flipbook.canFlipLeft" fab small @click="flipbook.flipLeft"><v-icon>mdi-chevron-left</v-icon></v-btn>
        <v-btn class="mx-2 btn plus" :disabled="!flipbook.canZoomIn" fab small @click="flipbook.zoomIn"><v-icon>mdi-plus</v-icon></v-btn>
        <span class="page-num">
          Page {{ flipbook.page }} of {{ flipbook.numPages }}
        </span>
        <v-btn class="mx-2 btn plus" :disabled="!flipbook.canZoomOut" fab small @click="flipbook.zoomOut"><v-icon>mdi-minus</v-icon></v-btn>
        <v-btn class="mx-2 btn plus" :disabled="!flipbook.canFlipRight" fab small @click="flipbook.flipRight"><v-icon>mdi-chevron-right</v-icon></v-btn>
      </div>
    </Flipbook>
</template>

<script>
import Flipbook from 'flipbook-vue/vue2' // 현재 vue2 에 맞춰서 작업
// import Flipbook from 'flipbook-vue' // vue3 버전
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
    vertical-align: middle;
    &::v-deep {
        .viewport {
            width: 90vw !important;
            height: calc(100vh - 50px - 40px) !important;
        }
        .bounding-box {
            box-shadow: 0 0 20px #000;
        }
    }
}
.action-bar {
    margin-bottom: 30px;
    text-align: center;
    color: #fff;
    span {
        padding: 0 20px;
    }
}
</style>