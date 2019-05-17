<template>
  <div class="pk-wrapper">
    <div class="pk-box">
      <div class="box-main" :class="{'shake': !animationend}" ref="shakeBox" v-if="selected && selected != 0" @click="shake">
        <div class="row" :class="{'full-left': leftWidth=='100%', 'full-right': leftWidth=='0%'}">
          <div class="pk-item pk-left" :style="{'width':leftWidth}">
            <transition name="process">
              <div class="bg-box" v-if="isShow"></div>
            </transition>
            <div class="row middle-xs center-xs pk-info">
              <div>
                <countTo :startVal='0' :endVal='leftEndVal' :easingFn="easeInOutQuad" :duration='duration' suffix="%" @callback="countToEndCb"></countTo>
                <p>{{selected == 1 && `已选择“${leftInfoTitle}”` || leftInfoTitle}}</p>
              </div>
            </div>
          </div>
          <div class="col-xs pk-item pk-right">
            <div class="row end-xs">
              <transition name="process">
                <div class="bg-box" v-if="isShow"></div>
              </transition>
            </div>
            <div class="row middle-xs center-xs pk-info">
              <div>
                <countTo :startVal='0' :endVal='rightEndVal' :easingFn="easeInOutQuad" :duration='duration' suffix="%"></countTo>
                <p>{{selected == 2 && `已选择“${rightInfoTitle}”` || rightInfoTitle}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row box-select" v-else>
        <div class="col-xs pk-select-item select-left" @click="pkSelect(1, leftInfo.id)" >
          {{leftInfoTitle}}
        </div>
        <div class="pk-vs"></div>
        <div class="col-xs pk-select-item select-right" @click="pkSelect(2, rightInfo.id)" >
          {{rightInfoTitle}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import countTo from 'vue-count-to'
import { Debounce } from '@/utils/commonUtils'
export default {
  props:{
    pkInfo:{
      type: Array,
      default: null
    },
    selected:{
      type: [Number, String],
      default: 0
    }
  },
  data(){
    return {
      isShow:false,
      duration:3000,
      leftEndVal:0,
      rightEndVal:0,
      leftWidth:'50%',
      countToEnd:false,
      animationend: true
    }
  },
  computed:{
    leftInfo(){
      const { pkInfo } = this
      return pkInfo && pkInfo[0]
    },
    rightInfo(){
      const { pkInfo } = this
      return pkInfo && pkInfo[1]
    },
    leftInfoTitle(){
      return this.leftInfo && this.leftInfo.title || ''
    },
    rightInfoTitle(){
      const { pkInfo } = this
      return this.rightInfo && this.rightInfo.title || ''
    },
  },
  components:{
    countTo
  },
  methods:{
    easeInOutQuad(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t + b;
	    return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    pkBoxInit(){
      const {pkInfo} = this
      this.isShow = true
      if(pkInfo && pkInfo.length>0){
        const left = this.leftInfo.value
        const right = this.rightInfo.value
        this.leftWidth = left+'%'
        this.leftEndVal = parseInt(left)
        this.rightEndVal = parseInt(right)
      }
    },
    pkSelect(val, id){
      this.$emit('pkSelect',val, id)
    },
    countToEndCb(){
      this.countToEnd = true
    },
    shake(){
      if(!this.countToEnd){
        return false
      }
      if(!this.animationend){
        return false
      }
      this.animationend = false
      this.showToast()
      const _this = this
      this.$refs.shakeBox.addEventListener('animationend', function fn(e){
        _this.animationend = true
        e.target.removeEventListener('animationend', fn);
      })
    },
    showToast: Debounce(function () {
      this.$emit('shakeToast')
    }, 900)
  },
  watch:{
    selected(val){
      if(val && val != 0){
        this.$nextTick(()=>{
          this.pkBoxInit()
        })
      }
    }
  }
};
</script>
<style lang="less">
.pk-wrapper {
  .row {
    margin-right: 0;
    margin-left: 0;
  }
  .col-xs {
    padding-left: 0;
    padding-right: 0;
  }
  .pk-box {
    .box-main{
      border-radius: 60px;
      height: 125px;
      overflow: hidden;
      &>.row{
        margin-left: -6px;
        margin-right: -6px;
      }
      .pk-item {
        transform: skewX(-15deg);
        border-radius: 9px;
        position: relative;
        .pk-info {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          color: #FFFCFC;
          text-align: center;
          font-size: 40px;
          line-height: 46px;
          transform: skewX(15deg);
          p{
            font-size:24px;
            line-height: 33px;
          }
        }
        &.pk-left {
          width: 60%;
          padding-right: 9px;
          .bg-box {
            background: #FF484A;
          }
        }
        .bg-box {
          height: 125px;
          width: 100%;
          border-radius: 9px;
        }
        .process-enter{
          width:0;
        }
        .process-enter-active {
          transition: all 2s ease-out;
        }
        &.pk-right {
          padding-left: 9px;
          .bg-box {
            background: #2674FF;
          }
        }
      }
      .full-left{
        .pk-left{
          padding-right:0
        }
        .pk-right{
          display:none
        }
      }
      .full-right{
        .pk-right {
          padding-left: 0;
        }
        .pk-left{
          display:none
        }
      }
    }
    .box-select{
      .pk-vs{
        width:102px;
        height:123px;
        // background: url('../image/icon-vs.png') no-repeat;
        // background-position: 0 10px;
        // background-size: contain;
        padding:0 9px;
      }
      .pk-select-item{
        height:123px;
        border-radius:11px;
        width:84px;
        line-height: 123px;
        font-size: 40px;
        color:#fff;
        text-align: center;
        &.select-left{
          background: rgba(255,71,73,1);
          box-shadow:0px 7px 11px 0px rgba(250,25,27,0.3);
        }
        &.select-right{
          background:rgba(38,116,255,1);
          box-shadow:0px 7px 11px 0px rgba(38,69,255,0.26);
        }
      }
    }
  }
  @keyframes shake {
    from,
    to {
      transform: translate3d(0, 0, 0);
    }
    10%,
    40%,
    70%{
      transform: translate3d(-10px, 0, 0);
    }

    20%,
    50%,
    80%{
      transform: translate3d(10px, 0, 0);
    }
  }
  .shake {
    animation-duration: .6s;
    animation-fill-mode: both;
    animation-name: shake;
  }
}
</style>