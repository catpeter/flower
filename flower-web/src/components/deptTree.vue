<template>
  <el-tree 
    :data="treeModel"
    highlight-current
    :default-expand-all="true"
    :expand-on-click-node='false'
    :check-strictly='true'
    node-key="id"
    @node-click="nodeClick"
    ref="deptTreeRef" ></el-tree>
</template>

<script>

  import { mapState } from 'vuex'
  export default {
    name: 'deptTree',
    data () {
      return {
        msg: '部门'
      }
    },
    created () {
      this.getTreeData()
    },
    computed: {
      ...mapState({
        treeModel: state => state.department.departmentTreeData
      })
    },
    methods: {
      // 加载部门树
      getTreeData () {
        this.$store.dispatch('getDepartmentTree')
      },
      nodeClick (data) {
        this.$emit('nodeClick', data)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-tree-node__expand-icon {
  border: 8px solid transparent;
  border-left-width: 9px;
  border-right-width: 0;
  border-left-color: #97a8be;
}
.el-tree-node__content {
  cursor: default
}
</style>
