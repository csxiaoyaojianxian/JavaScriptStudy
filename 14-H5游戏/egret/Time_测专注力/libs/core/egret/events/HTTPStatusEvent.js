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
     * @class egret.HTTPStatusEvent
     * @classdesc
     * 在网络请求返回 HTTP 状态代码时，应用程序将调度 HTTPStatusEvent 对象。
     * 在错误或完成事件之前，将始终发送 HTTPStatusEvent 对象。HTTPStatusEvent 对象不一定表示错误条件；它仅反映网络堆栈提供的 HTTP 状态代码（如果有的话）。
     * @extends egret.Event
     */
    var HTTPStatusEvent = (function (_super) {
        __extends(HTTPStatusEvent, _super);
        /**
         * @method egret.HTTPStatusEvent#constructor
         * @param type {string}
         * @param bubbles {boolean}
         * @param cancelable {boolean}
         */
        function HTTPStatusEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
            /**
             * 由服务器返回的 HTTP 状态代码。【只读】
             * @type {number}
             * @private
             */
            this._status = 0;
        }
        Object.defineProperty(HTTPStatusEvent.prototype, "status", {
            get: function () {
                return this._status;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 使用指定的EventDispatcher对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @method egret.IOErrorEvent.dispatchIOErrorEvent
         * @param target {egret.IEventDispatcher}
         */
        HTTPStatusEvent.dispatchHTTPStatusEvent = function (target, status) {
            if (HTTPStatusEvent.httpStatusEvent == null) {
                HTTPStatusEvent.httpStatusEvent = new HTTPStatusEvent(HTTPStatusEvent.HTTP_STATUS);
            }
            HTTPStatusEvent.httpStatusEvent._status = status;
            target.dispatchEvent(HTTPStatusEvent.httpStatusEvent);
        };
        /**
         * HTTPStatusEvent.HTTP_STATUS 常量定义 httpStatus 事件对象的 type 属性值。
         * @constant {string} egret.IOErrorEvent.IO_ERROR
         */
        HTTPStatusEvent.HTTP_STATUS = "httpStatus";
        HTTPStatusEvent.httpStatusEvent = null;
        return HTTPStatusEvent;
    })(egret.Event);
    egret.HTTPStatusEvent = HTTPStatusEvent;
    HTTPStatusEvent.prototype.__class__ = "egret.HTTPStatusEvent";
})(egret || (egret = {}));
