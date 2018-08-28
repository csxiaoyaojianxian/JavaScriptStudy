/*
 * @Author: SUNSHINE
 * @Date:   2017-03-23 21:00:09
 * @Last Modified by:   SUNSHINE
 * @Last Modified time: 2017-03-23 22:04:01
 */

function Set() {
    this.dataStore = [];
    this.add = add;
    this.remove = remove;
    this.size = size;
    this.union = union; //并集
    this.contains = contains; //辅助方法
    this.intersect = intersect;
    this.subset = subset; //交集
    this.difference = difference; //补集
    this.show = show;
}

function add(data) {
    if (this.dataStore.indexOf(data) < 0) {
        this.dataStore.push(data);
        return true;
    } else {
        return false;
    }
}

function remove(data) {
    var pos = this.dataStore.indexOf(data);
    if (pos > -1) {
        this.dataStore.splice(pos, 1);
        return true;
    } else {
        return false;
    }
}

function size() {
    return this.dataStore.length;
}

function show() {
    return "[" + this.dataStore + "]";
}

function contains(data) {
    if (this.dataStore.indexOf(data) > -1) {
        return true;
    } else {
        return false;
    }
}

function union(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; ++i) {
        tempSet.add(this.dataStore[i]);
    }
    for (var i = 0; i < set.dataStore.length; ++i) {
        if (!tempSet.contains(set.dataStore[i])) {
            tempSet.dataStore.push(set.dataStore[i]);
        }
    }
    return tempSet;
}

function intersect(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (set.contains(this.dataStore[i])) {
            tempSet.add(this.dataStore[i]);
        }
    }
    return tempSet;
}

function subset(set) {
    if (this.size() > set.size()) {
        return false;
    } else {
        for (var member in this.dataStore) {
            if (!set.contains(this.dataStore[member])) {
                return false;
            }
        }
    }
    return true;
}

function difference(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (!set.contains(this.dataStore[i])) {
            tempSet.add(this.dataStore[i]);
        }
    }
    return tempSet;
}