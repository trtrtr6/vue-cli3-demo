<template>
  <div class="water-box">
    <water class="water-wrapper" 
      :rangeValue='rangeValue' 
      :colorStart='colorInfo.colorStart' 
      :colorEnd='colorInfo.colorEnd' 
      :textColor='colorInfo.textColor'
      :textStrokeColor='colorInfo.textStrokeColor'
      :duration='3000' ></water>
  </div>
</template>
<script>
import water from '@/components/water'
export default {
  data(){
    return {
      colorInfo:{
        colorStart: 'rgba(108,109,210,1)',
        colorEnd: 'rgba(75,81,168,0.2)',
        textColor: '#FE6400',
        textStrokeColor: 'rgba(242,78,29,0.5)'
      },
      rangeValue: -1
    }
  },
  components:{
    water
  },
  mounted(){
    this.rangeValue = 678
  }
}
</script>
<style lang="less" scoped>
.water-box{
  background: blue;
  .water-wrapper{
    width:200px;
    height:200px;
  }
}
</style>
