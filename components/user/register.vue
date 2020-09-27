<template>
  <div class="register">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      status-icon
      label-width="80px"
    >
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          @focus="myfocus('username')"
          placeholder="用户名手机"
        ></el-input>
      </el-form-item>

      <el-form-item prop="captcha" style="margin-top: 15px">
        <el-input
          v-model="form.captcha"
          @focus="myfocus('captcha')"
          placeholder="验证码"
        >
          <template slot="append">
            <span @click="verification">发送验证码</span>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="nickname">
        <el-input
          v-model="form.nickname"
          @focus="myfocus('nickname')"
          placeholder="昵称"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          @focus="myfocus('password')"
          placeholder="密码"
        ></el-input>
      </el-form-item>

      <el-form-item prop="checkPass">
        <el-input
          v-model="form.checkPass"
          @focus="myfocus('checkPass')"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" style="width: 100%" @click="register"
      >注册</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    // 确认密码验证
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("请再次输入密码"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "", //手机号
        nickname: "", //昵称
        captcha: "", //手机验证码
        password: "", //密码
        checkPass: "", // 确认密码
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },

  methods: {
    //验证码
    verification() {
      if (/^1\d{10}$/.test(this.form.username)) {
        this.$axios({
          method: "post",
          url: "/captchas",
          data: {
            tel: this.form.username,
          },
        })
          .then((res) => {
            // console.log(res);
            const { code } = res.data;
            this.$confirm(`手机验证码为：${code}`, "提示", {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
          
      } else {
        this.$confirm(`验证码有误，请重新输入`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning",
        });
      }
    },
    // 注册
    register() {
      // 二次校验
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 机构成两个，checkPass不用传
          const { checkPass, ...props } = this.form;
          this.$axios({
            method: "post",
            url: "/accounts/register",
            data: props,

          }).then((res) => {
            this.$confirm(`注册成功`, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "success",
            }).then(() => {
              // 子传父点击跳转
              this.$emit("resclick");
            });
          });
          
        } else {
          this.$message({
            message: "请重新输入正确号码或密码",
            type: "error",
          });
        }
      });
    },
    // 清除当前的验证的焦点，点击输入框就上去红色框的焦点
    myfocus(name) {
      this.$refs.form.clearValidate(name);
    },
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