import Vue from 'vue'

var Http = function () {

}

Http.jsonp = function (url,data) {
  return new Promise(function(resolve,reject){
    Vue.http.jsonp(url,{
        params:data||{}
    }).then(response=>{
        let ret = response.data;
        if (ret.status==0) {
            resolve(ret.data);
        }else{
            Vue.message.error(ret.msg);
        }
    },error=>{
       
    })
  });
}

export default Http;
