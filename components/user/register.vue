<template>
  <div class="register">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名手机"></el-input>
      </el-form-item>

      <el-form-item prop="captcha" style="margin-top: 15px;">
        <el-input v-model="form.captcha" placeholder="验证码">
          <template slot="append">
            <span>发送验证码</span>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="nickname">
        <el-input v-model="form.nickname" placeholder="昵称"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>

      <el-form-item prop="password">
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
        username: "", //手机号
        nickname: "", //昵称
        captcha: "",  //手机验证码
        password: "", //密码
      },
      rules: {
        username: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
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