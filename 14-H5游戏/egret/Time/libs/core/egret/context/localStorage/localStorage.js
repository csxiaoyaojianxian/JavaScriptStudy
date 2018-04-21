/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var egret;
(function (egret) {
    var localStorage;
    (function (localStorage) {
        /**
         * 读取数据
         * @method egret.localStorage.getItem
         * @param key {string} 要读取的键名称
         */
        function getItem(key) {
            return null;
        }
        localStorage.getItem = getItem;
        /**
         * 保存数据
         * @method egret.localStorage.setItem
         * @param key {string} 要保存的键名称
         * @param value {string} 要保存的值
         * @returns {boolean} 数据保存是否成功
         */
        function setItem(key, value) {
            return false;
        }
        localStorage.setItem = setItem;
        /**
         * 删除数据
         * @method egret.localStorage.removeItem
         * @param key {string} 要删除的键名称
         */
        function removeItem(key) {
        }
        localStorage.removeItem = removeItem;
        /**
         * 将所有数据清空
         * @method egret.localStorage.clear
         */
        function clear() {
        }
        localStorage.clear = clear;
    })(localStorage = egret.localStorage || (egret.localStorage = {}));
})(egret || (egret = {}));
