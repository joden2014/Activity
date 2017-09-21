<template>
	<div>
    <div class="stickyH" :class="'tab'+IData.Items[0].IID">
      <sticky ref="sticky" :offset="0" :check-sticky-support="false">
  		  <div class="tab">
          <swiper :options="swiperOption" class="swiperNav" ref="myTabSwiper">
    	      <swiper-slide v-for="(item,index) in IData.Items[0].ContentObj.ContentValue" :key="item.AnchorID" class="itemTab" v-bind:class="{flex4:IData.Items[0].ContentObj.ContentValue.length===4,flex3:IData.Items[0].ContentObj.ContentValue.length===3,flex2:IData.Items[0].ContentObj.ContentValue.length===2,flex1:IData.Items[0].ContentObj.ContentValue.length===1,active:active===index}" v-bind:style="{backgroundColor:active===index?IData.Items[0].ContentObj.BgColor1:IData.Items[0].ContentObj.BgColor2,color:active===index?IData.Items[0].ContentObj.FontColor1:IData.Items[0].ContentObj.FontColor2 }">
                <span @click="onItemClick(item,index,'.tab'+IData.Items[0].IID)">{{item.Title}}</span>
            </swiper-slide>
          </swiper>
  	    </div>
      </sticky>
    </div>
	    <div class="tabcontent">
        <p style="text-align:center;" v-show="!IsLoding">
          <inline-loading></inline-loading>
        </p>
        <div v-for="(dataList,index) in res" class="item">
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
import { InlineLoading, Sticky } from 'vux'
import api from 'assets/api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { SetAppData, browser, StringToJson } from 'assets/App'
export default {
  components: {
    swiper,
    swiperSlide,
    swiperHtml,
    Images,
    productList,
    product,
    swiperNav,
    bottomNav,
    subTab,
    InlineLoading,
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
        }
      },
      res: [],
      active: 0,
      IsLoding: true,
      hasList: false
    }
  },
  computed: {
    swiper () {
      return this.$refs.myTabSwiper.swiper
    }
  },
  methods: {
    onItemClick (item, index, selector) {
      this.active = index
      this.IsLoding = false
      if (item.GroupType === 0) {
        this.GetModule(item.AnchorID, index, selector)
      } else {
        this.GetProductList(item.AnchorID, index, selector)
      }
    },
    scrollPage (selector) {
      console.log(selector)
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
    GetProductList (id, index, selector) {
      let that = this
      that.res = []
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
            if (selector) {
              that.scrollPage(selector)
            }
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
        if (selector) {
          that.scrollPage(selector)
        }
      })
    },
    GetModule (id, index, selector) {
      let that = this
      that.res = []
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
            if (selector) {
              that.scrollPage(selector)
            }
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
        if (selector) {
          that.scrollPage(selector)
        }
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
.stickyH{
  height:2rem;
}
.itemTab{
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
      padding:0 15px;
      span{
        width:100%;
        height:100%;
        display:inline-block;
        text-align:center;
      }
  }
.tab{
	height:2rem;
	line-height:2rem;
	display:flex;
	background: #fff;
  overflow-x: auto;
	// span{
	// 	display:inline-block;
	// 	font-size: 0.6rem;
	// 	text-align: center;
 //    white-space: nowrap;
 //    padding: 0 10px;
 //    min-width: 3rem;
 //    width:auto;
	// }
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
