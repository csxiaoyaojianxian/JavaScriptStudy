/*
* @Author: SUNSHINE
* @Date:   2017-03-23 21:19:17
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-23 21:22:33
*/

function Dictionary() {
   this.add = add;
   this.datastore = new Array();
   this.find = find;
   this.remove = remove;
   this.showAll = showAll;
   this.count = count;
   this.clear = clear;
}

function add(key, value) {
   this.datastore[key] = value;
}

function find(key) {
   return this.datastore[key];
}

function remove(key) {
   delete this.datastore[key];
}

function showAll() {
    var keys = Object.keys(this.datastore);
    for (var key in keys) {
        console.log(keys[key] + " -> " + this.datastore[keys[key]]);
    }
}
function count() {
    var n = 0;
    for(var key in Object.keys(this.datastore)) {
        ++n;
    }
    return n;
}
function clear() {
    var keys = Object.keys(this.datastore);
    for(var key in keys) {
        delete this.datastore[keys[key]];
    }
}