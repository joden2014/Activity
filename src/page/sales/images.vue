<template>
	<div class="ImgsList">
		<div v-for="Img in ImgData" :key="Img.IID" class="images" v-if="Img.ContentObj" v-bind:style="{width:Img.ImgWidth+'%',height:GetImgUrl(Img.ContentObj.ImgUrl1,ImgData.length).height+'px'}" @click="operation(Img.ContentObj.OperationType,Img.ContentObj.ContentValue)">
            <img v-if="Img.ContentObj.ImgUrl1" v-lazy="GetImgUrl(Img.ContentObj.ImgUrl1,ImgData.length).url" class="lazy-img-fadein"/>
        </div>
	</div>
</template>

<script>
  import { XImg } from 'vux'
  import jump from 'assets/jump.js'
  import tools from 'assets/tools'
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
        return tools.ImagesUrl(url, col, 2)
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
  .images{
     display: -webkit-box;    /*容器为旧伸缩盒*/
    -webkit-box-align: center; /*设置旧伸缩盒对齐方式*/
    display: flex;            /*容器为伸缩盒*/
    align-items: center;  /*纵轴方向上的对齐方式设置为居中*/
  }
}
img{
  width:100%;
  height:100%;
}
</style>
