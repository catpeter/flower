<template>
  <div class="login-bg">
    <img class="login-logo" src="./../assets/img/login/login-logo.png">
    <div class="login" @keyup.enter="submitForm('userMes')">
      <el-form :label-position="labelPosition" :rules="rulesLogin" :model="userMes" ref="userMes">
        <el-form-item prop="userName">
          <el-input v-model="userMes.userName" auto-complete="off">
            <template slot="prepend">用户名</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="userMes.password" auto-complete="off">
            <template slot="prepend">密码</template>
          </el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <img src="./../assets/img/login/login.png" @click="submitForm('userMes')" element-loading-text="拼命加载中">
        </el-form-item>
      </el-form>
    </div>
    <div class="copyright">CopyRight ©2016 All rights reserved 上海思创华信信息技术有限公司版权所有</div>
  </div>
</template>

<script>
// import { setToken } from '../util/auth'
export default {
  name: 'login',
  data () {
    return {
      msg: '登录页面',
      labelPosition: 'center',
      rulesLogin: {
        userName: [{ required: true, message: '用户名格式不正确，请输入正确格式用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      userMes: {
        userName: '',
        password: ''
      },
      checkPwd: ''
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 密码加密功能
          // 数据请求
          this.login()
        } else {
          return false
        }
      })
    },
    login () {
      return this.$store.dispatch('login', { password: this.userMes.password, userName: this.userMes.userName })
        .then((res) => {
          console.log('login')
          this.$router.push('/index')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
