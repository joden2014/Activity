<template>
	<div class="ImgsList">
		<div v-for="Img in ImgData" :key="Img.IID" v-bind:style="{width:Img.ImgWidth+'%'}" @click="operation(Img.ContentObj.OperationType,Img.ContentObj.ContentValue)">
            <x-img :src="GetImgUrl(Img.ContentObj.ImgUrl1,ImgData.length)" :webp-src="`${GetImgUrl(Img.ContentObj.ImgUrl1,ImgData.length)}`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" container="#app"></x-img>
        </div>
	</div>
</template>

<script>
  import { XImg } from 'vux'
  import jump from '../../assets/jump.js'
  import tools from '../../assets/tools'
  export default {
    components: {
      XImg
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
      operation: (type, value) => {
        jump.to(type, value)
      },
      success (src, ele) {
      },
      error (src, ele, msg) {
        console.log('error load', msg, src)
      },
      GetImgUrl: (url, col) => {
        return tools.ImagesUrl(url, col, 1)
      }
    },
    mounted () {
    },
    props: ['ImgData']
  }
</script>

<style lang="less" scoped>
.ImgsList{
	display:flex;
	display:-webkit-flex;
	display:box;
	display:flexbox;
	display:-webkit-box;
}
</style>
