<template>
	<div>
		  <div class="tab">
	      <span v-for="(item,index) in IData.Items[0].ContentObj.ContentValue" @click="onItemClick(item,index)" :key="item.AnchorID" v-bind:class="{flex4:IData.Items[0].ContentObj.ContentValue.length===4,flex3:IData.Items[0].ContentObj.ContentValue.length===3,flex2:IData.Items[0].ContentObj.ContentValue.length===2,flex1:IData.Items[0].ContentObj.ContentValue.length===1,active:active===index}" v-bind:style="{backgroundColor:active===index?IData.Items[0].ContentObj.BgColor1:IData.Items[0].ContentObj.BgColor2,color:active===index?IData.Items[0].ContentObj.FontColor1:IData.Items[0].ContentObj.FontColor2 }">{{item.Title}}</span>
	    </div>
	    <div class="tabcontent">
        <inline-loading v-show="!IsLoding"></inline-loading>
        <div v-for="(dataList,index) in res" class="item" v-show="active===index">
          <div v-for="item in dataList.Data" class="TabCon" :class="'floor'+item.IID" :key="item.IID" ref="myTabCon" v-if="dataList.Data.ContentType !== 3">
            <!-- 轮播类型 -->
              <swiperHtml :IData="item.Items" v-if="item.ContentType==='1'"></swiperHtml>

            <!-- 图片类型 -->
              <Images :ImgData="item.Items" v-else-if="item.ContentType==='2'"></Images>

            <!-- 商品单品类型 -->
              <product :IData="item" v-else-if="item.ContentType==='4'"></product>

            <!-- 锚点导航 -->
              <swiperNav :IData="item" style="background:#000" v-else-if="item.ContentType==='6'" ref="nav"></swiperNav>


            <!-- tab切换 -->
              <subTab :IData="item" v-else-if="item.ContentType==='7'" ref="subTab"></subTab>

            <!-- 底部导航 -->
              <bottomNav :IData="item" v-else-if="item.ContentType==='5'"></bottomNav>

            <!-- 引用模板 -->
            <div v-else-if="item.ContentType==='8'">
              引用模板
            </div>

            <!-- 商品列表类型 -->

            <productList :IData="item.Items[0]"  v-else-if="item.ContentType==='3' || item.ContentType===3"></productList>

          </div>
          <!-- 商品列表类型 -->
          <productList :IData="dataList.Data" v-if="dataList.Data.ContentType === 3 || dataList.Data.ContentType === '3'"></productList>
        </div>
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
import subTab from './subTab.vue'
import { InlineLoading } from 'vux'
import api from '../../assets/api'
import { SetAppData, browser, StringToJson } from '../../assets/App'
export default {
  components: {
    swiperHtml,
    Images,
    productList,
    product,
    swiperNav,
    bottomNav,
    subTab,
    InlineLoading
  },
  data () {
    return {
      res: [],
      active: 0,
      IsLoding: true,
      hasList: false
    }
  },
  methods: {
    onItemClick (item, index) {
      this.active = index
      this.IsLoding = false
      if (!this.res[index]) {
        if (item.GroupType === 0) {
          this.GetModule(item.AnchorID, index)
        } else {
          this.GetProductList(item.AnchorID, index)
        }
      } else {
        this.IsLoding = true
      }
    },
    GetProductList (id, index) {
      let that = this
      let parms = { id: id, ver: '1.0' }
      if (browser.versions().IosApp || browser.versions().AndroidApp) {
        SetAppData({
          title: '获取商品列表',
          dataObj: parms,
          api: api.GetProductList(),
          noDomain: false,
          callBack: 'CallBackGetProductListData'
        })
        window.CallBackGetProductListData = (res) => {
          let promise = new Promise((resolve, reject) => {
            resolve(res)
          })
          promise.then((res) => {
            StringToJson(res).index = index
            that.res.push(StringToJson(res))
            that.hasList = true
            that.IsLoding = true
          }).catch((e) => {
            console.log(e)
          })
        }
        return false
      }
      this.$ajax({
        url: api.GetProductList(),
        data: parms,
        method: 'POST',
        load: false,
        showMsg: true
      }).then((value) => {
        value.index = index
        that.res.push(value)
        that.hasList = true
        that.IsLoding = true
      })
    },
    GetModule (id, index) {
      let that = this
      let parms = { id: id, ver: '1.0', platform: 1 }
      if (browser.versions().IosApp || browser.versions().AndroidApp) {
        SetAppData({
          title: '获取模板数据',
          dataObj: parms,
          api: api.GetModule(),
          noDomain: false,
          callBack: 'CallBackGetModuleData'
        })
        window.CallBackGetModuleData = (res) => {
          let promise = new Promise((resolve, reject) => {
            resolve(res)
          })
          promise.then((res) => {
            StringToJson(res).index = index
            that.res.push(StringToJson(res))
            that.IsLoding = true
          }).catch((e) => {
            console.log(e)
          })
        }
        return false
      }
      this.$ajax({
        url: api.GetModule(),
        data: parms,
        method: 'POST',
        load: false,
        showMsg: true
      }).then((value) => {
        value.index = index
        that.res.push(value)
        that.IsLoding = true
      })
    }
  },
  mounted () {
    let id = this.IData.Items[0].ContentObj.ContentValue[0].AnchorID
    let type = this.IData.Items[0].ContentObj.ContentValue[0].GroupType
    if (type === 0) {
      this.GetModule(id, 0)
    } else {
      this.GetProductList(id, 0)
    }
  },
  props: ['IData']
}
</script>

<style lang="less" scoped>
.tab{
	height:2rem;
	line-height:2rem;
	display:flex;
	justify-content:space-between;
	background: #fff;
  overflow-x: auto;
	span{
		display:inline-block;
		font-size: 0.6rem;
		text-align: center;
    white-space: nowrap;
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
