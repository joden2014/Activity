<template>
  <div class="footer">
    <a v-for="nav in IData.Items" :key="nav.IID" v-bind:style="{width:nav.ImgWidth+'%'}">
        <img :src="nav.ContentObj.ImgUrl1">
   </a>
  </div>
</template>

<script>
  import jump from '../../assets/jump.js'
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
		img{
			height:100%;
		}
	}
</style>
