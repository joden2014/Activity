<template>
  <div class="swiperBox" ref="swipers">
   <swiper :options="InitSwiper"  ref="mySwiper">
    <swiper-slide v-for="item in IData[0].ContentObj.ImgItems" :key="item.IID"  @click.native="operation(item.OperationType,item.ContentValue)">
    <span v-bind:style="{'height':GetImgUrl(item.ImgUrl1,IData[0].ContentObj).height+'px'}" class="images"><img :src="GetImgUrl(item.ImgUrl1,IData[0].ContentObj).url" class="lazy-img-fadein"></span>
    </swiper-slide>
   </swiper>
   <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import jump from 'assets/jump.js'
  import tools from 'assets/tools'
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: {
          notNextTick: true,
          paginationClickable: true,
          pagination: '.swiper-pagination',
          slidesPerColumn: 1,
          slidesPerView: 1
        }
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      },
      InitSwiper () {
        let type = this.IData[0].ContentObj.GroupStyle
        let col = 1
        let v = 1
        switch (type) {
          case 1: {
            col = 1
            break
          }
          case 2: {
            col = 2
            v = 2
            break
          }
          case 3: {
            col = 2
            v = 3
            break
          }
          case 4: {
            col = 3
            v = 2
            break
          }
          case 5: {
            col = 3
            v = 3
            break
          }
          case 6: {
            col = 1
            v = 2
            break
          }
          case 7: {
            col = 1
            v = 3
            break
          }
          default: {
            col = 1
          }
        }
        return {
          notNextTick: true,
          paginationClickable: true,
          pagination: '.swiper-pagination',
          slidesPerColumn: col,
          slidesPerView: v
        }
      }
    },
    methods: {
      operation: (type, value) => {
        jump.to(type, value)
      },
      GetImgUrl: (url, style) => {
        let type = style.GroupStyle
        let col = 1
        switch (type) {
          case 1: {
            col = 1
            break
          }
          case 2: {
            col = 2
            break
          }
          case 3: {
            col = 2
            break
          }
          case 4: {
            col = 2
            break
          }
          case 5: {
            col = 3
            break
          }
          case 6: {
            col = 2
            break
          }
          case 7: {
            col = 3
            break
          }
          default: {
            col = 1
          }
        }
        return tools.ImagesUrl(url, col, 1)
      }
    },
    mounted () {
    },
    props: ['IData']
  }
</script>

<style lang="less">
	.swiperBox{
		width:100%;
		position: relative;
		height:auto;
		overflow: hidden;
		.swiper-pagination{
			transform:translate(-50%,0);
			left: 50%;
			bottom:0;
      span{
        margin: 0 0.2rem;
      }
		}
    .swiper-container{
      height:100%;
      width:100%;
    }
	}
	img{
		width: 100%;
		display: block;
	}
  .images{
     display: -webkit-box;    /*容器为旧伸缩盒*/
    -webkit-box-align: center; /*设置旧伸缩盒对齐方式*/
    display: flex;            /*容器为伸缩盒*/
    align-items: center;  /*纵轴方向上的对齐方式设置为居中*/
  }
</style>
