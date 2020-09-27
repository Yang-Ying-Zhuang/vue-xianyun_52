<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{ active: index === currentTab }"
      >
        <i :class="item.icon"></i>{{ item.name }}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          class="inline-input"
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          class="el-autocomplete"
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          v-model="form.departDate"
          placeholder="请选择日期"
          style="width: 100%"
          @change="handleDate"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="">
        <el-button
          style="width: 100%"
          type="primary"
          icon="el-icon-search"
          @click="handleSubmit"
        >
          搜索
        </el-button>
      </el-form-item>

      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment' // 时间插件
export default {
  data() {
    return {
      form: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "", // 目标城市
        destCode: "", // 目标城市代码
        departDate: "", //日期 2019-05-01
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" },
      ],
      currentTab: 0,
    };
  },
  methods: {
    // 封装：
    // value:用户输入的数据
    // type:是出发城市还是城市，因为赋值的属性不一样
    // 回调函数，我的封装函数本身并没有实现加载输入建议的功能
    getSuggestions(value, type, cb) {
      this.$axios({
        url: "/airs/city",
        params: { name: value },
      }).then((res) => {
        // console.log(res);
        // 如果没有查询到输入建议，则给出提示
        if (res.data.data.length == 0) {
          cb([{ value: "没有查询到相应的城市" }]);
          return;
        }
        let list;
        list = res.data.data.map((v) => {
          //  console.log(v);
          return { value: v.name, code: v.sort };
        });
        //  并不是每个城市都有code值，我们应该过滤掉没有code值的城市，以避免后期的机票查询失败
        list = list.filter((v) => {
          return v.code; //不为null则需要
        });
        // 如果用户只输入一个字，没有继续输入,如果查询到输入建议，应该默认为其加载第一项
        // 让输入建议的第一项默认填充到文本框
        if (type == "depart") {
          this.form.departCity = list[0].value;
          this.form.departCode = list[0].code;
        } else {
          this.form.destCity = list[0].value;
          this.form.destCode = list[0].code;
        }

        cb(list);
      });
    },

    // tab切换时触发
    handleSearchTab(item, index) {
      this.currentTab = index;
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      // cb([{value: 1},{value: 2},{value: 3}]);
      //调用
      this.getSuggestions(value, "depart", cb);
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(item);
      this.form.departCity = item.value;
      this.form.departCode = item.code;
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      // 调用
      this.getSuggestions(value, "dest", cb);
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.code;
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      //调换城市需要结构
      let { departCity, departCode, destCity, destCode } = this.form;

      this.form.departCity = destCity;
      this.form.departCode = destCode;
      //  -----------------------
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },

    // 确认选择日期时触发
    handleDate(value) {
      // 第一种写法
      // this.form.departDate = value 
      // 第二种写法：需要下载时间插件
      this.form.departDate = moment(value).format("YYYY-MM-DD")
    },

    //搜索: 提交表单是触发
    handleSubmit(item) {
      console.log(this.form);
      //由于后台的原因，真正进行查询时，城市名称不能带 “市”这个字
      //在发送机票查询请示的时候，干掉市 这个字
      //触发城市
      this.form.departCity =
        this.form.departCity.indexOf("市") != -1
          ? this.form.departCity.replace("市", "")
          : this.form.departCity;
      // 目的城市
      this.form.destCity = this.form.destCity.indexOf("市") != -1 ? this.form.destCity.replace("市", "") : this.form.destCity;
      // 跳转传递参数
      this.$router.push({path:"air/filghts", query:this.form})
    },
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
