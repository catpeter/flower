<template>
  <div>
    <el-breadcrumb separator="|" class="bread">
      <div class="main-content">
        <div class="main-content-top main-content-title">
          <el-row>
            <el-col :span="5">多肉图鉴</el-col>
          </el-row>
        </div>
        <div class="main-content-top" style="float: left;border-bottom: none">
          <el-col :span="24" class="toolbar key-search-form">
            <el-form :inline="true">
              <el-form-item>
                <el-input v-model="pagination.name" icon="search" @keyup.enter.native="getData" placeholder="输入名称" style="width: 160px"></el-input>
              </el-form-item>
              <el-form-item label="生长速度">
                <el-select v-model="pagination.grown" placeholder="全部" style="width: 160px">
                  <el-option value="" label="全部">全部</el-option>
                  <el-option v-for="item in growns" :key="item.name" :label="item.name" :value="item.index">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="繁殖方式">
                <el-select v-model="pagination.breed" placeholder="全部" style="width: 160px">
                  <el-option value="" label="全部">全部</el-option>
                  <el-option v-for="item in breeds" :key="item.name" :label="item.name" :value="item.index">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="繁殖难度">
                <el-select v-model="pagination.reproductive" placeholder="全部" style="width: 160px">
                  <el-option value="" label="全部">全部</el-option>
                  <el-option v-for="item in reproductives" :key="item.name" :label="item.name" :value="item.index">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button class="" @click="getData" :loading="loading">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleAdd()">新增</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="exportProjectData">导出</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
        <div class="main-content-table">
          <div class="block">
            <el-table :data="tableData" border stripe style="width: 100%;">
              <el-table-column type="index" label="序号" width="70px"></el-table-column>
              <el-table-column prop="name" label="名字" width="165px"></el-table-column>
              <el-table-column prop="grown" label="生长速度"></el-table-column>
              <el-table-column prop="habit" label="习性"></el-table-column>
              <el-table-column prop="reproductive" label="繁殖难度"></el-table-column>
              <el-table-column prop="breed" label="繁殖方式"></el-table-column>
              <el-table-column prop="genus" label="科属"></el-table-column>
              <el-table-column label="生长要求" width="252px">
                <template scope="scope">
                  <el-col :span="12" v-for="item in scope.row.seasons" :key="item.name" style="border: 1px solid #ccc;">
                    <div style="text-align:left;">{{item.name}}:</br>
                      日照 <span style="color:orange;" v-for="item1 in item.sunshine" :key="item1">☀</span>
                      </br>浇水 <span style="color:bule;" v-for="item2 in item.water" :key="item2">💧</span></br>
                    </div>
                  </el-col>
                </template>
              </el-table-column>
              <el-table-column label="图片">
                <template scope="scope">
                  <img v-bind:src="scope.row.plantImg" width="150">
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template scope="scope">
                  <el-button class="table-btn" type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button class="table-btn" type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizes" :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="pagesCount">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-breadcrumb>
    <el-dialog :title="form.title" :visible.sync="form.dialogFormVisible" :modal='true' size='tiny'>
      <el-form :inline="true" :model="form.data" :rules="form.rules" ref="form">
        <el-form-item label="多肉名称" prop="name" style="padding-bottom: 20px">
          <el-input v-model="form.data.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="生长速度" prop="grown" style="padding-bottom: 20px">
          <el-select v-model="form.data.grown" placeholder="请输入">
            <el-option v-for="item in growns" :key="item.name" :label="item.name" :value="item.index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="繁殖方式" prop="breed" style="padding-bottom: 20px">
          <el-select v-model="form.data.breed" placeholder="请输入" style="width: 160px">
            <el-option v-for="item in breeds" :key="item.name" :label="item.name" :value="item.index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="繁殖难度" prop="reproductive" style="padding-bottom: 20px">
          <el-select v-model="form.data.reproductive" placeholder="请输入" style="width: 160px">
            <el-option v-for="item in reproductives" :key="item.name" :label="item.name" :value="item.index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        <el-button type="primary" @click="form.dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog size="tiny" title="删除" :visible.sync="dialogDelFormVisible" class="del-dialog" :modal='false'>
      <span>确定删除：{{plantDelName}}吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delPlant()">确 定</el-button>
        <el-button type="primary" @click="dialogDelFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import _ from 'lodash'
  import axios from 'axios'
  export default {
    name: 'classifyProject',
    data () {
      return {
        msg: '图鉴',
        loading: false,
        pageSizes: [5, 10, 20],
        pageSize: 5,
        pagesCount: 0,
        pagination: {
          pageIndex: 1,
          pageSize: 5,
          name: '',
          grown: '',
          breed: '',
          reproductive: ''
        },
        tableData: [],
        form: {
          title: '',
          data: {
            _id: '',
            name: '',
            grown: '',
            genus: '',
            reproductive: ''
          },
          rules: {},
          dialogFormVisible: false
        },
        dialogDelFormVisible: false,
        plantDelName: '',
        _id: ''
      }
    },
    created () {
      this.initGrowns()
      this.initBreeds()
      this.initReproductives()
      this.getData()
    },
    computed: {
      ...mapState({
        breeds: state => state.enumList.breedList,
        growns: state => state.enumList.grownList,
        reproductives: state => state.enumList.reproductiveList
      })
    },
    methods: {
      handleSizeChange (value) {
        this.pagination.pageSize = value
        this.getData()
      },
      handleCurrentChange (value) {
        this.pagination.pageIndex = value
        this.getData()
      },
      async getData () {
        return this.$store.dispatch('searchSucculentList', this.pagination).then(res => {
          res.data.forEach(re => {
            re.reproductive = (_.find(this.reproductives, r => r.index === re.reproductive) || {
              name: ''
            }).name
            re.breed = (_.find(this.breeds, b => b.index === re.breed) || {
              name: ''
            }).name
            re.grown = (_.find(this.growns, g => g.index === re.grown) || {
              name: ''
            }).name
          })
          this.tableData = res.data
          this.pagesCount = res.count
        })
      },
      initBreeds () {
        return this.$store.dispatch('listBreed')
      },
      initGrowns () {
        return this.$store.dispatch('listGrown')
      },
      initReproductives () {
        return this.$store.dispatch('listReproductive')
      },
      handleAdd () {
        this.form.dialogFormVisible = true
        this.form.title = '新增图鉴'
      },
      getSucculent (_id) {
        return this.$store.dispatch('getSucculent', _id).then((res) => {
          this.form.data.name = res.name
          this.form.data.breed = res.breed
          this.form.data._id = res._id
          this.form.data.grown = res.grown
        })
      },
      async handleEdit (row) {
        this.form.dialogFormVisible = true
        this.form.title = '编辑项目'
        await this.getSucculent(row._id)
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveProject()
          } else {
            this.$message({
              message: '输入数据不正确！',
              type: 'warning'
            })
            return false
          }
        })
      },
      saveProject () {
        if (this.form.data._id) {
          return this.$store.dispatch('editSucculent', this.form.data).then(() => {
            this.form.dialogFormVisible = false
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.getData()
          })
        } else {
          return this.$store.dispatch('addSucculent', this.form.data).then(() => {
            this.form.dialogFormVisible = false
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.getData()
          })
        }
      },
      handleView (row) {
        // console.log(row)
      },
      handleDelete (row) {
        this.dialogDelFormVisible = true
        this.plantDelName = row.name
        this._id = row._id
      },
      delPlant () {
        return this.$store.dispatch('delSucculent', this._id).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.dialogDelFormVisible = false
          this.getData()
        }).catch((err) => {
          console.log(err)
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
      },
      exportProjectData () {
        window.location = axios.defaults.baseURL + 'jqscqk/classifyProjectInfo/exportProjectData'
      },
      handleUpload (response, file, fileList) {
        this.getData()
        this.$message({
          message: response.message,
          type: 'success'
        })
      },
      handleError (err, file, fileList) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    }
  }

</script>

<style>
.el-table .cell, .el-table th>div {
  padding-left:0px;
  padding-right:0px;
}
</style>
