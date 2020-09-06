<template>
  <div class="header">
     <div class="logo">
      <router-link class="link" :to="{path : '/'}">
        <img src="http://mengxuegu.com:9999/img/logo.7156be27.png" alt />
        <span class="company">积云会员管理系统</span>
      </router-link>
    </div>
    <div class="info">
      <el-dropdown @command="handle">
        <span class="el-dropdown-link">
          {{name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" command="changePass">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-fold" command="checkOut">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      name:""
    };
  },
  computed: {},
  watch: {},
  methods: {
     handle(command){
          console.log(command)
          switch(command){
            case "changePass" : 
                this.changePass();
                break;
            case "checkOut" : 
                this.checkOut();
                break;    
          }
      },
    changePass() {
      console.log("修改密码");
    },
    checkOut(){
          //清除本地存储的token
          localStorage.removeItem("token");

          //清除本地存储的信息
          localStorage.removeItem("info");

          //跳转到登录页面
          this.$router.push("/login")
          console.log("退出登录")
      }
  },
  created() {
    const info = JSON.parse(localStorage.getItem("info"));
      this.name = info.name !== "undefined" ? info.name : "";
  },
  mounted() {},
  beforeDestroy() {}
};
</script>
<style lang='scss' scoped>
.header .logo {
  padding-left: 40px;
  float: left;
}
.header .logo img {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
.header .logo .link {
  text-decoration: none;
  color: #fff;
}
.header .logo .company {
  margin-left: 10px;
}
.header .info {
  float: right;
  padding-right: 40px;
}
.header .el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
</style>