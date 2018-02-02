<template>
  <div class="login-bg">
   <div class="login-default" >
      <div 
      v-for="item in top_topList1" 
      :key="item.moudleId"
      @click="enterSystem(item.moudleName)">
        <span>{{item.moudleName}}</span>
      </div>
   </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'loginEnter',
  created () {
    this.getData()
  },
  computed: {
    ...mapState({
      top_topList1: state => state.moudle.topList1
    })
  },
  methods: {
    enterSystem (text) {
      this.$router.push('/index/1/管理控制台/admin/' + text)
    },
    getData () {
      this.$store.dispatch('queryTopList', '1')
    }
  }
}
</script>

