<template>
	<div class="ImgsList">
		<div v-for="Img in ImgData" :key="Img.IID" v-bind:style="{width:Img.ImgWidth+'%'}" @click="operation(Img.ContentObj.OperationType,Img.ContentObj.ContentValue)">
            <x-img :src="Img.ContentObj.ImgUrl1" :webp-src="`${Img.ContentObj.ImgUrl1}`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" container="#app"></x-img>
        </div>
	</div>
</template>

<script>
  import { XImg } from 'vux'
  import jump from '../../assets/jump.js'
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
