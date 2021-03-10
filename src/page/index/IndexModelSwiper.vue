<template>
  <van-swipe class="my-swipe" indicator-color="#1989fa" lazy-render>
    <!--    https://vant-contrib.gitee.io/vant/v3/#/zh-CN/grid#grid-props-->
    <van-swipe-item>
      <van-grid :column-num="3" :icon-size="45" :border="false" :clickable="true">
        <van-grid-item icon="/static/image/index/icon_art_product.png" text="文字" to="/zxList"/>
        <van-grid-item icon="/static/image/index/icon_art_product.png" text="文字"/>
        <van-grid-item icon="/static/image/index/icon_art_product.png" text="文字"/>
      </van-grid>
      <van-grid :column-num="3" :icon-size="45" :border="false">
        <van-grid-item icon="/static/image/index/icon_art_product.png" text="文字"/>
        <van-grid-item icon="/static/image/index/icon_art_product.png" text="文字"/>
        <van-grid-item icon="/static/image/index/icon_art_product.png" text="文字"/>
      </van-grid>
    </van-swipe-item>
    <van-swipe-item>
      <van-grid :column-num="3" :icon-size="45" :border="false" :clickable="true">
        <van-grid-item icon="/static/image/index/icon_art_product.png" text="文字"/>
        <van-grid-item icon="/static/image/index/icon_art_product.png" text="文字"/>
        <van-grid-item icon="/static/image/index/icon_art_product.png" text="文字"/>
      </van-grid>
      <van-grid :column-num="3" :icon-size="45" :border="false">
        <van-grid-item icon="/static/image/index/icon_art_product.png" text="文字"/>
        <van-grid-item icon="/static/image/index/icon_art_product.png" text="文字"/>
        <van-grid-item icon="/static/image/index/icon_art_product.png" text="文字"/>
      </van-grid>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {}
</script>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
</style>
