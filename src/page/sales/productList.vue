<!-- 商品组组件 -->
<template>
<div>
	<div class="productList" v-if="IData.ContentType === 3 || IData.ContentType === '3'">
		<swiper :options="swiperOption" class="productSwiper" v-if="IData.ContentObj.DataFiltering === 0" ref="mySwiper">
	        <swiper-slide v-for="product in IData.ContentObj.ProductItems" class="item" :key="product.IID">
	        		<div class="ProductImg" @click="operation(2,{'UserProductID': product.UserProductId, 'ContentType': 2})">
		        		<i 
		    			class="icon" 
		    			v-if="product.IconUrl" 
		    			v-bind:class="{
		    				iconLT: product.IconPosition === '1',
	          				iconRT: product.IconPosition === '2',
	          				iconLB: product.IconPosition === '3',
	          				iconRB: product.IconPosition === '4',
	          				iconC: product.IconPosition === '5'
	          				}">
	          			<img :src="product.IconUrl" v-bind:style="{opacity:product.IconTrsp}">
	          			</i>
	          			<img v-lazy="product.ProductImages.split(',')[0]" />
	        		</div>
	        		<div class="ProductNum" v-if="product.States==0">
	        			<span v-if="product.LimitMin>0">起购:{{product.LimitMin}}</span>
	        			<span v-if="product.LimitMax>0">限购:{{product.LimitMax}}</span>
	        			<span>库存:{{product.CurrentAmount}}</span>
	        		</div>
	        		<div class="ProductNum" v-else style="background:#a9a7a7;">
	        			<span v-if="product.LimitMin>0">起购:{{product.LimitMin}}</span>
	        			<span v-if="product.LimitMax>0">限购:{{product.LimitMax}}</span>
	        			<span>库存:{{product.CurrentAmount}}</span>
	        		</div>
	        		<div class="ProductTitle" @click="operation(2,{'UserProductID':product.UserProductId, 'ContentType': 2})">
	        			<span>{{product.ProductName}}</span>
	        		</div>
	        		<div class="ProductPrice">
	        			<span>￥<em>{{product.ListPriceStr}}</em><i v-if="product.CouponType > 0 && product.ListPriceStr!=='会员可见'" class="coupons" @click="operation(4,{'CouponID': product.CouponID, 'CouponType': product.CouponType})">券</i></span>
	        		</div>
	        		<div class="ProductBtn">
	        			<button @click="operation(5,{'UserProductId':product.ProductType==1?product.PromotionId:product.UserProductId, 'ProductType': product.ProductType})" v-if="product.States==0">马上抢</button>

	        			<button v-else style="background:#a9a7a7;">已售罄</button>
	        		</div>
	        </swiper-slide>
	        <div class="swiper-scrollbar" slot="scrollbar"></div>
	    </swiper>

	    <div class="productCon flex" v-else-if="IData.ContentObj.DataFiltering === 2">
	        <div class="item flex2" v-for="product in IData.ContentObj.ProductItems" :key="product.IID">
					<div class="ProductImg" @click="operation(2,{'UserProductID':product.UserProductId, 'ContentType': 2})">
						<i 
		    			class="icon" 
		    			v-if="product.IconUrl" 
		    			v-bind:class="{
		    				iconLT: product.IconPosition === '1',
	          				iconRT: product.IconPosition === '2',
	          				iconLB: product.IconPosition === '3',
	          				iconRB: product.IconPosition === '4',
	          				iconC: product.IconPosition === '5'
	          				}">
	          			<img :src="product.IconUrl" v-bind:style="{opacity:product.IconTrsp}">
	          			</i>
	        			<img v-lazy="product.ProductImages.split(',')[0]" />
	        		</div>
	        		<div class="ProductNum" v-if="product.States==0">
	        			<span v-if="product.LimitMin>0">起购:{{product.LimitMin}}</span>
	        			<span v-if="product.LimitMax>0">限购:{{product.LimitMax}}</span>
	        			<span>库存:{{product.CurrentAmount}}</span>
	        		</div>
	        		<div class="ProductNum" v-else style="background:#a9a7a7;">
	        			<span v-if="product.LimitMin>0">起购:{{product.LimitMin}}</span>
	        			<span v-if="product.LimitMax>0">限购:{{product.LimitMax}}</span>
	        			<span>库存:{{product.CurrentAmount}}</span>
	        		</div>
	        		<div class="ProductTitle" @click="operation(2,{'UserProductID':product.UserProductId, 'ContentType': 2})">
	        			<span>{{product.ProductName}}</span>
	        		</div>
	        		<div class="ProductPrice">
	        			<span>￥<em>{{product.ListPriceStr}}</em><i v-if="product.CouponType > 0 && product.ListPriceStr!=='会员可见'" class="coupons" @click="operation(4,{CouponID: product.CouponID,CouponType: product.CouponType})">券</i></span>
	        		</div>
	        		<div class="ProductBtn">

	        			<button @click="operation(5,{'UserProductId':product.ProductType==1?product.PromotionId:product.UserProductId, 'ProductType': product.ProductType})" v-if="product.States==0">马上抢</button>

	        			<button v-else style="background:#a9a7a7;">已售罄</button>

	        		</div>
	        </div>
        </div>
	</div>
