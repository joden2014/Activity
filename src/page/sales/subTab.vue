<template>
	<div>
		  <div class="tab">
	      <span v-for="(item,index) in IData.Items[0].ContentObj.ContentValue" @click="onItemClick(item,index)" :key="item.AnchorID" v-bind:class="{flex4:IData.Items[0].ContentObj.ContentValue.length===4,flex3:IData.Items[0].ContentObj.ContentValue.length===3,flex2:IData.Items[0].ContentObj.ContentValue.length===2,flex1:IData.Items[0].ContentObj.ContentValue.length===1,active:active===index}" v-bind:style="{backgroundColor:active===index?IData.Items[0].ContentObj.BgColor1:IData.Items[0].ContentObj.BgColor2,color:active===index?IData.Items[0].ContentObj.FontColor1:IData.Items[0].ContentObj.FontColor2 }">{{item.Title}}</span>
	    </div>
	    <div class="tabcontent">
        <load-more :tip="tips" :show-loading="IsLoding" v-show="!IsLoding"></load-more>
        <div v-for="item in res.Data" class="TabCon" :class="'TabCon'+item.IID" :key="item.IID" ref="myTabCon">
          <!-- 轮播类型 -->
  
            <swiperHtml :IData="item.Items" v-if="item.ContentType==='1'"></swiperHtml>

          <!-- 图片类型 -->
            <Images :ImgData="item.Items" v-else-if="item.ContentType==='2'"></Images>

          <!-- 商品单品类型 -->
            <product :IData="item" v-else-if="item.ContentType==='4'"></product>

          <!-- 锚点导航 -->
            <swiperNav :IData="item" style="background:#000" v-else-if="item.ContentType==='6'" ref="nav"></swiperNav>

          <!-- 底部导航 -->
            <bottomNav :IData="item" v-else-if="item.ContentType==='5'"></bottomNav>

          <!-- 引用模板 -->
          <div v-else-if="item.ContentType==='8'">
            引用模板
          </div>

          <!-- 商品列表类型 -->
            <productList :IData="item.Items[0]" v-else-if="item.ContentType==='3'"></productList>
        </div>
        <!-- 商品列表类型 -->
        <productList :IData="list" class="product" v-if="hasList"></productList>
        
	    </div>
    </div>
</template>

<script>
import swiperHtml from './swiper.vue'
import Images from './images.vue'
import productList from './productList.vue'
import product from './product.vue'
import swiperNav from './swiperNav.vue'
import bottomNav from './bottomNav.vue'
import { LoadMore } from 'vux'
export default {
  components: {
    swiperHtml,
    Images,
    productList,
    product,
    swiperNav,
    bottomNav,
    LoadMore
  },
  data () {
    return {
      res: { },
      active: 0,
      IsLoding: true,
      tips: '正在加载中...',
      list: {},
      hasList: false
    }
  },
  methods: {
    onItemClick (item, index) {
      this.active = index
      if (item.GroupType === 0) {
        this.GetModule(item.AnchorID)
      } else {
        this.GetProductList(item.AnchorID)
      }
    },
    GetProductList (id) {
      let that = this
      this.$ajax({
        url: 'http://m.qipeilong.net/Promotion/GetPromotionProductGroupByGroupID',
        data: { id: id, ver: '1.0', userId: 'b11dfe19ef4d4f60860dda673dfa7863' },
        method: 'POST',
        load: true,
        showMsg: true
      }).then((value) => {
        that.list = value.Data
        that.hasList = true
      })
    },
    GetModule (id) {
      let that = this
      this.$ajax({
        url: 'http://m.qipeilong.net/Promotion/GetPromotionStructModelListByPromotionID',
        data: { id: id, ver: '1.0', platform: 1, userId: 'b11dfe19ef4d4f60860dda673dfa7863' },
        method: 'POST',
        load: true,
        showMsg: true
      }).then((value) => {
        that.res = value
      })
    }
  },
  mounted () {
    let id = this.IData.Items[0].ContentObj.ContentValue[0].AnchorID
    let type = this.IData.Items[0].ContentObj.ContentValue[0].GroupType
    if (type === 0) {
      this.GetModule(id)
    } else {
      this.GetProductList(id)
    }
  },
  props: ['IData']
}
</script>

<style lang="less" scoped>
.tab{
	width: 100%;
	height:2rem;
	line-height:2rem;
	display:flex;
	justify-content:space-between;
	background: #fff;
	span{
		display:inline-block;
		font-size: 0.6rem;
		text-align: center;
	}
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
</style>
