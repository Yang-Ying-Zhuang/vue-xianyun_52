<template>
  <div class="form">
    <!-- 表单from -->
    <el-form ref="refuser" :rules="rules" :model="form" label-width="80px">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          @focus="myusername('username')"
          clearable
          placeholder="请输入手机号"
          type="text"
        ></el-input>
      </el-form-item>
      <!-- 用户密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          @focus="myusername('password')"
          clearable
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button type="text" style="float: right;">忘记密码</el-button>
    <el-button type="primary" style="width:100%" @click="userclick">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "13800138000",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^1\d{10}$|^\w{3,}$/,
            messsage: "请输入复合的账号",
            trgger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    userclick() {
      // 二次验证
      this.$refs.refuser.validate((valid) => {
        if (valid) {
          //封装异步请求,操作异步登录功能
          this.$store.dispatch("user/loginActions",this.form)

          .then(res=>{
            // console.log(res);
            this.$message({ message: "登录成功", type: "success" });
            this.$router.push({path:"/"})
          })
          .catch(err=>{
            this.$message({ message: "登录密码错误", type: "error" });
          })

        } else {
          this.$message({ message: "用户名不合法", type: "error" });
        }

        // if (valid) {
        //   this.$axios({
        //     url: "/accounts/login",
        //     method: "post",
        //     data: this.form,
        //   })
        //     .then((res) => {
        //       console.log(res);
        //       if (res.data.token) {
        //         this.$message({ message: "登录成功", type: "success" });
        //         this.$router.push({path:"/"})
        //       }
        //       //将当前的用户信息存储到store
        //       //赋值的写法：this.$store.commit('仓库名称/mutations中的方法名称'，传入的数据)
        //       this.$store.commit("user/setUserInfo",res.data)
        //     })
        //     .catch((err) => {
        //       // console.log(err);
        //       this.$message({ message: "登录密码错误", type: "error" });
        //     });

        // } else{
        //     this.$message({ message: "用户名不合法", type: "error" });
        // }
      });
    },
    // 清除当前的验证
    myusername(user) {
      this.$refs.refuser.clearValidate(user);
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
.form {
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