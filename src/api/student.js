import request from "../utils/request"

export default {
    getStudentList(data){
        return request({
            url : "http://120.53.31.103:84/api/user",
            method : "get",
            params : data
        })
    }
}