</div>	
</template>

<script>
  import { XImg } from 'vux'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import qplIcon from '../../assets/base46ForImg.js'
  import jump from '../../assets/jump.js'
  export default {
    components: {
      swiper,
      swiperSlide,
      XImg
    },
    data () {
      return {
        swiperOption: {
          scrollbar: '.swiper-scrollbar',
          scrollbarHide: true,
          slidesPerView: 'auto',
          centeredSlides: false,
          spaceBetween: 5,
          grabCursor: true,
          notNextTick: true
        },
        qplIcon: qplIcon
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      operation: (type, value) => {
        jump.to(type, value)
      },
      success (src, ele) {
        console.log('success load', src)
      },
      error (src, ele, msg) {
        console.log('error load', msg, src)
      }
    },
    mounted () {
      // console.log(this.IData)
    },
    props: ['IData']
  }
</script>

<style lang="less" scoped>
.coupons{
  background:rgba(248,170,51,0.35);
  border:1px solid #fc6b3e;
  margin-left:0.2rem;
}
	.productList{
		margin: 0.3rem 0;
		.productSwiper{
			padding:0 0.14rem;
		}
	}
	.flex{
		display:flex;
		flex-wrap:wrap;
		width:100%;
		height:100%;
		.flex2{
		width:48%;
		
		&:nth-child(odd){
			margin: 0.2rem 0.10rem 0 0.2rem;
		}
		&:nth-child(even){
			margin: 0.2rem 0.2rem 0 0.10rem;
		}
	}
	}
	
	.item{
		width: 6.2298rem;
		height:auto;
		border-radius: 0.25rem;
		background: #fff;
		font-size: 0.5rem;
		position: relative;
		.ProductImg{
			text-align: center;
			padding:0.3rem 0;
			position:relative;
			i{
				position:absolute;
				width:1.749rem;
				height:1.479rem;
				img{
                   width:100%;
                   height:100%;
				}
			}
			.iconLT{
				top: 0;
				left:0;
			}
			.iconRT{
				top: 0;
				right:0;
			}
			.iconLB{
				bottom: 0;
				left:0;
			}
			.iconRB{
				bottom: 0;
				right:0;
			}
			.iconC{
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
			}
			img{
				width:3.754rem;
				height:3.754rem;
				display:inline-block;
			}
		}

		.ProductTitle{
			overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-line-clamp: 2;
		    -webkit-box-orient: vertical;
		    height: 30px;
		    line-height: 15px;
		    word-break:break-all;
		    word-wrap:break-word;
		    margin:0.3rem 0;
		    padding: 0 0.3rem;
		}
		.ProductNum{
			width:100%;
			height:1rem;
			background:rgba(155,183,210,0.83);
			span{
				color:#fff;
				line-height:1rem;
				padding:0 0.2rem;
			}
		}
		.ProductBtn{
			text-align:center;
			padding:0.3rem 0;
			button{
				width:80%;
				height:1.5rem; 
				background:#cc1b23;
				outline: none;
				border:none;
				border-radius:0.3rem;
				color: #fff;
			}
		}
		.ProductPrice{
			padding: 0 0.3rem;
			span{
				color:#cc1b23;
				em{
					font-size:0.7rem;
					font-style: normal;
				}
			}
		}
	}

</style>
