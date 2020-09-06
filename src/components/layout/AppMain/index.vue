<template>
  <div class="main">
    <app-link v-show="$route.path !== '/home'"></app-link>
    <router-view></router-view>
  </div>
</template>

<script>
import AppLink from "./link"
export default {
  name: "",
  data() {
    return {};
  },
  components: {
      AppLink 
  }
};
</script>


<style scoped>
.main{
    padding:10px;
}



</style>