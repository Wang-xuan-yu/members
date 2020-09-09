<template>
 <div>
     
 </div>
</template>

<script>
import StudentApi from "../../api/student"
export default {
 name : "", 
 data(){
  return {
      searchInfo : {
          limit : 10,
          page : 1,
          status : "",
          nickname : "",
          mobile : ""
      }
  }
 },
 methods : {
     fetchData(){
         StudentApi.getStudentList(this.searchInfo).then(res=>{
             console.log(res)
         }).catch(error=>{
             console.log(error)
         })
     }
 },
 created(){
     this.fetchData()
 },
 components : {

 },
}
</script>


<style scoped>

</style>