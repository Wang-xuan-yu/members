<template>
  <div>
    <!-- 头部 -->
    <AppHeader></AppHeader>
    <!-- 侧边栏 -->
    <AppNavBar></AppNavBar>
    <!-- 主体 -->
    <AppMain></AppMain>
  </div>
</template>
<script>
import AppHeader from "./AppHeader";
import AppNavBar from "./AppNavBar";
import AppMain from "./AppMain";
export default {
  name: "",
  props: {},
  components: {
    AppHeader,
    AppNavBar,
    AppMain
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {}
};
</script>
<style lang='scss' scoped>
.header {
  height: 50px;
  line-height: 50px;
  position: absolute;
  right: 0;
  left: 0;
  background-color: #2d3a4b;
}
.navBar{
  width: 180px;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  background-color: #545c64;
}
.main{
  position: absolute;
  left: 180px;
  right: 0;
  top: 50px;
  bottom: 0;
}
</style>