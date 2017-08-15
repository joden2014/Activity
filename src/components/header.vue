<template>
	<div>
		<header :style="{background:bgcolor}">
			<div>
				<a class="left iconfont icon-fanhui" @click="back"></a>
				<span id="title">{{MyTitle}}</span>
			</div>
		</header>
	</div>
</template>
<script type="text/javascript">
export default{
  data () {
    return {
    }
  },
  methods: {
    back () {
      if (this.Back === 1) {
        var url = window.location.href.indexOf('net') !== -1 ? 'http://m.qipeilong.net/My/MyIndex' : 'https://m.qipe=long.cn/My/MyIndex'
        window.location.href = url
      } else {
        this.$router.go(-1)
      }
    }
  },
  props: ['MyTitle', 'bgcolor', 'Back']
}
</script>

<style lang="less" scoped>
	header{
		position:static;
		width: 100%;
		height:1.88rem;
		background:#CC1B23;
		color:#fff;
		line-height:1.88rem;
		text-align:center;
		font-size: 0.7rem;
		top: 0;
		z-index: 10;
		a.left{
			position:absolute;
			left:0;
			color:#fff;
			font-size:1.2rem;
		}
	}
</style>
