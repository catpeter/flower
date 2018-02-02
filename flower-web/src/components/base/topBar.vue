<template>
  <div class="top-bar">
    <div class="top-bar-logo">
      <!-- <img src="./../../assets/img/main/shrink-icon.png"> -->
      <!--<img class="logo" src="./../../assets/img/main/logo.png">-->
      <span class="top-bar-title">{{sysName}}</span>
    </div>
    <!--<el-select v-model="tabId" placeholder="请选择" @change="showSomething()">
      <el-option
        v-for="item in top_topList1"
        :key="item.moudleId"
        :label="item.moudleName"
        :value="item.moudleId">
      </el-option>
    </el-select>
    <el-radio-group v-model="sysModel" @change="routeModel()">
      <el-radio-button v-for="item in top_topList2" 
        v-if="tabId === item.moudleParentId"
        :key="item.moudleId"
        :label="item.moudleName">
      </el-radio-button>
    </el-radio-group>-->
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        msg: '顶层控件',
        tabId: '',
        sysModel: ''
        // sysName: ''
      }
    },
    created () {
      // var params = this.$route.params
      // this.tabId = params.tabId || this.getcookie('tabId')
      // this.sysModel = params.sysModel || this.getcookie('sysModel')
      // this.sysName = params.sysName
      // console.log("1:"+this.tabId+"||"+this.sysModel)
      // console.log("2:"+this.getcookie("tabId")+"||"+this.getcookie("sysModel"))
      // this.getData()
    },
    props: {
      sysName: {
        type: String,
        default: ''
      }
    },
    // watch: {
    //   top_topList2: 'routeModel'
    // },
    // computed: mapGetters({
    //   top_topList1: 'getTopList1',
    //   top_topList2: 'getTopList2'
    // }),
    methods: {
      routeModel () {
        this.savecookie('tabId', this.tabId, 1)
        this.savecookie('sysModel', this.sysModel, 1)
        // console.log(this.sysModel+'||'+this.tabId)
        this.top_topList2.forEach(function (element) {
          // console.log(this.sysModel+'||'+element.moudleName)
          if (this.sysModel === element.moudleName) {
            this.savecookie('sysModelId', element.moudleId, 1)
            this.$router.push(element.moudleUrl)
          }
        }, this)
      }
      // getData () {
      //   this.$store.dispatch('queryTopList', '1')
      //   this.$store.dispatch('queryTopList', '2')
      // }
    }
  }
</script>
