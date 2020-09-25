// 第三方插件，解决刷新功能
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store_52", // 读取本地存储的数据到store
        })(store)
    })
}