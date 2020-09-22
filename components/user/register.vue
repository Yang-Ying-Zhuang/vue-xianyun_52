<template>
  <div class="register">
    <el-form ref="form" :model="form"  label-width="80px">
      <el-form-item>
        <el-input v-model="form.username" placeholder="用户名手机"></el-input>
      </el-form-item>

      <el-form-item style="margin-top: 15px;">
        <el-input v-model="form.captcha" placeholder="验证码">
          <template slot="append">发送验证码</template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="form.nickname" placeholder="昵称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="form.name" placeholder="密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="form.password" placeholder="确认密码"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" style="width:100%">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username:"",  //手机号
        nickname:"",  //昵称
        captcha:"",   //手机验证码
        password:"",  //密码
      },
    };
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-form-item__content {
  margin-left: 0px !important;
}
.el-button + .el-button {
  margin-left: 0px;
}
.register {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>