<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import 'assets/style.less';

body {
  background-color: #e62c35;
}
#app{
	-webkit-overflow-scrolling: touch;
	overflow: auto;
	box-sizing: border-box;
}
  .vux-header-right{
    position:static;
  }
  .lazy-img-fadein[lazy=loading] {
    width: 40px!important;
    height:38px!important;
    margin: auto;
  }
</style>
