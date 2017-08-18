<template>
  <div class="footer">
    <a v-for="nav in IData.Items" :key="nav.IID" v-bind:style="{ width:nav.ImgWidth+'%' }" @click="operation(nav.ContentObj.OperationType,nav.ContentObj.ContentValue)">
        <img v-lazy="GetImgUrl(nav.ContentObj.ImgUrl1,IData.Items.length)" />
   </a>
  </div>
</template>

<script>
  import jump from '../../assets/jump.js'
  import tools from '../../assets/tools'
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
        return tools.ImagesUrl(url, col, 0.5)
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
