<template>
  <div class="page-routers row center-xs">
    <div class="col-xs-6">
      <ul>
        <template v-for="(item, index) in pages">
          <router-link v-if="item.name!=='home'" :key="index" tag="li" :to="item.path">
            <a>{{item.name}}</a>
          </router-link>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pages: [],
      test: ''
    }
  },
  created () {
    this.pages = this.$router.options.routes
    console.log(this.pages)
  }
}
</script>
<style lang="less" scoped>
  .page-routers{
    padding:40px;
    text-align: left;
    text-decoration:underline;
    li{
      font-size: 16px;
      a{
        color:blue;
      }
    }
  }
</style>
