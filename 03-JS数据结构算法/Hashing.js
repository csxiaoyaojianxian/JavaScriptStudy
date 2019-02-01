/*
* @Author: SUNSHINE
* @Date:   2017-03-23 21:00:09
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-23 21:15:48
*/

function HashTable() {
    this.table = new Array(137);
    this.values = new Array(137);
    this.simpleHash = simpleHash;
    this.betterHash = betterHash;
    this.showDistro = showDistro;
    this.put = put;
    this.get = get;
}

/*function put(data) {
   var pos = this.simpleHash(data);
   this.table[pos] = data;
}*/

// put for linear probing 线性探测法
function put(key, data) {
    var pos = this.betterHash(key);
    if (this.table[pos] == undefined) {
        this.table[pos] = key;
        this.values[pos] = data;
    } else {
        while (this.table[pos] != undefined) {
            pos++;
        }
        this.table[pos] = key;
        this.values[pos] = data;
    }
}

// put for separate chaining 开链法
// function put(key, data) {
//     var pos = this.betterHash(key);
//     var index = 0;
//     if (this.table[pos][index] == undefined) {
//         this.table[pos][index] = data;
//     } else {
//         ++index;
//         while (this.table[pos][index] != undefined) {
//             ++index;
//         }
//         this.table[pos][index] = data;
//     }
// }

function simpleHash(data) {
    var total = 0;
    for (var i = 0; i < data.length; ++i) {
        total += data.charCodeAt(i);
    }
    console.log("Hash value: " + data + " -> " + total);
    return total % this.table.length;
}

function betterHash(string) {
    const H = 37;
    var total = 0;
    for (var i = 0; i < string.length; ++i) {
        total += H * total + string.charCodeAt(i);
    }
    total = total % this.table.length;
    if (total < 0) {
        total += this.table.length - 1;
    }
    return parseInt(total);
}

function showDistro() {
    var n = 0;
    for (var i = 0; i < this.table.length; ++i) {
        if (this.table[i] != undefined) {
            console.log(i + ": " + this.table[i]);
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genStuData(arr) {
    for (var i = 0; i < arr.length; ++i) {
        var num = "";
        for (var j = 1; j <= 9; ++j) {
            num += Math.floor(Math.random() * 10);
        }
        num += getRandomInt(50, 100);
        arr[i] = num;
    }
}

function buildChains(arr) {
    for (var i = 0; i < arr.length; ++i) {
        arr[i] = new Array();
    }
}

function inHash(key, arr) {
    var hash = simpleHash(key, arr);
    var n = 0;
    if (key == arr[hash][n]) {
        return true;
    } else {
        while (arr[hash][n] != undefined) {
            if (arr[hash][n] == key) {
                return true;
            }
            ++n;
        }
    }
    return false;
}

// get for separate chaining
function get(key) {
    var index = 0;
    var hash = this.betterHash(key);
    if (this.table[pos][index] = key) {
        return this.table[pos][index + 1];
    } else {
        index += 2;
        while (this.table[pos][index] != key) {
            index += 2;
        }
        return this.table[pos][index + 1];
    }
    return undefined;
}

// get for linear probing
function get(key) {
    var hash = -1;
    hash = this.betterHash(key);
    if (hash > -1) {
        for (var i = hash; this.table[hash] != undefined; i++) {
            if (this.table[hash] == key) {
                return this.values[hash];
            }
        }
    }
    return undefined;
}

function get(key) {
    return this.table[this.betterHash(key)];
}