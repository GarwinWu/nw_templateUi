<!-- 无数据暂位图 -->
  <!--   用法  <null-data class="bg-f5">
    <p slot='nullText'>123</p>
  </null-data>-->
<template>
  <div class="nullData column al-c ju-c ">
    <slot name="nullImg"><img :src="nullImg" alt="" /></slot>
    <p>{{nullText}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nullImg: require('@/assets/images/nullData.png'), //默认暂位图
      };
    },
    props: {
      nullText: {
        type: String,
        default: '暂无数据'
      }
    },
    name: 'null-data',
    methods: {}
  };
</script>
<style lang="less" scoped>
  .nullData {
    // height: 100%;
    text-align: center;
    color: #b5b5b5;
    font-size: 15px;

    img {
      width: 150px;
      margin: 0 auto;
      margin-bottom: 10px;
    }
  }
</style>
