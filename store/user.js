// 定义state是一个函数，写死
export const state = () => ({
  userinfo: {
    token: "",
    user: {}
  }
})

// mutations 是一个对象
export const mutations = {
  setUserInfo(state, data) {
    // state.userinfo = data
    state.userinfo.token = data.token,
      state.userinfo.user = data.user
  },
   // 清除用户数据
   eliminate(state){
    state.userinfo = {}
  }
}

// 定义actions:处理异步
export const actions = {
  // 将登陆操作封装到actions
  loginActions(store, canshu) {
    return this.$axios({
      url: "/accounts/login",
      method: "post",
      data: canshu,

    }).then(res => {
     store.commit("setUserInfo", res.data)
     //一定要返回 return 否则方面访问不了数据
     return res
    })

  }

}

