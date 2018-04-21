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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    /**
     * @class egret.HTML5DeviceContext
     * @classdesc
     * @extends egret.DeviceContext
     */
    var HTML5DeviceContext = (function (_super) {
        __extends(HTML5DeviceContext, _super);
        /**
         * @method egret.HTML5DeviceContext#constructor
         */
        function HTML5DeviceContext(frameRate) {
            if (frameRate === void 0) { frameRate = 60; }
            _super.call(this);
            this.frameRate = frameRate;
            this._time = 0;
            this._isActivate = true;
            if (frameRate == 60) {
                HTML5DeviceContext.requestAnimationFrame = window["requestAnimationFrame"] || window["webkitRequestAnimationFrame"] || window["mozRequestAnimationFrame"] || window["oRequestAnimationFrame"] || window["msRequestAnimationFrame"];
                HTML5DeviceContext.cancelAnimationFrame = window["cancelAnimationFrame"] || window["msCancelAnimationFrame"] || window["mozCancelAnimationFrame"] || window["webkitCancelAnimationFrame"] || window["oCancelAnimationFrame"] || window["cancelRequestAnimationFrame"] || window["msCancelRequestAnimationFrame"] || window["mozCancelRequestAnimationFrame"] || window["oCancelRequestAnimationFrame"] || window["webkitCancelRequestAnimationFrame"];
            }
            if (!HTML5DeviceContext.requestAnimationFrame) {
                HTML5DeviceContext.requestAnimationFrame = function (callback) {
                    return window.setTimeout(callback, 1000 / frameRate);
                };
            }
            if (!HTML5DeviceContext.cancelAnimationFrame) {
                HTML5DeviceContext.cancelAnimationFrame = function (id) {
                    return window.clearTimeout(id);
                };
            }
            HTML5DeviceContext.instance = this;
            this.registerListener();
        }
        HTML5DeviceContext.prototype.enterFrame = function () {
            var context = HTML5DeviceContext.instance;
            var thisObject = HTML5DeviceContext._thisObject;
            var callback = HTML5DeviceContext._callback;
            var thisTime = egret.getTimer();
            var advancedTime = thisTime - context._time;
            context._requestAnimationId = HTML5DeviceContext.requestAnimationFrame.call(window, HTML5DeviceContext.prototype.enterFrame);
            callback.call(thisObject, advancedTime);
            context._time = thisTime;
        };
        /**
         * @method egret.HTML5DeviceContext#executeMainLoop
         * @param callback {Function}
         * @param thisObject {any}
         */
        HTML5DeviceContext.prototype.executeMainLoop = function (callback, thisObject) {
            HTML5DeviceContext._callback = callback;
            HTML5DeviceContext._thisObject = thisObject;
            this.enterFrame();
        };
        HTML5DeviceContext.prototype.reset = function () {
            var context = HTML5DeviceContext.instance;
            if (context._requestAnimationId) {
                context._time = egret.getTimer();
                HTML5DeviceContext.cancelAnimationFrame.call(window, context._requestAnimationId);
                context.enterFrame();
            }
        };
        HTML5DeviceContext.prototype.registerListener = function () {
            var self = this;
            //失去焦点
            var onBlurHandler = function () {
                if (!self._isActivate) {
                    return;
                }
                self._isActivate = false;
                egret.MainContext.instance.stage.dispatchEvent(new egret.Event(egret.Event.DEACTIVATE));
            };
            //激活
            var onFocusHandler = function () {
                if (self._isActivate) {
                    return;
                }
                self._isActivate = true;
                var context = HTML5DeviceContext.instance;
                context.reset();
                egret.MainContext.instance.stage.dispatchEvent(new egret.Event(egret.Event.ACTIVATE));
            };
            var handleVisibilityChange = function () {
                if (!document[hidden]) {
                    onFocusHandler();
                }
                else {
                    onBlurHandler();
                }
            };
            //            window.onfocus = onFocusHandler;
            //            window.onblur = onBlurHandler;
            window.addEventListener("focus", onFocusHandler, false);
            window.addEventListener("blur", onBlurHandler, false);
            var hidden, visibilityChange;
            if (typeof document.hidden !== "undefined") {
                hidden = "hidden";
                visibilityChange = "visibilitychange";
            }
            else if (typeof document["mozHidden"] !== "undefined") {
                hidden = "mozHidden";
                visibilityChange = "mozvisibilitychange";
            }
            else if (typeof document["msHidden"] !== "undefined") {
                hidden = "msHidden";
                visibilityChange = "msvisibilitychange";
            }
            else if (typeof document["webkitHidden"] !== "undefined") {
                hidden = "webkitHidden";
                visibilityChange = "webkitvisibilitychange";
            }
            else if (typeof document["oHidden"] !== "undefined") {
                hidden = "oHidden";
                visibilityChange = "ovisibilitychange";
            }
            if ("onpageshow" in window && "onpagehide" in window) {
                window.addEventListener("pageshow", onFocusHandler, false);
                window.addEventListener("pagehide", onBlurHandler, false);
            }
            if (hidden && visibilityChange) {
                document.addEventListener(visibilityChange, handleVisibilityChange, false);
            }
        };
        return HTML5DeviceContext;
    })(egret.DeviceContext);
    egret.HTML5DeviceContext = HTML5DeviceContext;
    HTML5DeviceContext.prototype.__class__ = "egret.HTML5DeviceContext";
})(egret || (egret = {}));
var egret_html5_localStorage;
(function (egret_html5_localStorage) {
    //todo 有可能没有window.localStorage对象
    function getItem(key) {
        return window.localStorage.getItem(key);
    }
    egret_html5_localStorage.getItem = getItem;
    function setItem(key, value) {
        try {
            window.localStorage.setItem(key, value);
            return true;
        }
        catch (e) {
            console.log("egret_html5_localStorage.setItem保存失败,key=" + key + "&value=" + value);
            return false;
        }
    }
    egret_html5_localStorage.setItem = setItem;
    function removeItem(key) {
        window.localStorage.removeItem(key);
    }
    egret_html5_localStorage.removeItem = removeItem;
    function clear() {
        window.localStorage.clear();
    }
    egret_html5_localStorage.clear = clear;
    function init() {
        for (var key in egret_html5_localStorage) {
            egret.localStorage[key] = egret_html5_localStorage[key];
        }
    }
    egret_html5_localStorage.init = init;
})(egret_html5_localStorage || (egret_html5_localStorage = {}));
egret_html5_localStorage.init();
