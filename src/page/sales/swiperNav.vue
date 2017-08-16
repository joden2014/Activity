<template>
  <div style="height:44px;">
  <sticky ref="sticky" :offset="0" :check-sticky-support="false">
    <div class="swiperBox">
      <swiper :options="swiperOption" class="swiperNav" ref="mySwiper">
        <swiper-slide v-for="(nav,index) in IData.Items[0].ContentObj.ContentValue" class="item" v-bind:class="{flex4:IData.Items[0].ContentObj.ContentValue.length===4,flex3:IData.Items[0].ContentObj.ContentValue.length===3,flex2:IData.Items[0].ContentObj.ContentValue.length===2,flex1:IData.Items[0].ContentObj.ContentValue.length===1,active:active===index}" :key="nav.AnchorID" @click.native="goAnchor('.floor'+nav.AnchorID,index)" v-bind:style="{backgroundColor:active===index?IData.Items[0].ContentObj.BgColor1:IData.Items[0].ContentObj.BgColor2,color:active===index?IData.Items[0].ContentObj.FontColor1:IData.Items[0].ContentObj.FontColor2 }">
          <span>{{nav.Title}}</span>
        </swiper-slide>
      </swiper>
      <span v-show="IData.Items[0].ContentObj.ContentValue > 4"></span>
    </div>
    </sticky>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { Sticky } from 'vux'
  import jump from '../../assets/jump.js'
  export default {
    components: {
      swiper,
      swiperSlide,
      Sticky
    },
    data () {
      return {
        swiperOption: {
          freeMode: true,
          freeModeMomentumRatio: 0.5,
          slidesPerView: 'auto',
          notNextTick: true,
          slideToClickedSlide: true,
          centeredSlides: false,
          onSlideChangeStart: function () {
            alert(111)
          }
        },
        active: 0,
        top: 0
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      operation: (type, value) => {
        jump.to(type, value)
      },
      slideTo: (n, e) => {
        console.log(e)
      },
      goAnchor: (selector, index) => {
        this.active = index
        let jump = document.querySelectorAll(selector)
        let total = jump[0].offsetTop
        let distance = document.documentElement.scrollTop || document.body.scrollTop
        let step = total / 50
        if (total > distance) {
          smoothDown()
        } else {
          let newTotal = distance - total
          step = newTotal / 50
          smoothUp()
        }

        function smoothDown () {
          if (distance < total) {
            distance += step
            document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            window.pageYOffset = distance
            setTimeout(smoothDown, 10)
          } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
          }
        }

        function smoothUp () {
          if (distance > total) {
            distance -= step
            document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            window.pageYOffset = distance
            setTimeout(smoothUp, 10)
          } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
          }
        }
      },
      onScroll () {
        let scrolled = document.documentElement.scrollTop || document.body.scrollTop
        if (scrolled >= this.$parent.$refs.nav[0].offsetTop) {
          this.$parent.$refs.nav[0].firstElementChild.setAttribute('class', 'fixed')
        } else {
          this.$parent.$refs.nav[0].firstElementChild.removeAttribute('class')
        }
      }
    },
    mounted () {
      this.$nextTick(function () {
        // window.addEventListener('scroll', this.onScroll)
      })
    },
    props: ['IData']
  }
</script>

<style lang="less" scoped>
  .item{
    width:3rem;
    height:2rem;
    background: #fff;
    color: #666;
    overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break:break-all;
      word-wrap:break-word;
      font-size: 0.60rem;
      line-height:2rem;
  }
  .fixed{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1990;
    width:100%;
  }
  .flex1{
    width: 100%;
  }
  .flex2{
    width: 50%;
  }
  .flex3{
    width: 33.33%;
  }
  .flex4{
    width: 25%;
  }
  .swiperBox{
    display: flex;
    color:#fff;
    & > span{
      color:#666;
      font-size:0.6rem;
      line-height:2rem;
      width:10%;
      text-align:center;
      display:table;
      vertical-align: middle;
      background: #fff;
      height:100%;
      &:after{
        content:'';
        width:10px;
        height:10px;
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        -webkit-transform: translate(-50%, -50%) rotate(-45deg);
        transform: translate(-50%, -50%) rotate(-45deg);
        border-left: 1px solid #000;
        border-bottom: 1px solid #000;
        display:inline-block;
        vertical-align:middle;
      }
    }
  }
</style>
