<template>
  <div class="side-bar">
      <el-menu unique-opened default-active="1" router>
        <template v-for="(item,index) in sideMenuTree">
          <el-submenu v-if="item.child.length > 0" :index="item.id" :key="item.id">
            <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
            <el-menu-item v-if="!(itemChild.path === '/exportCqfxh')" :index="itemChild.path" :key="itemChild.id" v-for="itemChild in item.child">{{itemChild.name}}</el-menu-item>
            <template v-if="itemChild.path === '/exportCqfxh'" v-for="itemChild in item.child">
              <el-button :key="itemChild.id" @click="exportExcel()" style="border:0px;">{{itemChild.name}}</el-button>
            </template>
          </el-submenu>
          <el-menu-item v-else :index="item.path" :key="item.id">{{item.name}}</el-menu-item>
        </template>
    </el-menu>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
      }
    },
    created () {
    },
    props: {
      sideMenuTree: {
        type: Array,
        required: true
      }
    },
    methods: {
      exportExcel () {
        window.location = axios.defaults.baseURL + 'cqfxh/sealSample/exportSealSample'
      }
    }
  }
</script>
