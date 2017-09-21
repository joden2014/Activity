<template>
  <div class="footer">
    <a v-for="nav in IData.Items" class="images" :key="nav.IID" v-bind:style="{ width:nav.ImgWidth+'%',height:GetImgUrl(nav.ContentObj.ImgUrl1,IData.Items.length).height+'px' }" @click="operation(nav.ContentObj.OperationType,nav.ContentObj.ContentValue)">
        <img v-if="nav.ContentObj.ImgUrl1" v-lazy="GetImgUrl(nav.ContentObj.ImgUrl1,IData.Items.length).url" class="lazy-img-fadein" />
   </a>
  </div>
</template>

<script>
  import jump from 'assets/jump.js'
  import tools from 'assets/tools'
  export default {
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
      GetImgUrl: (url, col) => {
        return tools.ImagesUrl(url, col, 1)
      }
    },
    mounted () {
    },
    props: ['IData']
  }
</script>

<style lang="less" scoped>
	.footer{
		position: fixed;
		bottom:0;
		display:flex;
		display:box;
		left: 0;
		height:50px;
		width:100%;
		z-index: 666;
    overflow: hidden;
    a{
      display:block;
      height:100%;
      width:100%;
    }
		img{
			height:100%;
		}
	}
</style>
