import request from "../utils/request"

export default {
    //获取会员列表接口
    getMemberList(){
        return request({
            url : "/member/list",
            method : "get"
        })
    },
    //获取会员列表分页接口
    getMemberListPage(page,size,searchMap){
        return request({
            url : `/member/list/search/${page}/${size}`,
            method : "POST",
            data : searchMap
        })
    }
}   