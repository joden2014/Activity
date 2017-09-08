<template>
    <div v-if="!show" v-bind:class="{hasBottom:hasBottom}">
      <x-header :left-options="{backText: ''}" style="background-color:#CC1B23;" v-if="IsH5">{{res.Data.PromotionName}}<a slot="right" href="http://m.qipeilong.net/ShoppingCart/Index?p=1" id="shopCartNum"></a></x-header>
      <div v-for="item in res.Data.StructItems" class="floor" :class="'floor'+item.IID" :key="item.IID" ref="myFloor">


        <!-- 轮播类型 -->
          <swiperHtml :IData="item.Items" v-if="item.ContentType==='1'"></swiperHtml>

        <!-- 图片类型 -->
          <Images :ImgData="item.Items" v-else-if="item.ContentType==='2'"></Images>

        <!-- 商品列表类型 -->
          <productList :IData="item.Items[0]" v-else-if="item.ContentType==='3' || item.ContentType===3"></productList>

        <!-- 商品单品类型 -->
          <product :IData="item" v-else-if="item.ContentType==='4'"></product>

        <!-- 锚点导航 -->
          <swiperNav :IData="item" style="background:#fff" v-else-if="item.ContentType==='6'" ref="nav"></swiperNav>

        <!-- tab切换 -->
          <Tab :IData="item" v-else-if="item.ContentType==='7'" ref="tab"></Tab>

        <!-- 底部导航 -->
          <bottomNav :IData="item" v-else-if="item.ContentType==='5'"></bottomNav>

        <!-- 引用模板 -->
        <div v-else-if="item.ContentType==='8'" class="MyModule">
          <div class="ModuleCon" v-for="(modules,index) in moduleLsit">
            <div v-for="modulesItem in modules.Data" class="Module" :class="'Module'+modulesItem.IID" :key="modulesItem.IID" ref="myModule">
                <!-- 轮播类型 -->
                  <swiperHtml :IData="modulesItem.Items" v-if="modulesItem.ContentType==='1'"></swiperHtml>

                <!-- 图片类型 -->
                  <Images :ImgData="modulesItem.Items" v-else-if="modulesItem.ContentType==='2'"></Images>

                <!-- 商品列表类型 -->
                  <productList :IData="modulesItem.Items[0]" v-else-if="modulesItem.ContentType==='3' || modulesItem.ContentType===3"></productList>

                <!-- 商品单品类型 -->
                  <product :IData="modulesItem" v-else-if="modulesItem.ContentType==='4'"></product>

                <!-- 锚点导航 -->
                  <swiperNav :IData="modulesItem" v-else-if="modulesItem.ContentType==='6'" ref="nav"></swiperNav>

                <!-- tab切换 -->
                  <Tab :IData="modulesItem" v-else-if="modulesItem.ContentType==='7'" ref="tab"></Tab>
            </div>
          </div>

        </div>

      </div>
    </div>
</template>

<script>
import header from 'components/header'
import { Group, Cell, XHeader } from 'vux'
import swiperHtml from './swiper.vue'
import Images from './images.vue'
import productList from './productList.vue'
import product from './product.vue'
import swiperNav from './swiperNav.vue'
import bottomNav from './bottomNav.vue'
import Tab from './Tab.vue'
import tools from 'assets/tools'
import { SetAppData, browser, StringToJson } from '../../assets/App'
import { SetApp } from 'assets/userInfo'
import api from 'assets/api'
export default {
  data: () => {
    return {
      res: { },
      show: true,
      url: 'http://m.qipeilong.net/Promotion/GetPromotionModelInfoByID',
      hasBottom: false,
      moduleLsit: [],
      IsH5: false
    }
  },
  components: {
    Group,
    Cell,
    swiperHtml,
    MyHeader: header,
    Images,
    productList,
    product,
    swiperNav,
    bottomNav,
    Tab,
    XHeader
  },
  mounted () {
    let that = this
    let parms = { id: this.$route.query.id, ver: '1.0', platform: 1 }
    if (browser.versions().IosApp || browser.versions().AndroidApp) {
      SetAppData({
        title: '获取活动框架',
        dataObj: parms,
        api: api.GetPromotionModelInfoByID(),
        noDomain: false,
        callBack: 'CallBackData'
      })

      window.CallBackData = (res) => {
        let promise = new Promise((resolve, reject) => {
          resolve(res)
        })
        promise.then((res) => {
          let data = StringToJson(res)
          if (data.Success) {
            that.DrawModule(data)
            SetApp(data.Data.PromotionName)
            tools.ResetBodyStyle(data.Data.BgImgUrl, data.Data.BgColor)
          }
        }).catch((e) => {
          console.log(e)
        })
      }
      return false
    }
    this.$ajax({
      url: api.GetPromotionModelInfoByID(),
      data: parms,
      method: 'POST',
      load: true,
      showMsg: true
    }).then((value) => {
      if (value.Success) {
        that.IsH5 = true
        that.DrawModule(value)
        tools.ResetBodyStyle(value.Data.BgImgUrl, value.Data.BgColor)
      }
    })
  },
  methods: {
    GetModule (id) {
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
            that.moduleLsit.push(res)
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
        if (value.Success) {
          that.moduleLsit.push(value)
        }
      })
    },
    DrawModule (value) {
      let that = this
      if (value.Success) {
        document.title = value.Data.PromotionName
        that.res = value
        that.show = false
        for (let i = 0; i < value.Data.StructItems.length; i++) {
          if (value.Data.StructItems[i].ContentType === '5') {
            that.hasBottom = true
          } else if (value.Data.StructItems[i].ContentType === '8') {
            that.GetModule(value.Data.StructItems[i].Items[0].ContentData)
          }
        }
      } else {
        that.$vux.alert.show({
          title: '请求错误',
          content: value.ErrorMsg,
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding now')
          }
        })
      }
    }
  },
  updated () {
    tools.Success({
      'success': true,
      'text': ''
    })
  }
}
</script>

<style lang="less" scoped>
  .item{
    width: 100%;
  }
  .floor{
    overflow: hidden;
  }
  .hasBottom{
    margin-bottom: 60px;
  }
  .fixed{
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    z-index: 1990;
  }
</style>
