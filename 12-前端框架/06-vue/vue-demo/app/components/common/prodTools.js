/*
* @Author: csxiaoyao
* @Date:   2017-12-21 11:28:18
* @Last Modified by:   csxiaoyao
* @Last Modified time: 2017-12-21 11:28:20
*/
let prodTools = {};

let store = window.localStorage;

// let prods = {没有数据就应该是空对象}; //未来从localStorage中获取
let prods = JSON.parse(store.getItem('prods')||'{}');
//{  id:num }
//增加或追加
prodTools.addOrUpdate = function(p){
    //判断是否存在
    if(prods[p.id]){//追加
        prods[p.id] += p.num;
    }else{
        prods[p.id] = p.num;
    }
    //保存
    this.saveProds(prods);
}
//删除
prodTools.delete = function(id){
  delete prods[id];
  //保存
  this.saveProds(prods);
}
//获取到storage
prodTools.getProds = function(){
    return JSON.parse(store.getItem('prods')||'{}');
}
//获取总数
prodTools.getTotalCount = function(){
    let sum = 0;
    for(let id in prods){
        sum += prods[id]; 
    }
    return sum;
}
//存储
prodTools.saveProds = function(prods){
    store.setItem('prods',JSON.stringify(prods));
}

export default prodTools;