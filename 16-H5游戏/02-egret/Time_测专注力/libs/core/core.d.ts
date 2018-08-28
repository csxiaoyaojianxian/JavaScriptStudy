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
declare module egret {
    /**
     * @classdesc
     * IHashObject是哈希对象接口。引擎内所有接口的基类,为对象实例提供唯一的hashCode值,提高对象比较的性能。
     * 注意：自定义对象请直接继承HashObject，而不是实现此接口。否则会导致hashCode不唯一。
     * @interface
     * @class egret.IHashObject
     */
    interface IHashObject {
        /**
         * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
         * @member {number} egret.IHashObject#hashCode
         */
        hashCode: number;
    }
}
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
/**
 * @namespace egret
 */
declare module egret {
    /**
     * @class egret.HashObject
     * @classdesc
     * @implements egret.IHashObject
     */
    class HashObject implements IHashObject {
        /**
         * @method egret.HashObject#constructor
         * @class egret.HashObject
         * @classdesc 哈希对象。引擎内所有对象的基类，为对象实例提供唯一的hashCode值,提高对象比较的性能。
         */
        constructor();
        /**
         * 哈希计数
         */
        private static hashCount;
        private _hashCode;
        /**
         * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
         * @member {number} egret.HashObject#hashCode
         */
        hashCode: number;
    }
}
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
declare module egret {
    /**
     * @class egret.Recycler
     * @classdesc
     * 对象缓存复用工具类，可用于构建对象池，一段时间后会自动回收对象。
     * @extends egret.HashObject
     */
    class Recycler extends HashObject {
        /**
         * @method egret.Recycler#constructor
         * @param autoDisposeTime {number}
         */
        constructor(autoDisposeTime?: number);
        static _callBackList: any[];
        /**
         * 多少帧后自动销毁对象。
         */
        private autoDisposeTime;
        private frameCount;
        _checkFrame(): void;
        private objectPool;
        private _length;
        /**
         * 缓存的对象数量
         * @member {number} egret.Recycler#length
         */
        length: number;
        /**
         * 缓存一个对象以复用
         * @method egret.Recycler#push
         * @param object {any}
         */
        push(object: any): void;
        /**
         * 获取一个缓存的对象
         * @method egret.Recycler#pop
         * @returns {any}
         */
        pop(): any;
        /**
         * 立即清空所有缓存的对象。
         * @method egret.Recycler#dispose
         */
        dispose(): void;
    }
}
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
declare module egret {
    var __START_TIME: number;
    /**
     * 用于计算相对时间。此方法返回自启动 Egret 引擎以来经过的毫秒数。
     * @method egret.getTimer
     * @returns {number} 启动 Egret 引擎以来经过的毫秒数。
     */
    function getTimer(): number;
}
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
declare module egret {
    var __callLaterFunctionList: any[];
    var __callLaterThisList: any[];
    var __callLaterArgsList: any[];
    /**
     * 延迟函数到屏幕重绘前执行。
     * @method egret.callLater
     * @param method {Function} 要延迟执行的函数
     * @param thisObject {any} 回调函数的this引用
     * @param ...args {any} 函数参数列表
     */
    function callLater(method: Function, thisObject: any, ...args: any[]): void;
    var __callAsyncFunctionList: any[];
    var __callAsyncThisList: any[];
    var __callAsyncArgsList: any[];
    /**
     * 异步调用函数
     * @method egret.__callAsync
     * @param method {Function} 要异步调用的函数
     * @param thisObject {any} 函数的this引用
     * @param ...args {any} 函数参数列表
     */
    function __callAsync(method: Function, thisObject: any, ...args: any[]): void;
}
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
declare module egret_dom {
    var header: string;
    /**
     * 获取当前浏览器的类型
     * @returns {string}
     */
    function getHeader(): string;
    /**
     * 获取当前浏览器类型
     * @type {string}
     */
    function getTrans(type: string): string;
}
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
declare module egret {
    class Event extends HashObject {
        /**
         * @class egret.Event
         * @classdesc
         * Event 类作为创建 Event 对象的基类，当发生事件时，Event 对象将作为参数传递给事件侦听器。
         *
         * Event 类的属性包含有关事件的基本信息，例如事件的类型或者是否可以取消事件的默认行为。
         *
         * 对于许多事件（如由 Event 类常量表示的事件），此基本信息就足够了。但其他事件可能需要更详细的信息。
         * 例如，与触摸关联的事件需要包括有关触摸事件的位置以及在触摸事件期间是否按下了任何键的其他信息。
         * 您可以通过扩展 Event 类（TouchEvent 类执行的操作）将此类其他信息传递给事件侦听器。
         * Egret API 为需要其他信息的常见事件定义多个 Event 子类。与每个 Event 子类关联的事件将在每个类的文档中加以介绍。
         *
         * Event 类的方法可以在事件侦听器函数中使用以影响事件对象的行为。
         * 某些事件有关联的默认行为，通过调用 preventDefault() 方法，您的事件侦听器可以取消此行为。
         * 可以通过调用 stopPropagation() 或 stopImmediatePropagation() 方法，将当前事件侦听器作为处理事件的最后一个事件侦听器。
         * @param {string} type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles{boolean} 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable{boolean} 确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
         * 在将显示对象直接添加到舞台显示列表或将包含显示对象的子树添加至舞台显示列表中时调度。
         * 以下方法会触发此事件：DisplayObjectContainer.addChild()、DisplayObjectContainer.addChildAt()。
         * @constant {string} egret.Event.ADDED_TO_STAGE
         */
        static ADDED_TO_STAGE: string;
        /**
         * 在从显示列表中直接删除显示对象或删除包含显示对象的子树时调度。DisplayObjectContainer 类的以下两个方法会生成此事件：removeChild() 和 removeChildAt()。
         * 如果必须删除某个对象来为新对象提供空间，则 DisplayObjectContainer 对象的下列方法也会生成此事件：addChild()、addChildAt() 和 setChildIndex()。
         * @constant {string} egret.Event.REMOVED_FROM_STAGE
         */
        static REMOVED_FROM_STAGE: string;
        /**
         * 将显示对象添加到显示列表中时调度。以下方法会触发此事件：
         * DisplayObjectContainer.addChild()、DisplayObjectContainer.addChildAt()。
         * @constant {string} egret.Event.ADDED
         */
        static ADDED: string;
        /**
         * 将要从显示列表中删除显示对象时调度。DisplayObjectContainer 类的以下两个方法会生成此事件：removeChild() 和 removeChildAt()。
         * 如果必须删除某个对象来为新对象提供空间，则 DisplayObjectContainer 对象的下列方法也会生成此事件：addChild()、addChildAt() 和 setChildIndex()。
         * @constant {string} egret.Event.REMOVED
         */
        static REMOVED: string;
        /**
         * 完成
         * @constant {string} egret.Event.COMPLETE
         */
        static COMPLETE: string;
        /**
         * 主循环：进入新的一帧
         * @constant {string} egret.Event.ENTER_FRAME
         */
        static ENTER_FRAME: string;
        /**
         * 主循环：开始渲染
         * @constant {string} egret.Event.RENDER
         */
        static RENDER: string;
        /**
         * 主循环：渲染完毕
         * @constant {string} egret.Event.FINISH_RENDER
         */
        static FINISH_RENDER: string;
        /**
         * 主循环：updateTransform完毕
         * @constant {string} egret.Event.FINISH_UPDATE_TRANSFORM
         */
        static FINISH_UPDATE_TRANSFORM: string;
        /**
         * 离开舞台。
         * @constant {string} egret.Event.LEAVE_STAGE
         */
        static LEAVE_STAGE: string;
        /**
         * 舞台尺寸发生改变
         * @constant {string} egret.Event.RESIZE
         */
        static RESIZE: string;
        /**
         * 状态改变
         * @constant {string} egret.Event.CHANGE
         */
        static CHANGE: string;
        /**
         * 游戏激活
         * @constant {string} egret.Event.ACTIVATE
         */
        static ACTIVATE: string;
        /**
         * 取消激活
         * @constant {string} egret.Event.DEACTIVATE
         */
        static DEACTIVATE: string;
        data: any;
        _type: string;
        /**
         * 事件的类型。类型区分大小写。
         * @member {string} egret.Event#type
         */
        type: string;
        _bubbles: boolean;
        /**
         * 表示事件是否为冒泡事件。如果事件可以冒泡，则此值为 true；否则为 false。
         * @member {boolean} egret.Event#bubbles
         */
        bubbles: boolean;
        private _cancelable;
        /**
         * 表示是否可以阻止与事件相关联的行为。如果可以取消该行为，则此值为 true；否则为 false。
         * @member {boolean} egret.Event#cancelable
         */
        cancelable: boolean;
        _eventPhase: number;
        /**
         * 事件流中的当前阶段。此属性可以包含以下数值：
         * 捕获阶段 (EventPhase.CAPTURING_PHASE)。
         * 目标阶段 (EventPhase.AT_TARGET)。
         * 冒泡阶段 (EventPhase.BUBBLING_PHASE)。
         * @member {boolean} egret.Event#eventPhase
         */
        eventPhase: number;
        _currentTarget: any;
        /**
         * 当前正在使用某个事件侦听器处理 Event 对象的对象。例如，如果用户单击“确定”按钮，
         * 则当前目标可以是包含该按钮的节点，也可以是它的已为该事件注册了事件侦听器的始祖之一。
         * @member {any} egret.Event#currentTarget
         */
        currentTarget: any;
        _target: any;
        /**
         * 事件目标。此属性包含目标节点。例如，如果用户单击“确定”按钮，则目标节点就是包含该按钮的显示列表节点。
         * @member {any} egret.Event#target
         */
        target: any;
        _isDefaultPrevented: boolean;
        /**
         * 检查是否已对事件调用 preventDefault() 方法。
         * @method egret.Event#isDefaultPrevented
         * @returns {boolean} 如果已调用 preventDefault() 方法，则返回 true；否则返回 false。
         */
        isDefaultPrevented(): boolean;
        /**
         * 如果可以取消事件的默认行为，则取消该行为。
         * 许多事件都有默认执行的关联行为。例如，如果用户在文本字段中键入一个字符，则默认行为就是在文本字段中显示该字符。
         * 由于可以取消 TextEvent.TEXT_INPUT 事件的默认行为，因此您可以使用 preventDefault() 方法来防止显示该字符。
         * 注意：当cancelable属性为false时，此方法不可用。
         * @method egret.Event#preventDefault
         */
        preventDefault(): void;
        _isPropagationStopped: boolean;
        /**
         * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 (currentTarget) 中的任何事件侦听器。
         * 相比之下，stopImmediatePropagation() 方法可以防止对当前节点中和后续节点中的事件侦听器进行处理。
         * 对此方法的其它调用没有任何效果。可以在事件流的任何阶段中调用此方法。
         * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
         * @method egret.Event#stopPropagation
         */
        stopPropagation(): void;
        _isPropagationImmediateStopped: boolean;
        /**
         * 防止对事件流中当前节点中和所有后续节点中的事件侦听器进行处理。此方法会立即生效，并且会影响当前节点中的事件侦听器。
         * 相比之下，在当前节点中的所有事件侦听器都完成处理之前，stopPropagation() 方法不会生效。
         * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
         * @method egret.Event#stopImmediatePropagation
         */
        stopImmediatePropagation(): void;
        private isNew;
        _reset(): void;
        static _dispatchByTarget(EventClass: any, target: IEventDispatcher, type: string, props?: Object, bubbles?: boolean, cancelable?: boolean): boolean;
        static _getPropertyData(EventClass: any): any;
        /**
         * 使用指定的EventDispatcher对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @method egret.Event.dispatchEvent
         */
        static dispatchEvent(target: IEventDispatcher, type: string, bubbles?: boolean, data?: any): void;
    }
}
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
declare module egret {
    /**
     * @class egret.HTTPStatusEvent
     * @classdesc
     * 在网络请求返回 HTTP 状态代码时，应用程序将调度 HTTPStatusEvent 对象。
     * 在错误或完成事件之前，将始终发送 HTTPStatusEvent 对象。HTTPStatusEvent 对象不一定表示错误条件；它仅反映网络堆栈提供的 HTTP 状态代码（如果有的话）。
     * @extends egret.Event
     */
    class HTTPStatusEvent extends Event {
        /**
         * HTTPStatusEvent.HTTP_STATUS 常量定义 httpStatus 事件对象的 type 属性值。
         * @constant {string} egret.IOErrorEvent.IO_ERROR
         */
        static HTTP_STATUS: string;
        /**
         * @method egret.HTTPStatusEvent#constructor
         * @param type {string}
         * @param bubbles {boolean}
         * @param cancelable {boolean}
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
         * 由服务器返回的 HTTP 状态代码。【只读】
         * @type {number}
         * @private
         */
        private _status;
        status: number;
        private static httpStatusEvent;
        /**
         * 使用指定的EventDispatcher对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @method egret.IOErrorEvent.dispatchIOErrorEvent
         * @param target {egret.IEventDispatcher}
         */
        static dispatchHTTPStatusEvent(target: IEventDispatcher, status: number): void;
    }
}
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
declare module egret {
    /**
     * @class egret.IOErrorEvent
     * @classdesc IO流事件，当错误导致输入或输出操作失败时调度 IOErrorEvent 对象。
     * @extends egret.Event
     */
    class IOErrorEvent extends Event {
        /**
         * @constant {string} egret.IOErrorEvent.IO_ERROR
         */
        static IO_ERROR: string;
        /**
         * @method egret.IOErrorEvent#constructor
         * @param type {string}
         * @param bubbles {boolean}
         * @param cancelable {boolean}
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
         * 使用指定的EventDispatcher对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @method egret.IOErrorEvent.dispatchIOErrorEvent
         * @param target {egret.IEventDispatcher}
         */
        static dispatchIOErrorEvent(target: IEventDispatcher): void;
    }
}
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
declare module egret {
    class TouchEvent extends Event {
        /**
         * 创建一个作为参数传递给事件侦听器的 Event 对象。
         *
         * @class egret.TouchEvent
         * @classdesc
         * TouchEvent事件类
         * @extends egret.Event
         * @constructor egret.TouchEvent
         * @param type {string} 事件的类型，可以作为 Event.type 访问。
         * @param bubbles {boolean} 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable {boolean} 确定是否可以取消 Event 对象。默认值为 false。
         * @param touchPointID {number}
         * @param stageX {number}
         * @param stageY {number}
         * @param ctrlKey {boolean}
         * @param altKey {boolean}
         * @param shiftKey {boolean}
         * @param touchDown {boolean}
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, touchPointID?: number, stageX?: number, stageY?: number, ctrlKey?: boolean, altKey?: boolean, shiftKey?: boolean, touchDown?: boolean);
        /**
         * 轻触
         * @constant {string} egret.TouchEvent.TOUCH_TAP
         */
        static TOUCH_TAP: string;
        /**
         * 移动
         * @constant {string} egret.TouchEvent.TOUCH_MOVE
         */
        static TOUCH_MOVE: string;
        /**
         * 开始触摸
         * @constant {string} egret.TouchEvent.TOUCH_BEGIN
         */
        static TOUCH_BEGIN: string;
        /**
         * 在同一对象上结束触摸
         * @constant {string} egret.TouchEvent.TOUCH_END
         */
        static TOUCH_END: string;
        /**
         * 在对象外部结束触摸
         * @constant {string} egret.TouchEvent.TOUCH_RELEASE_OUTSIDE
         */
        static TOUCH_RELEASE_OUTSIDE: string;
        /**
         * @deprecated
         */
        static TOUCH_ROLL_OUT: string;
        /**
         * @deprecated
         */
        static TOUCH_ROLL_OVER: string;
        /**
         * @deprecated
         */
        static TOUCH_OUT: string;
        /**
         * @deprecated
         */
        static TOUCH_OVER: string;
        _stageX: number;
        /**
         * 事件发生点在全局舞台坐标中的水平坐标。
         * @member {number} egret.TouchEvent#stageX
         */
        stageX: number;
        _stageY: number;
        /**
         * 事件发生点在全局舞台坐标中的垂直坐标。
         * @member {number} egret.TouchEvent#stageY
         */
        stageY: number;
        /**
         * 事件发生点相对于currentTarget的水平坐标。
         * @member {number} egret.TouchEvent#localX
         */
        localX: number;
        /**
         * 事件发生点相对于currentTarget的垂直坐标。
         * @member {number} egret.TouchEvent#localY
         */
        localY: number;
        /**
         * 分配给触摸点的唯一标识号
         * @member {number} egret.TouchEvent#touchPointID
         */
        touchPointID: number;
        /**
         * 事件发生时ctrl键是否被按下。 (Mac OS下为 Cmd 或 Ctrl)
         * @deprecated
         * @member {boolean} egret.TouchEvent#ctrlKey
         */
        ctrlKey: boolean;
        /**
         * 事件发生时shift键是否被按下。
         * @deprecated
         * @member {boolean} egret.TouchEvent#shiftKey
         */
        shiftKey: boolean;
        /**
         * 事件发生时alt键是否被按下。
         * @deprecated
         * @member {boolean} egret.TouchEvent#altKey
         */
        altKey: boolean;
        /**
         * 表示触摸已按下 (true) 还是未按下 (false)。
         * @member {boolean} egret.TouchEvent#touchDown
         */
        touchDown: boolean;
        /**
         * 使用指定的EventDispatcher对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @method egret.TouchEvent.dispatchTouchEvent
         * @param target {egret.IEventDispatcher}
         * @param type {string}
         * @param touchPointID {number}
         * @param stageX {number}
         * @param stageY {number}
         * @param ctrlKey {boolean}
         * @param altKey {boolean}
         * @param shiftKey {boolean}
         * @param touchDown {boolean}
         */
        static dispatchTouchEvent(target: IEventDispatcher, type: string, touchPointID?: number, stageX?: number, stageY?: number, ctrlKey?: boolean, altKey?: boolean, shiftKey?: boolean, touchDown?: boolean): void;
    }
}
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
/** @namespace egret */
declare module egret {
    /**
     * @class egret.TimerEvent
     * @classdesc
     * 每当 Timer 对象达到由 Timer.delay 属性指定的间隔时，Timer 对象即会调度 TimerEvent 对象。
     * @extends egret.Event
     */
    class TimerEvent extends Event {
        /**
         *
         * @constructor egret.TimerEvent
         * @param type {string} 事件的类型。事件侦听器可以通过继承的 type 属性访问此信息。
         * @param bubbles {boolean} 确定 Event 对象是否冒泡。事件侦听器可以通过继承的 bubbles 属性访问此信息。
         * @param cancelable {boolean} 确定是否可以取消 Event 对象。事件侦听器可以通过继承的 cancelable 属性访问此信息。
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
         * 每当 Timer 对象达到根据 Timer.delay 属性指定的间隔时调度。
         * @constant {string} egret.TimerEvent.TIMER
         */
        static TIMER: string;
        /**
         * 每当它完成 Timer.repeatCount 设置的请求数后调度。
         * @constant {string} egret.TimerEvent.TIMER_COMPLETE
         */
        static TIMER_COMPLETE: string;
        /**
         * 使用指定的EventDispatcher对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @method egret.TimerEvent.dispatchTimerEvent
         * @param target {egret.IEventDispatcher}
         * @param type {string}
         */
        static dispatchTimerEvent(target: IEventDispatcher, type: string): void;
    }
}
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
declare module egret {
    /**
     * @class egret.EventPhase
     * @classdesc
     * EventPhase 类可为 Event 类的 eventPhase 属性提供值。
     */
    class EventPhase {
        /**
         * 捕获阶段，是事件流的第一个阶段。
         * @constant {number} egret.EventPhase.CAPTURING_PHASE
         */
        static CAPTURING_PHASE: number;
        /**
         * 目标阶段，是事件流的第二个阶段。
         * @constant {number} egret.EventPhase.AT_TARGET
         */
        static AT_TARGET: number;
        /**
         * 冒泡阶段，是事件流的第三个阶段。
         * @constant {number} egret.EventPhase.BUBBLING_PHASE
         */
        static BUBBLING_PHASE: number;
    }
}
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
declare module egret {
    /**
     *
     * @class egret.IEventDispatcher
     * @interface
     * @classdesc IEventDispatcher是egret的事件派发器接口，负责进行事件的发送和侦听。
     */
    interface IEventDispatcher extends IHashObject {
        /**
         * 添加事件侦听器
         * @param type 事件的类型。
         * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
         * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 确定侦听器是运行于捕获阶段还是运行于目标和冒泡阶段。如果将 useCapture 设置为 true，
         * 则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在目标或冒泡阶段处理事件。
         * 要在所有三个阶段都侦听事件，请调用 addEventListener 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
         * @param  priority 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
         * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         * @stable A
         */
        addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;
        /**
         * 移除事件侦听器
         * @param type 事件名
         * @param listener 侦听函数
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 是否使用捕获，这个属性只在显示列表中生效。
         * @stable A
         */
        removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
        /**
         * 检测是否存在监听器
         * @param type 事件名
         * @returns {*}
         * @stable A
         */
        hasEventListener(type: string): boolean;
        /**
         * 派发事件
         * @param type 事件名
         * @param arg 数据对象
         * @returns {*}
         */
        dispatchEvent(event: Event): boolean;
        /**
         * 检查是否用此 EventDispatcher 对象或其任何始祖为指定事件类型注册了事件侦听器。将指定类型的事件调度给此
         * EventDispatcher 对象或其任一后代时，如果在事件流的任何阶段触发了事件侦听器，则此方法返回 true。
         * hasEventListener() 与 willTrigger() 方法的区别是：hasEventListener() 只检查它所属的对象，
         * 而 willTrigger() 方法检查整个事件流以查找由 type 参数指定的事件。
         * @param type 事件名
         */
        willTrigger(type: string): boolean;
    }
}
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
declare module egret {
    /**
     *
     * @class egret.EventDispatcher
     * @classdesc
     * EventDispatcher是egret的事件派发器类，负责进行事件的发送和侦听。
     *
     * 事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生鼠标单击、触摸或按键等事件时，
     * 引擎会将事件对象调度到从显示列表根开始的事件流中。然后该事件对象在显示列表中前进，直到到达事件目标，
     * 然后从这一点开始其在显示列表中的回程。在概念上，到事件目标的此往返行程被划分为三个阶段：
     * 捕获阶段包括从根到事件目标节点之前的最后一个节点的行程，目标阶段仅包括事件目标节点，冒泡阶段包括回程上遇到的任何后续节点到显示列表的根。
     *
     * @extends egret.HashObject
     * @implements egret.IEventDispatcher
     *
     */
    class EventDispatcher extends HashObject implements IEventDispatcher {
        /**
         * EventDispatcher 类是可调度事件的所有类的基类。EventDispatcher 类实现 IEventDispatcher 接口
         * ，并且是 DisplayObject 类的基类。EventDispatcher 类允许显示列表上的任何对象都是一个事件目标，
         * 同样允许使用 IEventDispatcher 接口的方法。
         */
        constructor(target?: IEventDispatcher);
        /**
         * 事件抛出对象
         */
        private _eventTarget;
        /**
         * 引擎内部调用
         * @private
         */
        _eventsMap: Object;
        /**
         * 引擎内部调用
         * @private
         */
        _captureEventsMap: Object;
        /**
         * 添加事件侦听器
         * @method egret.EventDispatcher#addEventListener
         * @param type {string} 事件的类型。
         * @param listener {Function} 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
         * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
         * @param thisObject {any} 侦听函数绑定的this对象
         * @param useCapture {boolean} 确定侦听器是运行于捕获阶段还是运行于目标和冒泡阶段。如果将 useCapture 设置为 true，
         * 则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在目标或冒泡阶段处理事件。
         * 要在所有三个阶段都侦听事件，请调用 addEventListener 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
         * @param  priority {number} 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
         * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         */
        addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;
        /**
         * 在一个事件列表中按优先级插入事件对象
         */
        _insertEventBin(list: any[], listener: Function, thisObject: any, priority: number, display?: any): boolean;
        /**
         * 移除事件侦听器
         * @method egret.EventDispatcher#removeEventListener
         * @param type {string} 事件名
         * @param listener {Function} 侦听函数
         * @param thisObject {any} 侦听函数绑定的this对象
         * @param useCapture {boolean} 是否使用捕获，这个属性只在显示列表中生效。
         */
        removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
        /**
         * 在一个事件列表中按优先级插入事件对象
         */
        _removeEventBin(list: any[], listener: Function, thisObject: any, display?: any): boolean;
        /**
         * 检测是否存在监听器
         * @method egret.EventDispatcher#hasEventListener
         * @param type {string} 事件类型
         * @returns {boolean}
         * @stable A
         */
        hasEventListener(type: string): boolean;
        /**
         * 检查是否用此 EventDispatcher 对象或其任何始祖为指定事件类型注册了事件侦听器。将指定类型的事件调度给此
         * EventDispatcher 对象或其任一后代时，如果在事件流的任何阶段触发了事件侦听器，则此方法返回 true。
         * hasEventListener() 与 willTrigger() 方法的区别是：hasEventListener() 只检查它所属的对象，
         * 而 willTrigger() 方法检查整个事件流以查找由 type 参数指定的事件。
         * @method egret.EventDispatcher#willTrigger
         * @param type {string} 事件类型
         * @returns {boolean} 是否注册过监听器，如果注册过返回true，反之返回false
         */
        willTrigger(type: string): boolean;
        /**
         * 将事件分派到事件流中。事件目标是对其调用 dispatchEvent() 方法的 EventDispatcher 对象。
         * @method egret.EventDispatcher#dispatchEvent
         * @param event {egret.Event} 调度到事件流中的 Event 对象。如果正在重新分派事件，则会自动创建此事件的一个克隆。 在调度了事件后，其 _eventTarget 属性将无法更改，因此您必须创建此事件的一个新副本以能够重新调度。
         * @returns {boolean} 如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
         */
        dispatchEvent(event: Event): boolean;
        _notifyListener(event: Event): boolean;
        /**
         * 派发一个包含了特定参数的事件到所有注册了特定类型侦听器的对象中。 这个方法使用了一个内部的事件对象池因避免重复的分配导致的额外开销。
         * @method egret.EventDispatcher#dispatchEventWith
         * @param type {string} 事件类型
         * @param bubbles {boolean} 是否冒泡，默认false
         * @param data {any}附加数据(可选)
         */
        dispatchEventWith(type: string, bubbles?: boolean, data?: Object): void;
    }
}
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
declare module egret {
    /**
     * @class egret.MainContext
     * @classdesc
     * MainContext是游戏的核心跨平台接口，组合了多个功能Context，并是游戏启动的主入口
     * @extends egret.EventDispatcher
     */
    class MainContext extends EventDispatcher {
        constructor();
        /**
         * 渲染Context
         * @member egret.MainContext#rendererContext
         */
        rendererContext: RendererContext;
        /**
         * 触摸Context
         * @member egret.MainContext#touchContext
         */
        touchContext: TouchContext;
        /**
         * 网络Context
         * @member egret.MainContext#netContext
         */
        netContext: NetContext;
        /**
         * 设备divice
         * @member egret.MainContext#deviceContext
         */
        deviceContext: DeviceContext;
        /**
         * 舞台
         * @member egret.MainContext#stage
         */
        stage: Stage;
        static deviceType: string;
        static DEVICE_PC: string;
        static DEVICE_MOBILE: string;
        static runtimeType: string;
        static RUNTIME_HTML5: string;
        static RUNTIME_NATIVE: string;
        /**
         * 游戏启动，开启主循环，参考Flash的滑动跑道模型
         * @method egret.MainContext#run
         */
        run(): void;
        /**
         * 滑动跑道模型，渲染部分
         */
        private renderLoop(frameTime);
        private reuseEvent;
        /**
         * 广播EnterFrame事件。
         */
        private broadcastEnterFrame(frameTime);
        /**
         * 广播Render事件。
         */
        private broadcastRender();
        /**
         * 执行callLater回调函数列表
         */
        private doCallLaterList(funcList, thisList, argsList);
        /**
         * 执行callAsync回调函数列表
         */
        private doCallAsyncList();
        /**
         * @member egret.MainContext.instance
         */
        static instance: MainContext;
        private static cachedEvent;
    }
}
declare var testDeviceType: () => boolean;
declare var testRuntimeType: () => boolean;
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
declare module egret {
    /**
     * @class egret.Profiler
     * @classdesc
     * Profiler是egret的性能检测分析类
     * 请使用 egret.Profiler.getInstance().run();打开性能分析显示。
     */
    class Profiler {
        private static instance;
        /**
         * 返回系统中唯一的Profiler实例。
         * @returns {Profiler}
         */
        static getInstance(): Profiler;
        private _lastTime;
        private _logicPerformanceCost;
        private _renderPerformanceCost;
        private _updateTransformPerformanceCost;
        private _preDrawCount;
        private _txt;
        private _tick;
        private _maxDeltaTime;
        private _totalDeltaTime;
        /**
         * 启动Profiler
         * @method egret.Profiler#run
         */
        run(): void;
        /**
         * @private
         */
        private onEnterFrame(event);
        /**
         * @private
         */
        private onStartRender(event);
        private onFinishUpdateTransform(event);
        /**
         * @private
         */
        private onFinishRender(event);
        /**
         * @private
         */
        private update(frameTime);
        /**
         * @method egret.Profiler#onDrawImage
         * @private
         */
        onDrawImage(): void;
    }
}
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
declare module egret {
    /**
     * @class egret.Ticker
     * @classdesc
     * Ticker是egret引擎的心跳控制器，是游戏唯一的时间处理入口。开发者务必不要使用setTimeout / setInterval 等方法，而是统一使用Ticker
     * @extends egret.EventDispatcher
     */
    class Ticker extends EventDispatcher {
        private _timeScale;
        private _paused;
        /**
         * 启动心跳控制器。
         * 这个函数应只在游戏初始化时调用一次
         * @method egret.Ticker#run
         * @stable A
         */
        run(): void;
        private update(advancedTime);
        private callBackList;
        /**
         * 注册帧回调事件，同一函数的重复监听会被忽略。
         * @method egret.Ticker#register
         * @param listener {Function} 帧回调函数,参数返回上一帧和这帧的间隔时间。示例：onEnterFrame(frameTime:number):void
         * @param thisObject {any} 帧回调函数的this对象
         * @param priority {any} 事件优先级，开发者请勿传递 Number.NEGATIVE_INFINITY 和 Number.POSITIVE_INFINITY
         * @stable A-
         */
        register(listener: Function, thisObject: any, priority?: number): void;
        /**
         * 取消侦听enterFrame事件
         * @method egret.Ticker#unregister
         * @param listener {Function} 事件侦听函数
         * @param thisObject {any} 侦听函数的this对象
         * @stable A-
         */
        unregister(listener: Function, thisObject: any): void;
        /**
         * 在指定的延迟（以毫秒为单位）后运行指定的函数。
         * @method egret.Ticker#setTimeout
         * @param listener {Function}
         * @param thisObject {any}
         * @param delay {number}
         * @param ...parameter {any}
         * @deprecated
         */
        setTimeout(listener: Function, thisObject: any, delay: number, ...parameters: any[]): void;
        /**
         * @method egret.Ticker#setTimeScale
         * @param timeScale {number}
         */
        setTimeScale(timeScale: number): void;
        /**
         * @method egret.Ticker#getTimeScale
         */
        getTimeScale(): number;
        /**
         * @method egret.Ticker#pause
         */
        pause(): void;
        /**
         * @method egret.Ticker#resume
         */
        resume(): void;
        private static instance;
        /**
         * @method egret.Ticker.getInstance
         * @returns {Ticker}
         */
        static getInstance(): Ticker;
    }
}
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
declare module egret {
    /**
     * @class egret.HorizontalAlign
     * @classdesc 水平对齐方式
     */
    class HorizontalAlign {
        /**
         * 左对齐
         * @constant egret.HorizontalAlign.LEFT
         */
        static LEFT: string;
        /**
         * 右对齐
         * @constant egret.HorizontalAlign.RIGHT
         */
        static RIGHT: string;
        /**
         * 水平居中对齐
         * @constant egret.HorizontalAlign.CENTER
         */
        static CENTER: string;
        /**
         * 水平两端对齐
         * 注意：TextFiled不支持此对齐方式。
         * @constant egret.HorizontalAlign.JUSTIFY
         */
        static JUSTIFY: string;
        /**
         * 相对于容器对子项进行内容对齐。这会将所有子项的大小统一调整为容器的"内容宽度"。
         * 容器的"内容宽度"是最大子项的大小,如果所有子项都小于容器的宽度，则会将所有子项的大小调整为容器的宽度。
         * 注意：TextFiled不支持此对齐方式。
         * @constant egret.HorizontalAlign.CONTENT_JUSTIFY
         */
        static CONTENT_JUSTIFY: string;
    }
}
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
declare module egret {
    /**
     * @class egret.VerticalAlign
     * @classdesc 垂直对齐方式
     */
    class VerticalAlign {
        /**
         * 顶对齐
         * @constant egret.VerticalAlign.TOP
         */
        static TOP: string;
        /**
         * 底对齐
         * @constant egret.VerticalAlign.BOTTOM
         */
        static BOTTOM: string;
        /**
         * 垂直居中对齐
         * @constant egret.VerticalAlign.MIDDLE
         */
        static MIDDLE: string;
        /**
         * 垂直两端对齐
         * 注意：TextFiled不支持此对齐方式。
         * @constant egret.VerticalAlign.JUSTIFY
         */
        static JUSTIFY: string;
        /**
         * 相对于容器对子项进行内容对齐。这会将所有子项的大小统一调整为容器的"内容高度"。
         * 容器的"内容高度"是最大子项的大小,如果所有子项都小于容器的高度，则会将所有子项的大小调整为容器的高度。
         * 注意：TextFiled不支持此对齐方式。
         * @constant egret.VerticalAlign.CONTENT_JUSTIFY
         */
        static CONTENT_JUSTIFY: string;
    }
}
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
declare module egret {
    /**
     * @class egret.Timer
     * @classdesc
     * @extends egret.EventDispatcher
     */
    class Timer extends EventDispatcher {
        constructor(delay: number, repeatCount?: number);
        /**
         * @member {number} egret.Timer#delay
         */
        delay: number;
        /**
         * @member {number} egret.Timer#repeatCount
         */
        repeatCount: number;
        private _currentCount;
        /**
         * @method egret.Timer#currentCount
         * @returns {number}
         */
        currentCount(): number;
        private _running;
        /**
         * @member {boolean} egret.Timer#running
         */
        running: boolean;
        /**
         * @method egret.Timer#reset
         */
        reset(): void;
        /**
         * @method egret.Timer#start
         */
        start(): void;
        /**
         * @method egret.Timer#stop
         */
        stop(): void;
        private lastTime;
        private onEnterFrame(frameTime);
    }
}
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
declare module egret {
    /**
     * 返回一个对象的完全限定名<br/>
     * @method egret.getQualifiedClassName
     * @param value {any} 需要完全限定类名称的对象，可以将任何 TypeScript / JavaScript值传递给此方法，包括所有可用的TypeScript / JavaScript类型、对象实例、原始类型（如number）和类对象
     * @returns {string}
     * @example
     *  egret.getQualifiedClassName(egret.DisplayObject) //返回 "egret.DisplayObject"
     */
    function getQualifiedClassName(value: any): string;
}
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
declare module egret {
    /**
     * 返回 name 参数指定的类的类对象引用。
     * @method egret.getDefinitionByName
     * @param name {string} 类的名称。
     * @returns {any}
     * @example
     * egret.getDefinitionByName("egret.DisplayObject") //返回 DisplayObject类定义
     */
    function getDefinitionByName(name: string): any;
}
declare var __global: any;
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
declare module egret {
    /**
     * 在指定的延迟（以毫秒为单位）后运行指定的函数。
     * @method egret.setTimeout
     * @param listener {Function} 侦听函数
     * @param thisObject {any} this对象
     * @param delay {number} 延迟时间，以毫秒为单位
     * @param ...args {any} 参数列表
     * @returns {number} 返回索引，可以用于 clearTimeout
     */
    function setTimeout(listener: Function, thisObject: any, delay: number, ...args: any[]): number;
    /**
     * 清除指定延迟后运行的函数。
     * @method egret.clearTimeout
     * @param key {number}
     */
    function clearTimeout(key: number): void;
}
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
declare module egret {
    /**
     * 检查指定的应用程序域之内是否存在一个公共定义。该定义可以是一个类、一个命名空间或一个函数的定义。
    * @method egret.hasDefinition
     * @param name {string} 定义的名称。
    * @returns {boolean}
     * @example
     * egret.hasDefinition("egret.DisplayObject") //返回 true
     */
    function hasDefinition(name: string): boolean;
}
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
declare module egret {
    /**
     * 转换数字为颜色字符串
     * @method egret.toColorString
     * @param value {number}
     * @returns {string}
     */
    function toColorString(value: number): string;
}
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
declare module egret {
    /**
     * @class egret.Matrix
     * @classdesc
     * 2D矩阵类，包括常见矩阵算法
     * @extends egret.HashObject
     */
    class Matrix extends HashObject {
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        /**
         * @method egret.Matrix#constructor
         * @constructor
         * @param a {number} 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b {number} 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c {number} 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d {number} 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx {number} 沿 x 轴平移每个点的距离。
         * @param ty {number} 沿 y 轴平移每个点的距离。
         */
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        /**
         * @member {any} egret.Matrix.
         */
        static identity: Matrix;
        static DEG_TO_RAD: number;
        /**
         * @member {any} egret.Matrix#
         */
        /**
         * 前置矩阵
         * @method egret.Matrix#prepend
         * @param a {number}
         * @param b {number}
         * @param c {number}
         * @param d {number}
         * @param tx {number}
         * @param ty {number}
         * @returns {egret.Matrix}
         */
        prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        /**
         * 后置矩阵
         * @method egret.Matrix#append
         * @param a {number}
         * @param b {number}
         * @param c {number}
         * @param d {number}
         * @param tx {number}
         * @param ty {number}
         * @returns {egret.Matrix}
         */
        append(a: any, b: any, c: any, d: any, tx: any, ty: any): Matrix;
        /**
         * 前置矩阵
         * @method egret.Matrix#prependTransform
         * @param x {number}
         * @param y {number}
         * @param scaleX {number}
         * @param scaleY {number}
         * @param rotation {number}
         * @param skewX {number}
         * @param skewY {number}
         * @param regX {number}
         * @param regY {number}
         * @returns {egret.Matrix}
         */
        prependTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX: number, regY: number): Matrix;
        /**
         * 后置矩阵
         * @method egret.Matrix#appendTransform
         * @param x {number}
         * @param y {number}
         * @param scaleX {number}
         * @param scaleY {number}
         * @param rotation {number}
         * @param skewX {number}
         * @param skewY {number}
         * @param regX {number}
         * @param regY {number}
         * @returns {egret.Matrix}
         */
        appendTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX: number, regY: number): Matrix;
        /**
         * 对 Matrix 对象应用旋转转换。
         * 矩阵旋转，以角度制为单位
         * @method egret.Matrix#rotate
         * @param angle {number} 角度
         * @returns {egret.Matrix}
         */
        rotate(angle: any): Matrix;
        /**
         * 矩阵斜切，以角度值为单位
         * @method egret.Matrix#skew
         * @param skewX {number}
         * @param skewY {number}
         * @returns {egret.Matrix}
         */
        skew(skewX: any, skewY: any): Matrix;
        /**
         * 矩阵缩放
         * @method egret.Matrix#scale
         * @param x {number}
         * @param y {number}
         * @returns {egret.Matrix}
         */
        scale(x: any, y: any): Matrix;
        /**
         * 沿 x 和 y 轴平移矩阵，由 x 和 y 参数指定。
         * @method egret.Matrix#translate
         * @param x {number} 沿 x 轴向右移动的量（以像素为单位）。
         * @param y {number} 沿 y 轴向下移动的量（以像素为单位）。
         * @returns {egret.Matrix}
         */
        translate(x: any, y: any): Matrix;
        /**
         * 为每个矩阵属性设置一个值，该值将导致 null 转换。
         * 通过应用恒等矩阵转换的对象将与原始对象完全相同。
         * 调用 identity() 方法后，生成的矩阵具有以下属性：a=1、b=0、c=0、d=1、tx=0 和 ty=0。
         * @method egret.Matrix#identity
         * @returns {egret.Matrix}
         */
        identity(): Matrix;
        /**
         * 矩阵重置为目标矩阵
         * @method egret.Matrix#identityMatrix
         * @returns {egret.Matrix}
         */
        identityMatrix(matrix: Matrix): Matrix;
        /**
         * 执行原始矩阵的逆转换。
         * 您可以将一个逆矩阵应用于对象来撤消在应用原始矩阵时执行的转换。
         * @method egret.Matrix#invert
         * @returns {egret.Matrix}
         */
        invert(): Matrix;
        /**
         * 根据一个矩阵，返回某个点在该矩阵上的坐标
         * @method egret.Matrix.transformCoords
         * @param matrix {egret.Matrix}
         * @param x {number}
         * @param y {number}
         * @returns {numberPoint}
         * @stable C 该方法以后可能删除
         */
        static transformCoords(matrix: Matrix, x: number, y: number): Point;
        private array;
        toArray(transpose: any): any;
    }
}
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
declare module egret {
    /**
     * @class egret.Point
     * @classdesc
     * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
     * @extends egret.HashObject
     */
    class Point extends HashObject {
        static identity: Point;
        /**
         * 创建一个 egret.Point 对象
         * @method egret.Point#constructor
         * @param x {number} 该对象的x属性值，默认为0
         * @param y {number} 该对象的y属性值，默认为0
         */
        constructor(x?: number, y?: number);
        /**
         * 该点的水平坐标。默认值为 0。
         * @constant {number} egret.Point#x
         */
        x: number;
        /**
         * 该点的垂直坐标。默认值为 0。
         * @constant {number} egret.Point#y
         */
        y: number;
        /**
         * 克隆点对象
         * @method egret.Point#clone
         * @returns {egret.Point}
         */
        clone(): Point;
        /**
         * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
         * @method egret.Point#equals
         * @param {egret.Point} toCompare 要比较的点。
         * @returns {boolean} 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
         */
        equals(toCompare: Point): boolean;
        /**
         * 返回 pt1 和 pt2 之间的距离。
         * @method egret.Point#distance
         * @param p1 {egret.Point} 第一个点
         * @param p2 {egret.Point} 第二个点
         * @returns {number} 第一个点和第二个点之间的距离。
         */
        static distance(p1: Point, p2: Point): number;
    }
}
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
declare module egret {
    /**
     * @class egret.Rectangle
     * @classdesc 矩形类
     * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。
     * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
     * 但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
     * @extends egret.HashObject
     */
    class Rectangle extends HashObject {
        constructor(x?: number, y?: number, width?: number, height?: number);
        /**
         * 矩形左上角的 x 坐标。
         * @constant {number} egret.Rectangle#x
         */
        x: number;
        /**
         * 矩形左上角的 y 坐标。
         * @constant {number} egret.Rectangle#y
         */
        y: number;
        /**
         * 矩形的宽度（以像素为单位）。
         * @member {number} egret.Rectangle#width
         */
        width: number;
        /**
         * 矩形的高度（以像素为单位）。
         * @member {number} egret.Rectangle#height
         */
        height: number;
        /**
         * x 和 width 属性的和。
         * @member {number} egret.Rectangle#right
         */
        right: number;
        /**
         * y 和 height 属性的和。
         * @member {number} egret.Rectangle#bottom
         */
        bottom: number;
        /**
         * 举行类初始化赋值，开发者尽量调用此方法复用Rectangle对象，而不是每次需要的时候都重新创建
         * @method egret.Rectangle#initialize
         * @param x {number} 矩形的x轴
         * @param y {number} 矩形的y轴
         * @param width {number} 矩形的宽度
         * @param height {number} 矩形的高度
         * @returns {egret.Rectangle}
         */
        initialize(x: number, y: number, width: number, height: number): Rectangle;
        /**
         * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
         * @method egret.Rectangle#contains
         * @param x {number} 检测点的x轴
         * @param y {number} 检测点的y轴
         * @returns {boolean} 如果检测点位于矩形内，返回true，否则，返回false
         */
        contains(x: number, y: number): boolean;
        /**
         * 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
         * @method egret.Rectangle#intersects
         * @param toIntersect {egret.Rectangle} 要与此 Rectangle 对象比较的 Rectangle 对象。
         * @returns {boolean} 如果两个矩形相交，返回true，否则返回false
         */
        intersects(toIntersect: Rectangle): boolean;
        /**
         * 克隆矩形对象
         * @method egret.Rectangle#clone
         * @returns {egret.Rectangle} 返回克隆后的矩形
         */
        clone(): Rectangle;
        /**
         * 引擎内部用于函数传递返回值的全局矩形对象，开发者请勿随意修改此对象
         * @member {egret.Rectangle} egret.Rectangle.identity
         */
        static identity: Rectangle;
        /**
         * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
         * 此方法与 Rectangle.contains() 方法类似，只不过它采用 Point 对象作为参数。
         * @method egret.Rectangle#containsPoint
         * @param point {egret.Point} 包含点对象
         * @returns {boolean} 如果包含，返回true，否则返回false
         */
        containsPoint(point: Point): boolean;
    }
}
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
declare module egret {
    /**
     * @class egret.Logger
     * @classdesc
     * Logger是引擎的日志处理模块入口
     * @stable B 目前Logger的接口设计没有问题，但是考虑到跨平台，需要将其改为一个Context，并且允许开发者自由扩展以实现自身游戏的日志分析收集需求
     * todo:GitHub文档，如何利用日志帮助游戏持续改进
     */
    class Logger {
        /**
         * 表示出现了致命错误，开发者必须修复错误
         * @method egret.Logger.fatal
         * @param actionCode {string} 错误信息
         * @param value {Object} 错误描述信息
         */
        static fatal(actionCode: string, value?: Object): void;
        /**
         * 记录正常的Log信息
         * @method egret.Logger.info
         * @param actionCode {string} 错误信息
         * @param value {Object} 错误描述信息
         */
        static info(actionCode: string, value?: Object): void;
        /**
         * 记录可能会出现问题的Log信息
         * @method egret.Logger.warning
         * @param actionCode {string} 错误信息
         * @param value {Object} 错误描述信息
         */
        static warning(actionCode: string, value?: Object): void;
        /**
         * @private
         * @param type
         * @param actionCode
         * @param value
         */
        private static traceToConsole(type, actionCode, value);
        /**
         * @private
         * @param type
         * @param actionCode
         * @param value
         * @returns {string}
         */
        private static getTraceCode(type, actionCode, value);
    }
}
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
declare module egret {
    /**
     * @deprecated
     */
    class SAXParser extends HashObject {
        static _instance: SAXParser;
        /**
         * @deprecated
         */
        static getInstance(): SAXParser;
        private _parser;
        private _xmlDict;
        private _isSupportDOMParser;
        constructor();
        /**
         * @deprecated
         */
        parserXML(textxml: string): any;
    }
}
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
declare module egret {
    /**
     * @class egret.StageDelegate
     * @classdesc
     * StageDelegate负责处理屏幕适配策略
     * @extends egret.HashObject
     */
    class StageDelegate extends HashObject {
        private static instance;
        /**
         * @method egret.StageDelegate.getInstance
         * @returns {StageDelegate}
         */
        static getInstance(): StageDelegate;
        /**
         * @member egret.StageDelegate.canvas_name
         * @deprecated
         */
        static canvas_name: string;
        /**
         * @member egret.StageDelegate.canvas_div_name
         */
        static canvas_div_name: string;
        private _designWidth;
        private _designHeight;
        _scaleX: number;
        _scaleY: number;
        _offSetY: number;
        private _resolutionPolicy;
        _stageWidth: number;
        _stageHeight: number;
        /**
         * @method egret.StageDelegate#constructor
         */
        constructor();
        /**
         * @method egret.StageDelegate#setDesignSize
         * @param width {number}
         * @param height {{number}}
         */
        setDesignSize(width: number, height: number): void;
        /**
         * @method egret.StageDelegate#_setResolutionPolicy
         * @param resolutionPolic {any}
         */
        _setResolutionPolicy(resolutionPolicy: ResolutionPolicy): void;
        /**
         * @method egret.StageDelegate#getScaleX
         */
        getScaleX(): number;
        /**
         * @method egret.StageDelegate#getScaleY
         */
        getScaleY(): number;
        /**
         * @method egret.StageDelegate#getOffSetY
         */
        getOffSetY(): number;
    }
    /**
     * @class egret.ResolutionPolicy
     * @classdesc
     */
    class ResolutionPolicy {
        private _containerStrategy;
        private _contentStrategy;
        constructor(containerStg: any, contentStg: any);
        /**
         * @method egret.ResolutionPolicy#init
         * @param view {egret.StageDelegate}
         */
        init(view: StageDelegate): void;
        /**
         * @method egret.ResolutionPolicy#_apply
         * @param view {any}
         * @param designedResolutionWidth {any}
         * @param designedResolutionHeigh {any}
         */
        _apply(view: any, designedResolutionWidth: any, designedResolutionHeight: any): void;
    }
    /**
     * @class egret.ContainerStrategy
     * @classdesc
     */
    class ContainerStrategy {
        /**
         * @constant egret.ContainerStrategy.EQUAL_TO_FRAME
         */
        static EQUAL_TO_FRAME: any;
        /**
         * @method egret.ContainerStrategy.initialize
         */
        static initialize(): void;
        /**
         * @method egret.ContainerStrategy#init
         * @param vie {any}
         */
        init(view: any): void;
        /**
         * @method egret.ContainerStrategy#_apply
         * @param view {any}
         * @param designedWidth {any}
         * @param designedHeigh {any}
         */
        _apply(view: any, designedWidth: any, designedHeight: any): void;
        _setupContainer(): void;
    }
    /**
     * @class egret.EqualToFrame
     * @classdesc
     * @extends egret.ContainerStrategy
     */
    class EqualToFrame extends ContainerStrategy {
        _apply(view: any): void;
    }
    /**
     * @class egret.ContentStrategy
     * @classdesc
     */
    class ContentStrategy {
        /**
         * @method egret.ContentStrategy#init
         * @param vie {any}
         */
        init(view: any): void;
        /**
         * @method egret.ContentStrategy#_apply
         * @param delegate {egret.StageDelegate}
         * @param designedResolutionWidth {number}
         * @param designedResolutionHeight {number}
         */
        _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
        setEgretSize(w: number, h: number, styleW: number, styleH: number, left?: number, top?: number): void;
        /**
         * 显示区域分辨率宽
         * @returns {number}
         */
        _getClientWidth(): number;
        /**
         * 显示区域分辨率高
         * @returns {number}
         */
        _getClientHeight(): number;
    }
    /**
     * @class egret.FixedHeight
     * @classdesc
     * @extends egret.ContentStrategy
     */
    class FixedHeight extends ContentStrategy {
        private minWidth;
        /**
         * 构造函数
         * @param minWidth 最终游戏内适配的最小stageWidth，默认没有最小宽度
         */
        constructor(minWidth?: number);
        /**
         * @method egret.FixedHeight#_apply
         * @param delegate {any}
         * @param designedResolutionWidth {any}
         * @param designedResolutionHeight {any}
         */
        _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
    }
    /**
     * @class egret.FixedWidth
     * @classdesc
     * @extends egret.ContentStrategy
     */
    class FixedWidth extends ContentStrategy {
        private minHeight;
        /**
         * 构造函数
         * @param minHeight 最终游戏内适配的最小stageHeight，默认没有最小高度
         */
        constructor(minHeight?: number);
        _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
    }
    /**
     * @class egret.FixedSize
     * @classdesc
     * @extends egret.ContentStrategy
     */
    class FixedSize extends ContentStrategy {
        private width;
        private height;
        constructor(width: any, height: any);
        /**
         * @method egret.FixedSize#_apply
         * @param delegate {egret.StageDelegate}
         * @param designedResolutionWidth {number}
         * @param designedResolutionHeight {number}
         */
        _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
    }
    /**
     * @class egret.NoScale
     * @classdesc
     * @extends egret.ContentStrategy
     */
    class NoScale extends ContentStrategy {
        constructor();
        /**
         * @method egret.NoScale#_apply
         * @param delegate {egret.StageDelegate}
         * @param designedResolutionWidth {number}
         * @param designedResolutionHeight {number}
         */
        _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
    }
    class ShowAll extends ContentStrategy {
        constructor();
        /**
         * @method egret.NoScale#_apply
         * @param delegate {egret.StageDelegate}
         * @param designedResolutionWidth {number}
         * @param designedResolutionHeight {number}
         */
        _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
    }
    class FullScreen extends ContentStrategy {
        constructor();
        /**
         * @method egret.NoScale#_apply
         * @param delegate {egret.StageDelegate}
         * @param designedResolutionWidth {number}
         * @param designedResolutionHeight {number}
         */
        _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
    }
}
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
declare module egret {
    /**
     * @class egret.RenderFilter
     * @classdesc
     * @extends egret.HashObject
     */
    class RenderFilter extends HashObject {
        constructor();
        private static instance;
        /**
         * @method egret.egret.getInstance
         * @returns {RenderFilter}
         */
        static getInstance(): RenderFilter;
        _drawAreaList: Rectangle[];
        private _defaultDrawAreaList;
        private _originalData;
        /**
         * @method egret.egret#addDrawArea
         * @param area {egret.Rectangle}
         */
        addDrawArea(area: Rectangle): void;
        /**
         * @method egret.egret#clearDrawArea
         */
        clearDrawArea(): void;
        /**
         * 先检查有没有不需要绘制的区域，再把需要绘制的区域绘制出来
         * @method egret.egret#drawImage
         * @param renderContext {any}
         * @param data {RenderData}
         * @param sourceX {number}
         * @param sourceY {number}
         * @param sourceWidth {number}
         * @param sourceHeight {number}
         * @param destX {number}
         * @param destY {number}
         * @param destWidth {number}
         * @param destHeight {number}
         */
        drawImage(renderContext: RendererContext, data: RenderData, sourceX: number, sourceY: number, sourceWidth: number, sourceHeight: number, destX: number, destY: number, destWidth: number, destHeight: number, repeat?: any): void;
        private ignoreRender(data, rect, destX, destY);
        /**
         * @method egret.egret#getDrawAreaList
         * @returns {Rectangle}
         */
        getDrawAreaList(): Rectangle[];
    }
    /**
     * @class egret.RenderData
     * @interface
     * @classdesc
     */
    interface RenderData {
        /**
         * @member egret.RenderData#_worldTransform
         */
        _worldTransform: Matrix;
        /**
         * @member egret.RenderData#_worldBounds
         */
        _worldBounds: Rectangle;
        _texture_to_render: Texture;
        _getSize(resultRect: Rectangle): Rectangle;
    }
}
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
declare module egret {
    /**
     * @classdesc 注入器
     * @class egret.Injector
     */
    class Injector {
        /**
         * 储存类的映射规则
         */
        private static mapClassDic;
        /**
         * 以类定义为值进行映射注入，当第一次用getInstance()请求它的单例时才会被实例化。
         * @method egret.Injector.mapClass
         * @param whenAskedFor {any} whenAskedFor 传递类定义或类完全限定名作为需要映射的键。
         * @param instantiateClass {any} instantiateClass 传递类作为需要映射的值，它的构造函数必须为空。若不为空，请使用Injector.mapValue()方法直接注入实例。
         * @param named {string} named 可选参数，在同一个类作为键需要映射多条规则时，可以传入此参数区分不同的映射。在调用getInstance()方法时要传入同样的参数。
         */
        static mapClass(whenAskedFor: any, instantiateClass: any, named?: string): void;
        /**
         * 获取完全限定类名
         */
        private static getKey(hostComponentKey);
        private static mapValueDic;
        /**
         * 以实例为值进行映射注入,当用getInstance()请求单例时始终返回注入的这个实例。
         * @method egret.Injector.mapValue
         * @param whenAskedFor {any} 传递类定义或类的完全限定名作为需要映射的键。
         * @param useValue {any} 传递对象实例作为需要映射的值。
         * @param named {string} 可选参数，在同一个类作为键需要映射多条规则时，可以传入此参数区分不同的映射。在调用getInstance()方法时要传入同样的参数。
         */
        static mapValue(whenAskedFor: any, useValue: any, named?: string): void;
        /**
         * 检查指定的映射规则是否存在
         * @method egret.Injector.hasMapRule
         * @param whenAskedFor {any} 传递类定义或类的完全限定名作为需要映射的键。
         * @param named {string} 可选参数，在同一个类作为键需要映射多条规则时，可以传入此参数区分不同的映射。
         * @returns {boolean}
         */
        static hasMapRule(whenAskedFor: any, named?: string): boolean;
        /**
         * 获取指定类映射的单例，注意:这个方法总是返回全局唯一的实例，不会重复创建。
         * @method egret.Injector.getInstance
         * @param clazz {any} 类定义或类的完全限定名
         * @param named {string} 可选参数，若在调用mapClass()映射时设置了这个值，则要传入同样的字符串才能获取对应的单例
         * @returns {any}
         */
        static getInstance(clazz: any, named?: string): any;
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module egret {
    /**
     * @class egret.BlendMode
     * @classdesc
     * 提供混合模式可视效果的常量值的类。
     */
    class BlendMode {
        /**
         * 该显示对象出现在背景前面。显示对象的像素值会覆盖背景的像素值。在显示对象为透明的区域，背景是可见的。
         * @constant {string} egret.BlendMode.NORMAL
         */
        static NORMAL: string;
        /**
         * 将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。此设置通常用于使两个对象间的加亮溶解产生动画效果。
         * 例如，如果显示对象的某个像素的 RGB 值为 0xAAA633，背景像素的 RGB 值为 0xDD2200，则显示像素的结果 RGB 值为 0xFFC833（因为 0xAA + 0xDD > 0xFF，0xA6 + 0x22 = 0xC8，且 0x33 + 0x00 = 0x33）。
         * @constant {string} egret.BlendMode.ADD
         */
        static ADD: string;
    }
}
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
 *       derived from this software without specific prior written pemission.
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
declare module egret {
    /**
     * @class egret.DisplayObject
     * @extends egret.EventDispatcher
     * @classdesc 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时显示的所有对象。使用 DisplayObjectContainer 类排列显示列表中的显示对象。
     *
     * DisplayObjectContainer 对象可以有子显示对象，而其他显示对象是“叶”节点，只有父级和同级，没有子级。
     *
     * DisplayObject 类支持基本功能（如对象的 x 和 y 位置），也支持更高级的对象属性（如它的转换矩阵），所有显示对象都继承自 DisplayObject 类。
     *
     * DisplayObject 类包含若干广播事件。通常，任何特定事件的目标均为一个特定的 DisplayObject 实例。
     *
     * 若只有一个目标，则会将事件侦听器限制为只能放置到该目标上（在某些情况下，可放置到显示列表中该目标的祖代上），这意味着您可以向任何 DisplayObject 实例添加侦听器来侦听广播事件。
     *
     * 任何继承自DisplayObject的类都必须实现以下方法
     * _render();
     * _measureBounds()
     * 不允许重写以下方法
     * _draw();
     * getBounds();
     *
     */
    class DisplayObject extends EventDispatcher implements RenderData {
        __hack_local_matrix: any;
        constructor();
        _normalDirty: boolean;
        _setDirty(): void;
        getDirty(): boolean;
        private _sizeDirty;
        _setParentSizeDirty(): void;
        _setSizeDirty(): void;
        _clearDirty(): void;
        _clearSizeDirty(): void;
        /**
         * 表示 DisplayObject 的实例名称。
         * 通过调用父显示对象容器的 getChildByName() 方法，可以在父显示对象容器的子列表中标识该对象。
         * @member {string} egret.DisplayObject#name
         */
        name: string;
        _texture_to_render: Texture;
        _parent: DisplayObjectContainer;
        /**
         * 表示包含此显示对象的 DisplayObjectContainer 对象。【只读】
         * 使用 parent 属性可以指定高于显示列表层次结构中当前显示对象的显示对象的相对路径。
         * @member {egret.DisplayObjectContainer} egret.DisplayObject#parent
         */
        parent: DisplayObjectContainer;
        _parentChanged(parent: DisplayObjectContainer): void;
        /**
         * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。
         * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
         * @member {number} egret.DisplayObject#x
         */
        _x: number;
        x: number;
        _setX(value: number): void;
        /**
         * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 y 坐标。
         * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
         * @member {number} egret.DisplayObject#y
         */
        _y: number;
        y: number;
        _setY(value: number): void;
        /**
         * 表示从注册点开始应用的对象的水平缩放比例（百分比）。
         * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
         * 默认值为 1，即不缩放。
         * @member {number} egret.DisplayObject#scaleX
         * @default 1
         */
        _scaleX: number;
        scaleX: number;
        /**
         * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。
         * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
         * 默认值为 1，即不缩放。
         * @member {number} egret.DisplayObject#scaleY
         * @default 1
         */
        _scaleY: number;
        scaleY: number;
        /**
         * 表示从对象绝对锚点X。
         * @member {number} egret.DisplayObject#anchorOffsetX
         * @default 0
         */
        _anchorOffsetX: number;
        anchorOffsetX: number;
        /**
         * 表示从对象绝对锚点Y。
         * @member {number} egret.DisplayObject#anchorOffsetY
         * @default 0
         */
        _anchorOffsetY: number;
        anchorOffsetY: number;
        /**
         * 表示从对象相对锚点X。
         * @member {number} egret.DisplayObject#anchorX
         * @default 0
         */
        _anchorX: number;
        anchorX: number;
        _setAnchorX(value: number): void;
        /**
         * 表示从对象相对锚点Y。
         * @member {number} egret.DisplayObject#anchorY
         * @default 0
         */
        _anchorY: number;
        anchorY: number;
        _setAnchorY(value: number): void;
        /**
         * 显示对象是否可见。
         * 不可见的显示对象已被禁用。例如，如果实例的 visible=false，则无法单击该对象。
         * 默认值为 true 可见
         * @member {boolean} egret.DisplayObject#visible
         */
        _visible: boolean;
        visible: boolean;
        _setVisible(value: boolean): void;
        /**
         * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
         * 从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或减去 360 获得该范围内的值。例如，my_video.rotation = 450语句与 my_video.rotation = 90 是相同的。
         * @member {number} egret.DisplayObject#rotation
         * @default 0 默认值为 0 不旋转。
         */
        _rotation: number;
        rotation: number;
        /**
         * 表示指定对象的 Alpha 透明度值。
         * 有效值为 0（完全透明）到 1（完全不透明）。alpha 设置为 0 的显示对象是活动的，即使它们不可见。
         * @member {number} egret.DisplayObject#alpha
         *  @default 1 默认值为 1。
         */
        _alpha: number;
        alpha: number;
        /**
         * 表示DisplayObject的x方向斜切
         * @member {number} egret.DisplayObject#skewX
         * @default 0
         */
        _skewX: number;
        skewX: number;
        /**
         * 表示DisplayObject的y方向斜切
         * @member {number} egret.DisplayObject#skewY
         * @default 0
         */
        _skewY: number;
        skewY: number;
        /**
         * 指定此对象是否接收鼠标/触摸事件
         * @member {boolean} egret.DisplayObject#touchEnabled
         * @default false 默认为 false 即不可以接收。
         */
        _touchEnabled: boolean;
        touchEnabled: boolean;
        _setTouchEnabled(value: boolean): void;
        /**
         * BlendMode 类中的一个值，用于指定要使用的混合模式。
         * 内部绘制位图的方法有两种。 如果启用了混合模式或外部剪辑遮罩，则将通过向矢量渲染器添加有位图填充的正方形来绘制位图。 如果尝试将此属性设置为无效值，则运行时会将此值设置为 BlendMode.NORMAL。
         * @member {BlendMode} egret.DisplayObject#blendMode
         */
        blendMode: string;
        /**
         * 显示对象的滚动矩形范围。显示对象被裁切为矩形定义的大小，当您更改 scrollRect 对象的 x 和 y 属性时，它会在矩形内滚动。
         *  @member {egret.Rectangle} egret.DisplayObject#scrollRect
         */
        _scrollRect: Rectangle;
        scrollRect: Rectangle;
        _setScrollRect(value: Rectangle): void;
        /**
         * 测量宽度
         * @returns {number}
         */
        measuredWidth: number;
        /**
         * 测量高度
         * @returns {number}
         */
        measuredHeight: number;
        /**
         * 显式设置宽度
         * @returns {number}
         */
        _explicitWidth: number;
        explicitWidth: number;
        /**
         * 显式设置高度
         * @returns {number}
         */
        _explicitHeight: number;
        explicitHeight: number;
        /**
         * 表示显示对象的宽度，以像素为单位。
         * 宽度是根据显示对象内容的范围来计算的。优先顺序为 显式设置宽度 > 测量宽度。
         * @member {number} egret.DisplayObject#width
         * @returns {number}
         */
        /**
         * 显式设置宽度
         * @param value
         */
        width: number;
        /**
         * 表示显示对象的高度，以像素为单位。
         * 高度是根据显示对象内容的范围来计算的。优先顺序为 显式设置高度 > 测量高度。
         * @member {number} egret.DisplayObject#height
         * @returns {number}
         */
        /**
         * 显式设置高度
         * @param value
         */
        height: number;
        _hasWidthSet: Boolean;
        /**
         * @inheritDoc
         */
        _setWidth(value: number): void;
        _hasHeightSet: Boolean;
        /**
         * @inheritDoc
         */
        _setHeight(value: number): void;
        /**
         * 调用显示对象被指定的 mask 对象遮罩。
         * 要确保当舞台缩放时蒙版仍然有效，mask 显示对象必须处于显示列表的活动部分。但不绘制 mask 对象本身。
         * 将 mask 设置为 null 可删除蒙版。
         */
        mask: Rectangle;
        _worldTransform: Matrix;
        _worldBounds: Rectangle;
        worldAlpha: number;
        /**
         * @private
         * @param renderContext
         */
        _draw(renderContext: RendererContext): void;
        private drawCacheTexture(renderContext);
        /**
         * @private
         * @param renderContext
         */
        _updateTransform(): void;
        /**
         * 计算全局数据
         * @private
         */
        _calculateWorldTransform(): void;
        /**
         * @private
         * @param renderContext
         */
        _render(renderContext: RendererContext): void;
        private _cacheBounds;
        /**
         * 获取显示对象的测量边界
         * @method egret.DisplayObject#getBounds
         * @param resultRect {Rectangle} 可选参数，传入用于保存结果的Rectangle对象，避免重复创建对象。
         * @param calculateAnchor {boolean} 可选参数，是否会计算锚点。
         * @returns {Rectangle}
         */
        getBounds(resultRect?: Rectangle, calculateAnchor?: boolean): Rectangle;
        private destroyCacheBounds();
        /**
         * @private
         * @returns {Matrix}
         */
        private static identityMatrixForGetConcatenated;
        _getConcatenatedMatrix(): Matrix;
        /**
         * 将 point 对象从显示对象的（本地）坐标转换为舞台（全局）坐标。
         * @method egret.DisplayObject#localToGlobal
         * @param x {number} 本地x坐标
         * @param y {number} 本地y坐标
         * @param resultPoint {Point} 可选参数，传入用于保存结果的Point对象，避免重复创建对象。
         * @returns {egret.Point} 具有相对于舞台的坐标的 Point 对象。
         */
        localToGlobal(x?: number, y?: number, resultPoint?: Point): Point;
        /**
         * 将指定舞台坐标（全局）转换为显示对象（本地）坐标。
         * @method egret.DisplayObject#globalToLocal
         * @param x {number} 全局x坐标
         * @param y {number} 全局y坐标
         * @param resultPoint {Point} 可选参数，传入用于保存结果的Point对象，避免重复创建对象。
         * @returns {egret.Point} 具有相对于显示对象的坐标的 Point 对象。
         */
        globalToLocal(x?: number, y?: number, resultPoint?: Point): Point;
        /**
         * 检测指定坐标是否在显示对象内
         * @method egret.DisplayObject#hitTest
         * @param x {number} 检测坐标的x轴
         * @param y {number} 检测坐标的y轴
         * @param ignoreTouchEnabled {boolean} 是否忽略TouchEnabled
         * @returns {*}
         */
        hitTest(x: number, y: number, ignoreTouchEnabled?: boolean): DisplayObject;
        private _hitTestPointTexture;
        /**
         * 计算显示对象，以确定它是否与 x 和 y 参数指定的点重叠或相交。x 和 y 参数指定舞台的坐标空间中的点，而不是包含显示对象的显示对象容器中的点（除非显示对象容器是舞台）。
         * 注意，不要在大量物体中使用精确碰撞像素检测，这回带来巨大的性能开销
         * @method egret.DisplayObject#hitTestPoint
         * @param x {number}  要测试的此对象的 x 坐标。
         * @param y {number}  要测试的此对象的 y 坐标。
         * @param shapeFlag {boolean} 是检查对象 (true) 的实际像素，还是检查边框 (false) 的实际像素。
         * @returns {boolean} 如果显示对象与指定的点重叠或相交，则为 true；否则为 false。
         */
        hitTestPoint(x: number, y: number, shapeFlag?: boolean): boolean;
        _getMatrix(parentMatrix?: Matrix): Matrix;
        _getSize(resultRect: Rectangle): Rectangle;
        private _rectW;
        private _rectH;
        /**
         * 测量显示对象坐标与大小
         */
        _measureSize(resultRect: Rectangle): Rectangle;
        /**
         * 测量显示对象坐标，这个方法需要子类重写
         * @returns {egret.Rectangle}
         * @private
         */
        _measureBounds(): Rectangle;
        _getOffsetPoint(): Point;
        _onAddToStage(): void;
        _onRemoveFromStage(): void;
        _stage: Stage;
        /**
         * 显示对象的舞台。【只读】
         * 例如，您可以创建多个显示对象并加载到显示列表中，每个显示对象的 stage 属性是指相同的 Stage 对象。
         * 如果显示对象未添加到显示列表，则其 stage 属性会设置为 null。
         * @member {number} egret.DisplayObject#stage
         * @returns {egret.Stage}
         */
        stage: Stage;
        static _enterFrameCallBackList: any[];
        static _renderCallBackList: any[];
        addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;
        removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
        dispatchEvent(event: Event): boolean;
        _dispatchPropagationEvent(event: Event, list: DisplayObject[], targetIndex?: number): void;
        willTrigger(type: string): boolean;
        private _cacheAsBitmap;
        cacheAsBitmap: boolean;
        private renderTexture;
        private _makeBitmapCache();
        private _cacheDirty;
        private _setCacheDirty(dirty?);
        static getTransformBounds(bounds: Rectangle, mtx: Matrix): Rectangle;
        /**
         * beta功能，请勿调用此方法
         */
        private _colorTransform;
        colorTransform: ColorTransform;
    }
    class ColorTransform {
        matrix: number[];
        updateColor(r: number, g: number, b: number, a: number, addR: number, addG: number, addB: number, addA: number): void;
    }
}
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
declare module egret {
    /**
     * @class egret.DisplayObjectContainer
     * @classdesc
     * DisplayObjectContainer 类是可用作显示列表中显示对象容器的所有对象的基类。
     * 该显示列表管理运行时中显示的所有对象。使用 DisplayObjectContainer 类排列显示列表中的显示对象。每个 DisplayObjectContainer 对象都有自己的子级列表，用于组织对象的 Z 轴顺序。Z 轴顺序是由前至后的顺序，可确定哪个对象绘制在前，哪个对象绘制在后等。
     */
    class DisplayObjectContainer extends DisplayObject {
        static __EVENT__ADD_TO_STAGE_LIST: DisplayObject[];
        static __EVENT__REMOVE_FROM_STAGE_LIST: DisplayObject[];
        constructor();
        _touchChildren: boolean;
        /**
         * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
         * 默认值为 true 即可以接收。
         * @member {boolean} egret.DisplayObjectContainer#touchChildren
         */
        touchChildren: boolean;
        _children: DisplayObject[];
        /**
         * 返回此对象的子项数目。【只读】
         * @member {number} egret.DisplayObjectContainer#numChildren
         */
        numChildren: number;
        /**
         * 更改现有子项在显示对象容器中的位置。这会影响子对象的分层。
         * @method egret.DisplayObjectContainer#setChildIndex
         * @param child {egret.DisplayObject} 要为其更改索引编号的 DisplayObject 子实例。
         * @param index {number} 生成的 child 显示对象的索引编号。当新的索引编号小于0或大于已有子元件数量时，新加入的DisplayObject对象将会放置于最上层。
         */
        setChildIndex(child: DisplayObject, index: number): void;
        private doSetChildIndex(child, index);
        /**
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。子项将被添加到该 DisplayObjectContainer 实例中其他所有子项的前（上）面。（要将某子项添加到特定索引位置，请使用 addChildAt() 方法。）
         * @method egret.DisplayObjectContainer#addChild
         * @param child {egret.DisplayObject} 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @returns {egret.DisplayObject} 在 child 参数中传递的 DisplayObject 实例。
         */
        addChild(child: DisplayObject): DisplayObject;
        /**
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。该子项将被添加到指定的索引位置。索引为 0 表示该 DisplayObjectContainer 对象的显示列表的后（底）部。如果索引值为-1，则表示该DisplayObjectContainer 对象的显示列表的前（上）部。
         * @method egret.DisplayObjectContainer#addChildAt
         * @param child {egret.DisplayObject} 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @param index {number} 添加该子项的索引位置。 如果指定当前占用的索引位置，则该位置以及所有更高位置上的子对象会在子级列表中上移一个位置。
         * @returns {egret.DisplayObject} 在 child 参数中传递的 DisplayObject 实例。
         */
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        _doAddChild(child: DisplayObject, index: number, notifyListeners?: boolean): DisplayObject;
        /**
         * 将一个 DisplayObject 子实例从 DisplayObjectContainer 实例中移除。
         * @method egret.DisplayObjectContainer#removeChild
         * @param child {egret.DisplayObject} 要删除的 DisplayObject 实例。
         * @returns {egret.DisplayObject} 在 child 参数中传递的 DisplayObject 实例。
         */
        removeChild(child: DisplayObject): DisplayObject;
        /**
         * 从 DisplayObjectContainer 的子列表中指定的 index 位置删除子 DisplayObject。
         * @method egret.DisplayObjectContainer#removeChildAt
         * @param index {number} 要删除的 DisplayObject 的子索引。
         * @returns {egret.DisplayObject} 已删除的 DisplayObject 实例。
         */
        removeChildAt(index: number): DisplayObject;
        _doRemoveChild(index: number, notifyListeners?: boolean): DisplayObject;
        /**
         * 返回位于指定索引处的子显示对象实例。
         * @method egret.DisplayObjectContainer#getChildAt
         * @param index {number} 子对象的索引位置。
         * @returns {egret.DisplayObject} 位于指定索引位置处的子显示对象。
         */
        getChildAt(index: number): DisplayObject;
        /**
         * 确定指定显示对象是 DisplayObjectContainer 实例的子项还是该实例本身。搜索包括整个显示列表（其中包括此 DisplayObjectContainer 实例）。孙项、曾孙项等，每项都返回 true。
         * @method egret.DisplayObjectContainer#contains
         * @param child {egret.DisplayObject} 要测试的子对象。
         * @returns {boolean} 如果指定的显示对象为DisplayObjectContainer该实例本身，则返回true，如果指定的显示对象为当前实例子项，则返回false。
         */
        contains(child: DisplayObject): boolean;
        /**
         * 在子级列表中两个指定的索引位置，交换子对象的 Z 轴顺序（前后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @method egret.DisplayObjectContainer#swapChildrenAt
         * @param index1 {number} 第一个子对象的索引位置。
         * @param index2 {number} 第二个子对象的索引位置。
         */
        swapChildrenAt(index1: number, index2: number): void;
        /**
         * 交换两个指定子对象的 Z 轴顺序（从前到后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @method egret.DisplayObjectContainer#swapChildren
         * @param child1 {egret.DisplayObject} 第一个子对象。
         * @param child2 {egret.DisplayObject} 第二个子对象。
         */
        swapChildren(child1: DisplayObject, child2: DisplayObject): void;
        private _swapChildrenAt(index1, index2);
        /**
         * 返回 DisplayObject 的 child 实例的索引位置。
         * @method egret.DisplayObjectContainer#getChildIndex
         * @param child {egret.DisplayObject} 要标识的 DisplayObject 实例。
         * @returns {number} 要标识的子显示对象的索引位置。
         */
        getChildIndex(child: DisplayObject): number;
        /**
         * 从 DisplayObjectContainer 实例的子级列表中删除所有 child DisplayObject 实例。
         * @method egret.DisplayObjectContainer#removeChildren
         */
        removeChildren(): void;
        _updateTransform(): void;
        _render(renderContext: RendererContext): void;
        /**
         * @see egret.DisplayObject._measureBounds
         * @returns {null}
         * @private
         */
        _measureBounds(): Rectangle;
        /**
         * 检测指定坐标是否在显示对象内
         * @method egret.DisplayObjectContainer#hitTest
         * @see egret.DisplayObject.hitTest
         * @param x {number} 检测坐标的x轴
         * @param y {number} 检测坐标的y轴
         * @param ignoreTouchEnabled {boolean} 是否忽略TouchEnabled
         * @returns {egret.DisplayObject} 返回所发生碰撞的DisplayObject对象
         */
        hitTest(x: number, y: number, ignoreTouchEnabled?: boolean): DisplayObject;
        _onAddToStage(): void;
        _onRemoveFromStage(): void;
        /**
         * 返回具有指定名称的子显示对象。
         * @method egret.DisplayObjectContainer#getChildByName
         * @param name {string} 要返回的子项的名称。
         * @returns {egret.DisplayObject} 具有指定名称的子显示对象。
         */
        getChildByName(name: string): DisplayObject;
    }
}
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
declare module egret {
    /**
     * @class egret.Stage
     * @classdesc Stage 类代表主绘图区。
     */
    class Stage extends DisplayObjectContainer {
        static _invalidateRenderFlag: boolean;
        /**
         * 调用 invalidate() 方法后，在显示列表下次呈现时，Egret 会向每个已注册侦听 render 事件的显示对象发送一个 render 事件。
         * 每次您希望 Egret 发送 render 事件时，都必须调用 invalidate() 方法。
         * @method egret.Stage#invalidate
         */
        invalidate(): void;
        constructor(width?: number, height?: number);
        /**
         * 一个 StageScaleMode 类中指定要使用哪种缩放模式的值。以下是有效值：
         * StageScaleMode.EXACT_FIT -- 整个应用程序在指定区域中可见，但不尝试保持原始高宽比。可能会发生扭曲，应用程序可能会拉伸或压缩显示。
         * StageScaleMode.SHOW_ALL -- 整个应用程序在指定区域中可见，且不发生扭曲，同时保持应用程序的原始高宽比。应用程序的可能会显示边框。
         * StageScaleMode.NO_BORDER -- 整个应用程序填满指定区域，不发生扭曲，但有可能进行一些裁切，同时保持应用程序的原始高宽比。
         * StageScaleMode.NO_SCALE -- 整个应用程序的大小固定，因此，即使播放器窗口的大小更改，它也会保持不变。如果播放器窗口比内容小，则可能进行一些裁切。
         * @member {number} egret.Stage#scaleMode
         */
        private _scaleMode;
        scaleMode: string;
        private _stageWidth;
        /**
         * 舞台宽度（坐标系宽度，非设备宽度）
         * @member {number} egret.Stage#stageWidth
         */
        stageWidth: number;
        private _stageHeight;
        /**
         * 舞台高度（坐标系高度，非设备高度）
         * @member {number} egret.Stage#stageHeight
         */
        stageHeight: number;
        /**
         * @member egret.Stage#hitTest
         * @see egret.DisplayObject#hitTest
         * @param x
         * @param y
         * @returns {egret.DisplayObject}
         */
        hitTest(x: any, y: any, ignoreTouchEnabled?: boolean): DisplayObject;
        /**
         * 返回舞台尺寸范围
         * @member egret.Stage#getBounds
         * @see egret.DisplayObject#getBounds
         * @param resultRect {egret.Rectangle} 可选参数，传入用于保存结果的Rectangle对象，避免重复创建对象。
         * @returns {egret.Rectangle}
         */
        getBounds(resultRect?: Rectangle): Rectangle;
        _updateTransform(): void;
        focus: DisplayObject;
    }
}
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
declare module egret {
    /**
     * StageScaleMode 类为 Stage.scaleMode 属性提供值。
     * @class egret.StageScaleMode
     */
    class StageScaleMode {
        /**
         * 指定整个应用程序填满指定区域，不会发生扭曲，但有可能会进行一些裁切，同时保持应用程序的原始高宽比。
         * @member {string} egret.StageScaleMode.NO_BORDER
         */
        static NO_BORDER: string;
        /**
         * 指定应用程序的大小是固定的，因此，即使在更改播放器窗口大小时，它仍然保持不变。如果播放器窗口比内容小，则可能进行一些裁切。
         * @member {string} egret.StageScaleMode.NO_SCALE
         */
        static NO_SCALE: string;
        /**
         * 指定整个应用程序在指定区域中可见，且不会发生扭曲，同时保持应用程序的原始高宽比。应用程序的两侧可能会显示边框。
         * @member {string} egret.StageScaleMode.SHOW_ALL
         */
        static SHOW_ALL: string;
        /**
         * 指定整个应用程序在指定区域中可见，但不尝试保持原始高宽比。可能会发生扭曲。
         * @member {string} egret.StageScaleMode.EXACT_FIT
         */
        static EXACT_FIT: string;
    }
}
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
declare module egret {
    /**
     * @class egret.ScrollView
     * @classdesc
     * ScrollView 是用于滑动的辅助类，将一个显示对象传入构造函数即可
     * @extends egret.DisplayObjectContainer
     */
    class ScrollView extends DisplayObjectContainer {
        private _lastTouchPosition;
        private _lastTouchTime;
        private _lastTouchEvent;
        private _velocitys;
        /**
         * 创建一个 egret.ScrollView 对象
         * @method egret.ScrollView#constructor
         * @param content {egret.DisplayObject} 需要滚动的对象
         */
        constructor(content?: DisplayObject);
        _content: DisplayObject;
        /**
         * 设置需要滚动的对象
         * @method egret.ScrollView#setContent
         * @param content {egret.DisplayObject} 需要滚动的对象
         */
        setContent(content: DisplayObject): void;
        private _verticalScrollPolicy;
        /**
         * 垂直滚动条显示策略，on/off/auto。
         * @member egret.ScrollView#verticalScrollPolicy
         */
        verticalScrollPolicy: string;
        private _horizontalScrollPolicy;
        /**
         * 水平滚动条显示策略，on/off/auto。
         * @member egret.ScrollView#horizontalScrollPolicy
         */
        horizontalScrollPolicy: string;
        _scrollLeft: number;
        /**
         * 获取或设置水平滚动位置,
         * @member {number} egret.ScrollView#scrollLeft
         * @returns {number}
         */
        scrollLeft: number;
        _scrollTop: number;
        /**
         * 获取或设置垂直滚动位置,
         * @member {number} egret.ScrollView#scrollTop
         * @returns {number}
         */
        scrollTop: number;
        /**
         * 设置滚动位置
         * @method egret.ScrollView#setScrollPosition
         * @param top {number} 垂直滚动位置
         * @param left {number} 水平滚动位置
         * @param isOffset {boolean} 可选参数，默认是false，是否是滚动增加量，如 top=1 代表往上滚动1像素
         */
        setScrollPosition(top: number, left: number, isOffset?: boolean): void;
        /**
         * @inheritDoc
         */
        _setWidth(value: number): void;
        /**
         * @inheritDoc
         */
        _setHeight(value: number): void;
        _updateContentPosition(): void;
        private _hCanScroll;
        private _vCanScroll;
        private _checkScrollPolicy();
        private __checkScrollPolicy(policy, contentLength, viewLength);
        _addEvents(): void;
        _removeEvents(): void;
        _onTouchBegin(e: TouchEvent): void;
        delayTouchBeginEvent: any;
        touchBeginTimer: any;
        _onTouchBeginCapture(event: TouchEvent): void;
        private _onTouchEndCapture(event);
        private _onTouchBeginTimer();
        private dispatchPropagationEvent(event);
        _dispatchPropagationEvent(event: Event, list: DisplayObject[], targetIndex?: number): void;
        _onTouchMove(event: TouchEvent): void;
        _onTouchEnd(event: TouchEvent): void;
        _onEnterFrame(event: Event): void;
        private _logTouchEvent(e);
        private _getPointChange(e);
        private _calcVelocitys(e);
        _getContentWidth(): number;
        _getContentHeight(): number;
        getMaxScrollLeft(): number;
        getMaxScrollTop(): number;
        static weight: number[];
        private _moveAfterTouchEnd();
        setScrollTop(scrollTop: number, duration?: number): Tween;
        setScrollLeft(scrollLeft: number, duration?: number): Tween;
        private getAnimationDatas(pixelsPerMS, curPos, maxPos);
        private cloneTouchEvent(event);
        private throwNotSupportedError();
        /**
         * @method egret.ScrollView#addChild
         * @deprecated
         * @param child {DisplayObject}
         * @returns {DisplayObject}
         */
        addChild(child: DisplayObject): DisplayObject;
        /**
         * @method egret.ScrollView#addChildAt
         * @deprecated
         * @param child {DisplayObject}
         * @param index {number}
         * @returns {DisplayObject}
         */
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        /**
         * @method egret.ScrollView#removeChild
         * @deprecated
         * @param child {DisplayObject}
         * @returns {DisplayObject}
         */
        removeChild(child: DisplayObject): DisplayObject;
        /**
         * @method egret.ScrollView#removeChildAt
         * @deprecated
         * @param index {number}
         * @returns {DisplayObject}
         */
        removeChildAt(index: number): DisplayObject;
        /**
         * @method egret.ScrollView#setChildIndex
         * @deprecated
         * @param child {DisplayObject}
         * @param index {number}
         */
        setChildIndex(child: DisplayObject, index: number): void;
        /**
         * @method egret.ScrollView#swapChildren
         * @deprecated
         * @param child1 {DisplayObject}
         * @param child2 {DisplayObject}
         */
        swapChildren(child1: DisplayObject, child2: DisplayObject): void;
        /**
         * @method egret.ScrollView#swapChildrenAt
         * @deprecated
         * @param index1 {number}
         * @param index2 {number}
         */
        swapChildrenAt(index1: number, index2: number): void;
    }
}
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
declare module egret {
    /**
     * @class egret.Scroller
     * @classdesc
     * egret.Scroller已废弃，请使用egret.ScrollView
     * @extends egret.DisplayObject
     */
    class Scroller extends ScrollView {
        content: DisplayObject;
        /**
         * egret.Scroller已废弃，请使用egret.ScrollView
         * @method egret.Scroller#constructor
         * @param content {egret.DisplayObject} 需要滚动的对象
         * @param width {number} Scroller的宽度，默认值为content的宽度
         * @param height {number} Scroller的高度，默认值为content的高度
         */
        constructor(content: DisplayObject, width?: number, height?: number);
        /**
         * 是否启用水平滚动
         * @member {boolean} egret.Scroller#scrollXEnabled
         * @returns {boolean}
         */
        scrollXEnabled: boolean;
        /**
         * 是否启用垂直滚动
         * @member {boolean} egret.Scroller#scrollYEnabled
         * @returns {boolean}
         */
        scrollYEnabled: boolean;
    }
}
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
declare module egret {
    /**
     * @class egret.BitmapFillMode
     * @classdesc
     * BitmapFillMode 类定义Bitmap的图像填充方式。
     * BitmapFillMode 类定义了调整大小模式的一个枚举，这些模式确定 Bitmap 如何填充由布局系统指定的尺寸。
     */
    class BitmapFillMode {
        /**
         * 重复位图以填充区域。
         * @constant {string} egret.BitmapFillMode.REPEAT
         */
        static REPEAT: string;
        /**
         * 位图填充拉伸以填充区域。
         * @constant {string} egret.BitmapFillMode.SCALE
         */
        static SCALE: string;
    }
}
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
declare module egret {
    /**
     * @class egret.Bitmap
     * @classdesc
     * Bitmap 类表示用于表示位图图像的显示对象。
     * @extends egret.DisplayObject
     */
    class Bitmap extends DisplayObject {
        /**
         * 全部Bitmap是否开启DEBUG模式
         * @member {boolean} egret.Bitmap.debug
         */
        static debug: boolean;
        private static renderFilter;
        constructor(texture?: Texture);
        /**
         * 单个Bitmap是否开启DEBUG模式
         * @member {boolean} egret.Bitmap#debug
         */
        debug: boolean;
        /**
         * debug边框颜色，默认值为红色
         * @member {number} egret.Bitmap#debugColor
         */
        debugColor: number;
        private _texture;
        /**
         * 渲染纹理
         * @member {egret.Texture} egret.Bitmap#texture
         */
        texture: Texture;
        /**
         * 矩形区域，它定义位图对象的九个缩放区域。此属性仅当fillMode为BitmapFillMode.SCALE时有效。
         * scale9Grid的x、y、width、height分别代表九宫图中中间那块的左上点的x、y以及中间方块的宽高。
         * @member {egret.Texture} egret.Bitmap#scale9Grid
         */
        scale9Grid: Rectangle;
        /**
         * 确定位图填充尺寸的方式。
         * 设置为 BitmapFillMode.REPEAT时，位图将重复以填充区域；BitmapFillMode.SCALE时，位图将拉伸以填充区域。
         * 默认值：BitmapFillMode.SCALE。
         * @member {egret.Texture} egret.Bitmap#fillMode
         */
        fillMode: string;
        _render(renderContext: RendererContext): void;
        static _drawBitmap(renderContext: RendererContext, destW: number, destH: number, thisObject: any): void;
        /**
         * 绘制平铺位图
         */
        private static drawRepeatImage(renderContext, data, destWidth, destHeight, repeat);
        /**
         * 绘制九宫格位图
         */
        private static drawScale9GridImage(renderContext, data, scale9Grid, destWidth, destHeight);
        /**
         * @see egret.DisplayObject.measureBounds
         * @returns {egret.Rectangle}
         * @private
         */
        _measureBounds(): Rectangle;
    }
}
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
declare module egret {
    /**
     * @classdesc
     * @class egret.BitmapText
     * 位图字体采用了Bitmap+SpriteSheet的方式来渲染文字。
     * @extends egret.DisplayObjectContainer
     */
    class BitmapText extends DisplayObjectContainer {
        /**
         * 设置文本
         */
        private _text;
        private _textChanged;
        /**
         * 显示的文本内容
         * @member {string} egret.BitmapText#text
         *
         */
        text: string;
        /**
         * BitmapTextSpriteSheet对象，缓存了所有文本的位图纹理
         * @member {egret.BitmapTextSpriteSheet} egret.BitmapText#spriteSheet
         */
        spriteSheet: BitmapTextSpriteSheet;
        private _bitmapPool;
        constructor();
        _updateTransform(): void;
        _renderText(forMeasureContentSize?: boolean): Rectangle;
        _measureBounds(): Rectangle;
    }
}
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
declare module egret {
    /**
     * @class egret.Graphics
     * @classdesc
     * Graphics 类包含一组可用来创建矢量形状的方法。支持绘制的显示对象包括 Sprite 和 Shape 对象。这些类中的每一个类都包括 graphics 属性，该属性是一个 Graphics 对象。
     * 以下是为便于使用而提供的一些辅助函数：drawRect()、drawRoundRect()、drawCircle() 和 drawEllipse()。
     */
    class Graphics {
        private canvasContext;
        private commandQueue;
        private renderContext;
        private strokeStyleColor;
        private fillStyleColor;
        constructor();
        /**
         * 指定一种简单的单一颜色填充，在绘制时该填充将在随后对其他 Graphics 方法（如 lineTo() 或 drawCircle()）的调用中使用。
         * 调用 clear() 方法会清除填充。
         * @method egret.Graphics#beginFill
         * @param color {number} 填充的颜色
         * @param alpha {number} 填充的 Alpha 值
         */
        beginFill(color: number, alpha?: number): void;
        private _setStyle(colorStr);
        /**
         * 绘制一个矩形
         * @method egret.Graphics#drawRect
         * @param x {number} 圆心相对于父显示对象注册点的 x 位置（以像素为单位）。
         * @param y {number} 相对于父显示对象注册点的圆心的 y 位置（以像素为单位）。
         * @param width {number} 矩形的宽度（以像素为单位）。
         * @param height {number} 矩形的高度（以像素为单位）。
         * @param r? {number} 圆的半径（以像素为单位）,不设置就为直角矩形。
         */
        drawRect(x: number, y: number, width: number, height: number): void;
        /**
         * 绘制一个圆。
         * @method egret.Graphics#drawCircle
         * @param x {number} 圆心相对于父显示对象注册点的 x 位置（以像素为单位）。
         * @param y {number} 相对于父显示对象注册点的圆心的 y 位置（以像素为单位）。
         * @param r {number} 圆的半径（以像素为单位）。
         */
        drawCircle(x: number, y: number, r: number): void;
        /**
         * 绘制一个圆角矩形
         * @method egret.Graphics#drawRect
         * @param x {number} 圆心相对于父显示对象注册点的 x 位置（以像素为单位）。
         * @param y {number} 相对于父显示对象注册点的圆心的 y 位置（以像素为单位）。
         * @param width {number} 矩形的宽度（以像素为单位）。
         * @param height {number} 矩形的高度（以像素为单位）。
         * @param ellipseWidth {number} 用于绘制圆角的椭圆的宽度（以像素为单位）。
         * @param ellipseHeight {number} 用于绘制圆角的椭圆的高度（以像素为单位）。 （可选）如果未指定值，则默认值与为 ellipseWidth 参数提供的值相匹配。
         */
        drawRoundRect(x: number, y: number, width: number, height: number, ellipseWidth: number, ellipseHeight?: number): void;
        /**
         * 绘制一个椭圆。
         * @method egret.Graphics#drawEllipse
         * @param x {number} 一个表示相对于父显示对象注册点的水平位置的数字（以像素为单位）。
         * @param y {number} 一个表示相对于父显示对象注册点的垂直位置的数字（以像素为单位）。
         * @param width {number} 矩形的宽度（以像素为单位）。
         * @param height {number} 矩形的高度（以像素为单位）。
         */
        drawEllipse(x: number, y: number, width: number, height: number): void;
        /**
         * 指定一种线条样式以用于随后对 lineTo() 或 drawCircle() 等 Graphics 方法的调用。
         * @method egret.Graphics#lineStyle
         * @param thickness {number} 一个整数，以点为单位表示线条的粗细，有效值为 0 到 255。如果未指定数字，或者未定义该参数，则不绘制线条。如果传递的值小于 0，则默认值为 0。值 0 表示极细的粗细；最大粗细为 255。如果传递的值大于 255，则默认值为 255。
         * @param color {number} 线条的十六进制颜色值（例如，红色为 0xFF0000，蓝色为 0x0000FF 等）。如果未指明值，则默认值为 0x000000（黑色）。可选。
         * @param alpha {number} 表示线条颜色的 Alpha 值的数字；有效值为 0 到 1。如果未指明值，则默认值为 1（纯色）。如果值小于 0，则默认值为 0。如果值大于 1，则默认值为 1。
         * @param pixelHinting {boolean} 布尔型值，指定是否提示笔触采用完整像素。它同时影响曲线锚点的位置以及线条笔触大小本身。在 pixelHinting 设置为 true 的情况下，线条宽度会调整到完整像素宽度。在 pixelHinting 设置为 false 的情况下，对于曲线和直线可能会出现脱节。
         * @param scaleMode {string} 用于指定要使用的比例模式
         * @param caps {string} 用于指定线条末端处端点类型的 CapsStyle 类的值。
         * @param joints {string} 指定用于拐角的连接外观的类型。
         * @param miterLimit {number} 用于表示剪切斜接的极限值的数字。
         */
        lineStyle(thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number): void;
        /**
         * 使用当前线条样式绘制一条从当前绘图位置开始到 (x, y) 结束的直线；当前绘图位置随后会设置为 (x, y)。
         * @method egret.Graphics#lineTo
         * @param x {number} 一个表示相对于父显示对象注册点的水平位置的数字（以像素为单位）。
         * @param y {number} 一个表示相对于父显示对象注册点的垂直位置的数字（以像素为单位）。
         */
        lineTo(x: number, y: number): void;
        /**
         * 使用当前线条样式和由 (controlX, controlY) 指定的控制点绘制一条从当前绘图位置开始到 (anchorX, anchorY) 结束的二次贝塞尔曲线。当前绘图位置随后设置为 (anchorX, anchorY)。
         * 如果在调用 moveTo() 方法之前调用了 curveTo() 方法，则当前绘图位置的默认值为 (0, 0)。如果缺少任何一个参数，则此方法将失败，并且当前绘图位置不改变。
         * 绘制的曲线是二次贝塞尔曲线。二次贝塞尔曲线包含两个锚点和一个控制点。该曲线内插这两个锚点，并向控制点弯曲。
         * @method egret.Graphics#curveTo
         * @param controlX {number} 一个数字，指定控制点相对于父显示对象注册点的水平位置。
         * @param controlY {number} 一个数字，指定控制点相对于父显示对象注册点的垂直位置。
         * @param anchorX {number} 一个数字，指定下一个锚点相对于父显示对象注册点的水平位置。
         * @param anchorY {number} 一个数字，指定下一个锚点相对于父显示对象注册点的垂直位置。
         */
        curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number): void;
        /**
         * 将当前绘图位置移动到 (x, y)。如果缺少任何一个参数，则此方法将失败，并且当前绘图位置不改变。
         * @method egret.Graphics#moveTo
         * @param x {number} 一个表示相对于父显示对象注册点的水平位置的数字（以像素为单位）。
         * @param y {number} 一个表示相对于父显示对象注册点的垂直位置的数字（以像素为单位）。
         */
        moveTo(x: number, y: number): void;
        /**
         * 清除绘制到此 Graphics 对象的图形，并重置填充和线条样式设置。
         * @method egret.Graphics#clear
         */
        clear(): void;
        /**
         * 对从上一次调用 beginFill()方法之后添加的直线和曲线应用填充。
         * @method egret.Graphics#endFill
         */
        endFill(): void;
        _draw(renderContext: RendererContext): void;
        private _minX;
        private _minY;
        private _maxX;
        private _maxY;
        private checkRect(x, y, w, h);
        private _lastX;
        private _lastY;
        private checkPoint(x, y);
    }
}
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
declare module egret {
    /**
     * @class egret.Shape
     * @classdesc 此类用于使用 Egret 绘图应用程序编程接口 (API) 创建简单形状。Shape 类包括 graphics 属性，该属性使您可以从 Graphics 类访问方法。
     */
    class Shape extends DisplayObject {
        constructor();
        /**
         * 获取 Shape 中的 Graphics 对象。【只读】
         * @member {egret.Graphics} egret.Shape#graphics
         */
        private _graphics;
        graphics: Graphics;
        _render(renderContext: RendererContext): void;
    }
}
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
declare module egret {
    /**
     * @class egret.Sprite
     * @classdesc Sprite 类是基本显示列表构造块：一个可显示图形并且也可包含子项的显示列表节点。Sprite 对象与影片剪辑类似，但没有时间轴。Sprite 是不需要时间轴的对象的相应基类。例如，Sprite 将是通常不使用时间轴的用户界面 (UI) 组件的逻辑基类。
     */
    class Sprite extends DisplayObjectContainer {
        constructor();
        /**
         * 获取 Sprite 中的 Graphics 对象。【只读】
         * 指定属于此 sprite 的 Graphics 对象，在此 sprite 中可执行矢量绘图命令。
         * @member {egret.Graphics} egret.Sprite#graphics
         */
        private _graphics;
        graphics: Graphics;
        _render(renderContext: RendererContext): void;
    }
}
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
declare module egret {
    /**
     * @class egret.TextField
     * @classdesc
     * TextField是egret的文本渲染类，采用浏览器/设备的API进行渲染，在不同的浏览器/设备中由于字体渲染方式不一，可能会有渲染差异
     * 如果开发者希望所有平台完全无差异，请使用BitmapText
     * @extends egret.DisplayObject
     */
    class TextField extends DisplayObject {
        static default_fontFamily: string;
        private isInput();
        _inputEnabled: boolean;
        _setTouchEnabled(value: boolean): void;
        /**
         * 文本字段的类型。
         * 以下 TextFieldType 常量中的任一个：TextFieldType.DYNAMIC（指定用户无法编辑的动态文本字段），或 TextFieldType.INPUT（指定用户可以编辑的输入文本字段）。
         * 默认值为 dynamic。
         * @member {string} egret.TextField#type
         */
        _type: string;
        private _inputUtils;
        type: string;
        _setType(value: string): void;
        text: string;
        _getText(): string;
        _setTextDirty(): void;
        /**
         * 作为文本字段中当前文本的字符串
         * @member {string} egret.TextField#text
         */
        _text: string;
        _setBaseText(value: string): void;
        _setText(value: string): void;
        /**
         * 指定文本字段是否是密码文本字段。
         * 如果此属性的值为 true，则文本字段被视为密码文本字段，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，则不会将文本字段视为密码文本字段。
         * 默认值为 false。
         * @member {boolean} egret.TextInput#displayAsPassword
         */
        _displayAsPassword: boolean;
        displayAsPassword: boolean;
        _setDisplayAsPassword(value: boolean): void;
        /**
         * 使用此文本格式的文本的字体名称，以字符串形式表示。
         * 默认值 Arial。
         * @member {any} egret.TextField#fontFamily
         */
        _fontFamily: string;
        fontFamily: string;
        _setFontFamily(value: string): void;
        /**
         * 使用此文本格式的文本的大小（以像素为单位）。
         * 默认值为 30。
         * @member {number} egret.TextField#size
         */
        _size: number;
        size: number;
        _setSize(value: number): void;
        /**
         * 表示使用此文本格式的文本是否为斜体。
         * 如果值为 true，则文本为斜体；false，则为不使用斜体。
         * 默认值为 false。
         * @member {boolean} egret.TextField#italic
         */
        _italic: boolean;
        italic: boolean;
        _setItalic(value: boolean): void;
        /**
         * 指定文本是否为粗体字。
         * 如果值为 true，则文本为粗体字；false，则为非粗体字。
         * 默认值为 false。
         * @member {boolean} egret.TextField#bold
         */
        _bold: boolean;
        bold: boolean;
        _setBold(value: boolean): void;
        _textColorString: string;
        /**
         * 表示文本的颜色。
         * 包含三个 8 位 RGB 颜色成分的数字；例如，0xFF0000 为红色，0x00FF00 为绿色。
         * 默认值为 0xFFFFFF。
         * @member {number} egret.TextField#textColor
         */
        _textColor: number;
        textColor: number;
        _setTextColor(value: number): void;
        _strokeColorString: string;
        /**
         * 表示文本的描边颜色。
         * 包含三个 8 位 RGB 颜色成分的数字；例如，0xFF0000 为红色，0x00FF00 为绿色。
         * 默认值为 0x000000。
         * @member {number} egret.TextField#strokeColor
         */
        _strokeColor: number;
        strokeColor: number;
        _setStrokeColor(value: number): void;
        /**
         * 表示描边宽度。
         * 0为没有描边。
         * 默认值为 0。
         * @member {number} egret.TextField#stroke
         */
        _stroke: number;
        stroke: number;
        _setStroke(value: number): void;
        /**
         * 文本水平对齐方式
         * 使用HorizontalAlign定义的常量。
         * 默认值为 HorizontalAlign.LEFT。
         * @member {string} egret.TextField#textAlign
         */
        _textAlign: string;
        textAlign: string;
        _setTextAlign(value: string): void;
        /**
         * 文本垂直对齐方式。
         * 使用VerticalAlign定义的常量。
         * 默认值为 VerticalAlign.TOP。
         * @member {string} egret.TextField#verticalAlign
         */
        _verticalAlign: string;
        verticalAlign: string;
        _setVerticalAlign(value: string): void;
        maxWidth: any;
        /**
         * 文本字段中最多可包含的字符数（即用户输入的字符数）。
         * 脚本可以插入比 maxChars 允许的字符数更多的文本；maxChars 属性仅表示用户可以输入多少文本。如果此属性的值为 0，则用户可以输入无限数量的文本。
         * 默认值为 0。
         * @type {number}
         * @private
         */
        _maxChars: number;
        maxChars: number;
        _setMaxChars(value: number): void;
        maxScrollV: number;
        selectionBeginIndex: number;
        selectionEndIndex: number;
        caretIndex: number;
        _setSelection(beginIndex: number, endIndex: number): void;
        /**
         * 行间距
         * 一个整数，表示行与行之间的垂直间距量。
         * 默认值为 0。
         * @member {number} egret.TextField#lineSpacing
         */
        _lineSpacing: number;
        lineSpacing: number;
        _setLineSpacing(value: number): void;
        _getLineHeight(): number;
        /**
         * 文本行数。【只读】
         * @member {number} egret.TextField#numLines
         */
        private _numLines;
        numLines: number;
        /**
         * 表示字段是否为多行文本字段。注意，此属性仅在type为TextFieldType.INPUT时才有效。
         * 如果值为 true，则文本字段为多行文本字段；如果值为 false，则文本字段为单行文本字段。在类型为 TextFieldType.INPUT 的字段中，multiline 值将确定 Enter 键是否创建新行（如果值为 false，则将忽略 Enter 键）。
         * 默认值为 false。
         * @member {boolean} egret.TextField#multiline
         */
        _multiline: boolean;
        multiline: boolean;
        _setMultiline(value: boolean): void;
        setFocus(): void;
        constructor();
        _onRemoveFromStage(): void;
        _onAddToStage(): void;
        _updateBaseTransform(): void;
        _updateTransform(): void;
        /**
         * @see egret.DisplayObject._render
         * @param renderContext
         */
        _render(renderContext: RendererContext): void;
        /**
         * 测量显示对象坐标与大小
         */
        _measureBounds(): Rectangle;
        /**
         *
         * @param textArr [["text1", {"color":0xffffff}], ["text2", {"color":0xff0000}]]
         * @private
         */
        _setTextArray(textArr: any[]): void;
        private changeToPassText(text);
        private _textArr;
        private _isArrayChanged;
        private setMiddleStyle(textArr);
        private _linesArr;
        _getLinesArr(): any[];
        /**
         * @private
         * @param renderContext
         * @returns {Rectangle}
         */
        private drawText(renderContext, forMeasure);
    }
}
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
declare module egret {
    /**
     * @class egret.TextFieldType
     * @classdesc
     * TextFieldType 类是在设置 TextField 类的 type 属性时使用的常数值的枚举。
     */
    class TextFieldType {
        /**
         * 用于指定动态文本
         * @constant {string} egret.TextFieldType.DYNAMIC
         */
        static DYNAMIC: string;
        /**
         * 用于指定输入文本
         * @constant {string} egret.TextFieldType.INPUT
         */
        static INPUT: string;
    }
}
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
declare module egret {
    /**
     * @class egret.SpriteSheet
     * @classdesc SpriteSheet是一张由多个子位图拼接而成的集合位图，它包含多个Texture对象。
     * 每一个Texture都共享SpriteSheet的集合位图，但是指向它的不同的区域。
     * 在WebGL / OpenGL上，这种做法可以显著提升性能
     * 同时，SpriteSheet可以很方便的进行素材整合，降低HTTP请求数量
     * SpriteSheet 格式的具体规范可以参见此文档  https://github.com/egret-labs/egret-core/wiki/Egret-SpriteSheet-Specification
     *
     */
    class SpriteSheet extends HashObject {
        constructor(texture: Texture);
        /**
         * 表示bitmapData.width
         */
        _sourceWidth: number;
        /**
         * 表示bitmapData.height
         */
        _sourceHeight: number;
        /**
         * 表示这个SpriteSheet的位图区域在bitmapData上的起始位置x。
         */
        private _bitmapX;
        /**
         * 表示这个SpriteSheet的位图区域在bitmapData上的起始位置y。
         */
        private _bitmapY;
        /**
         * 共享的位图数据
         */
        private bitmapData;
        /**
         * 纹理缓存字典
         */
        _textureMap: Object;
        /**
         * 根据指定纹理名称获取一个缓存的Texture对象
         * @method egret.SpriteSheet#getTexture
         * @param name {string} 缓存这个Texture对象所使用的名称
         * @returns {egret.Texture} Texture对象
         */
        getTexture(name: string): Texture;
        /**
         * 为SpriteSheet上的指定区域创建一个新的Texture对象并缓存它
         * @method egret.SpriteSheet#createTexture
         * @param name {string} 缓存这个Texture对象所使用的名称，如果名称已存在，将会覆盖之前的Texture对象
         * @param bitmapX {number} 纹理区域在bitmapData上的起始坐标x
         * @param bitmapY {number} 纹理区域在bitmapData上的起始坐标y
         * @param bitmapWidth {number} 纹理区域在bitmapData上的宽度
         * @param bitmapHeight {number} 纹理区域在bitmapData上的高度
         * @param offsetX {number} 原始位图的非透明区域x起始点
         * @param offsetY {number} 原始位图的非透明区域y起始点
         * @param textureWidth {number} 原始位图的高度，若不传入，则使用bitmapWidth的值。
         * @param textureHeight {number} 原始位图的宽度，若不传入，这使用bitmapHeight值。
         * @returns {egret.Texture} 创建的Texture对象
         */
        createTexture(name: string, bitmapX: number, bitmapY: number, bitmapWidth: number, bitmapHeight: number, offsetX?: number, offsetY?: number, textureWidth?: number, textureHeight?: number): Texture;
    }
}
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
declare module egret {
    /**
     * @class egret.TextInput
     * @classdesc
     * TextInput 已废弃，请使用TextField代替，并设置type为TextFieldType.INPUT
     * @extends egret.TextField
     * @deprecated
     */
    class TextInput extends TextField {
        constructor();
        /**
         * 请使用TextField.text设置
         * @deprecated
         * @param value
         */
        setText(value: string): void;
        /**
         * 请使用TextInput.text获取
         * @deprecated
         * @returns {string}
         */
        getText(): string;
        /**
         * 请使用TextInput.displayAsPassword设置
         * @deprecated
         * @param value
         */
        setTextType(type: string): void;
        /**
         * 请使用TextInput.displayAsPassword获取
         * @deprecated
         * @returns {string}
         */
        getTextType(): string;
    }
}
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
declare module egret {
    class InputController extends HashObject {
        private stageText;
        private _isFocus;
        private _text;
        private _isFirst;
        constructor();
        init(text: TextField): void;
        _addStageText(): void;
        _removeStageText(): void;
        _getText(): string;
        _setText(value: string): void;
        private onFocusHandler(event);
        private onBlurHandler(event);
        private onMouseDownHandler(event);
        private onStageDownHandler(event);
        private showText();
        private hideText();
        private updateTextHandler(event);
        private resetText();
        _updateTransform(): void;
        _updateProperties(): void;
    }
}
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
declare module egret {
    class BitmapTextSpriteSheet extends SpriteSheet {
        constructor(texture: Texture, fntText: string);
        private charList;
        getTexture(name: string): Texture;
        private parseConfig(fntText);
        private getConfigByKey(configText, key);
    }
}
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
declare module egret {
    /**
     * @class egret.MovieClip
     * @classdesc 影片剪辑，可以通过影片剪辑播放序列帧动画。
     * @extends egret.DisplayObjectContainer
     */
    class MovieClip extends DisplayObjectContainer {
        private delegate;
        /**
         * 动画的播放帧频
         * @member {number} egret.MovieClip#frameRate
         */
        frameRate: number;
        constructor(data: any, texture?: Texture);
        /**
         * 播放指定动画
         * @method egret.MovieClip#gotoAndPlay
         * @param frameName {string} 指定帧的帧名称

         */
        gotoAndPlay(frameName: string): void;
        /**
         * 播放并暂停指定动画
         * @method egret.MovieClip#gotoAndStop
         * @param frameName {string} 指定帧的帧名称

         */
        gotoAndStop(frameName: string): void;
        /**
         * 暂停动画
         * @method egret.MovieClip#stop
         */
        stop(): void;
        /**
         * @method egret.MovieClip#dispose
         */
        dispose(): void;
        /**
         * 方法名改为 dispose
         * @method egret.MovieClip#release
         * @deprecated
         */
        release(): void;
        /**
         * @method egret.MovieClip#getCurrentFrameIndex
         * @deprecated
         * @returns {number}
         */
        getCurrentFrameIndex(): number;
        /**
         * 获取当前影片剪辑的帧频数
         * @method egret.MovieClip#getTotalFrame
         * @deprecated
         * @returns {number}
         */
        getTotalFrame(): number;
        /**
         * @method egret.MovieClip#setInterval
         * @deprecated
         * @param value {number}
         */
        setInterval(value: number): void;
        /**
         * @method egret.MovieClip#getIsPlaying
         * @deprecated
         * @returns {boolean}
         */
        getIsPlaying(): boolean;
    }
    interface MovieClipDelegate {
        gotoAndPlay(frameName: string): void;
        gotoAndStop(frameName: string): void;
        stop(): void;
        dispose(): void;
        setMovieClip(movieclip: MovieClip): void;
    }
    class DefaultMovieClipDelegate implements MovieClipDelegate {
        data: any;
        private _frameData;
        private _totalFrame;
        private _spriteSheet;
        private _passTime;
        private _currentFrameIndex;
        private _currentFrameName;
        private _isPlaying;
        private movieClip;
        private bitmap;
        constructor(data: any, texture: Texture);
        setMovieClip(movieClip: MovieClip): void;
        gotoAndPlay(frameName: string): void;
        gotoAndStop(frameName: string): void;
        stop(): void;
        dispose(): void;
        private checkHasFrame(name);
        private update(advancedTime);
        private playNextFrame(needShow?);
        private getTexture(name);
    }
}
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
declare module egret {
    /**
     * @class egret.StageText
     * @classdesc
     * @extends egret.HashObject
     */
    class StageText extends EventDispatcher {
        constructor();
        /**
         * @method egret.StageText#getText
         * @returns {string}
         */
        _getText(): string;
        /**
         * @method egret.StageText#setText
         * @param value {string}
         */
        _setText(value: string): void;
        /**
         * @method egret.StageText#setTextType
         * @param type {string}
         */
        _setTextType(type: string): void;
        /**
         * @method egret.StageText#getTextType
         * @returns {string}
         */
        _getTextType(): string;
        /**
         * @method egret.StageText#open
         * @param x {number}
         * @param y {number}
         * @param width {number}
         * @param height {number}
         */
        _open(x: number, y: number, width?: number, height?: number): void;
        /**
         * @method egret.StageText#add
         */
        _show(): void;
        _add(): void;
        /**
         * @method egret.StageText#remove
         */
        _remove(): void;
        _hide(): void;
        _addListeners(): void;
        _removeListeners(): void;
        _scaleX: number;
        _scaleY: number;
        _setScale(x: number, y: number): void;
        changePosition(x: number, y: number): void;
        _size: number;
        _setSize(value: number): void;
        _color: string;
        _setTextColor(value: string): void;
        _fontFamily: string;
        _setTextFontFamily(value: string): void;
        _bold: boolean;
        _setBold(value: boolean): void;
        _italic: boolean;
        _setItalic(value: boolean): void;
        _textAlign: string;
        _setTextAlign(value: string): void;
        _visible: boolean;
        _setVisible(value: boolean): void;
        _setWidth(value: number): void;
        _setHeight(value: number): void;
        _multiline: boolean;
        _setMultiline(value: boolean): void;
        _maxChars: number;
        _setMaxChars(value: number): void;
        _resetStageText(): void;
        static create(): StageText;
    }
}
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
declare module egret {
    /**
     * @class egret.URLRequestMethod
     * @classdesc URLRequestMethod 类提供了一些值，这些值可指定在将数据发送到服务器时，
     * URLRequest 对象应使用 POST 方法还是 GET 方法。
     */
    class URLRequestMethod {
        /**
         * 表示 URLRequest 对象是一个 GET。
         * @constant {string} egret.URLRequestMethod.GET
         */
        static GET: string;
        /**
         * 表示 URLRequest 对象是一个 POST。
         * @constant {string} egret.URLRequestMethod.POST
         */
        static POST: string;
    }
}
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
declare module egret {
    /**
     * @class egret.URLLoaderDataFormat
     * @classdesc URLLoaderDataFormat 类提供了一些用于指定如何接收已下载数据的值。
     */
    class URLLoaderDataFormat {
        /**
         * 指定以原始二进制数据形式接收下载的数据。
         * @constant {string} egret.URLLoaderDataFormat.BINARY
         */
        static BINARY: string;
        /**
         * 指定以文本形式接收已下载的数据。
         * @constant {string} egret.URLLoaderDataFormat.TEXT
         */
        static TEXT: string;
        /**
         * 指定以 URL 编码变量形式接收下载的数据。
         * @constant {string} egret.URLLoaderDataFormat.VARIABLES
         */
        static VARIABLES: string;
        /**
         * 指定以位图纹理形式接收已下载的数据。
         * @constant {string} egret.URLLoaderDataFormat.TEXTURE
         */
        static TEXTURE: string;
        /**
         * 指定以声音形式接收已下载的数据。
         * @constant {string} egret.URLLoaderDataFormat.SOUND
         */
        static SOUND: string;
    }
}
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
declare module egret {
    /**
     * @class egret.URLVariables
     * @classdesc
     * 使用 URLVariables 类可以在应用程序和服务器之间传输变量。
     * 将 URLVariables 对象与 URLLoader 类的方法、URLRequest 类的 data 属性一起使用。
     * @extends egret.HashObject
     */
    class URLVariables extends HashObject {
        /**
         * @method egret.URLVariables#constructor
         * @param source {String} 包含名称/值对的 URL 编码的字符串。
         */
        constructor(source?: string);
        /**
         * 此 URLVariables 储存的键值对数据对象。
         * @member egret.URLVariables#variables
         */
        variables: Object;
        /**
         * 将变量字符串转换为此 URLVariables.variables 对象的属性。
         * @method egret.URLVariables#decode
         * @param source {string}
         */
        decode(source: string): void;
        /**
         * 以 MIME 内容编码格式 application/x-www-form-urlencoded 返回包含所有可枚举变量的字符串。
         * @method egret.URLVariables#toString
         */
        toString(): string;
    }
}
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
declare module egret {
    /**
     * @class egret.URLRequest
     * @classdesc URLRequest 类可捕获单个 HTTP 请求中的所有信息。
     * @extends egret.HashObject
     */
    class URLRequest extends HashObject {
        /**
         * 实例化一个URLRequest对象
         * @method egret.URLRequest#constructor
         * @param url {string} 进行网络请求的地址
         */
        constructor(url?: string);
        /**
         * 一个对象，它包含将随 URL 请求一起传输的数据。
         * 该属性与 method 属性配合使用。当 method 值为 GET 时，将使用 HTTP 查询字符串语法将 data 值追加到 URLRequest.url 值。
         * 当 method 值为 POST（或 GET 之外的任何值）时，将在 HTTP 请求体中传输 data 值。
         * URLRequest API 支持二进制 POST，并支持 URL 编码变量和字符串。该数据对象可以是 ByteArray、URLVariables 或 String 对象。
         * 该数据的使用方式取决于所用对象的类型：
         * 如果该对象为 ByteArray 对象，则 ByteArray 对象的二进制数据用作 POST 数据。对于 GET，不支持 ByteArray 类型的数据。
         * 如果该对象是 URLVariables 对象，并且该方法是 POST，则使用 x-www-form-urlencoded 格式对变量进行编码，并且生成的字符串会用作 POST 数据。
         * 如果该对象是 URLVariables 对象，并且该方法是 GET，则 URLVariables 对象将定义要随 URLRequest 对象一起发送的变量。
         * 否则，该对象会转换为字符串，并且该字符串会用作 POST 或 GET 数据。
         * @member {any} egret.URLRequest#data
         */
        data: any;
        /**
         * 请求方式，有效值为URLRequestMethod.GET 或 URLRequestMethod.POST。
         * @member {string} egret.URLRequest#method
         */
        method: string;
        /**
         * 所请求的 URL。
         * @member {string} egret.URLRequest#url
         */
        url: string;
    }
}
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
declare module egret {
    /**
     * @class egret.URLLoader
     * @classdesc
     * URLLoader 类以文本、二进制数据或 URL 编码变量的形式从 URL 下载数据。在下载文本文件、XML 或其他用于动态数据驱动应用程序的信息时，它很有用。
     * URLLoader 对象会先从 URL 中下载所有数据，然后才将数据用于应用程序中的代码。它会发出有关下载进度的通知，
     * 通过 bytesLoaded 和 bytesTotal 属性以及已调度的事件，可以监视下载进度。
     * @extends egret.EventDispatcher
     */
    class URLLoader extends EventDispatcher {
        /**
         * @method egret.URLLoader#constructor
         * @param request {URLRequest} 一个 URLRequest 对象，指定要下载的 URL。
         * 如果省略该参数，则不开始加载操作。如果已指定参数，则立即开始加载操作
         */
        constructor(request?: URLRequest);
        /**
         * 控制是以文本 (URLLoaderDataFormat.TEXT)、原始二进制数据 (URLLoaderDataFormat.BINARY) 还是 URL 编码变量 (URLLoaderDataFormat.VARIABLES) 接收下载的数据。
         * 如果 dataFormat 属性的值是 URLLoaderDataFormat.TEXT，则所接收的数据是一个包含已加载文件文本的字符串。
         * 如果 dataFormat 属性的值是 URLLoaderDataFormat.BINARY，则所接收的数据是一个包含原始二进制数据的 ByteArray 对象。
         * 如果 dataFormat 属性的值是 URLLoaderDataFormat.TEXTURE，则所接收的数据是一个包含位图数据的Texture对象。
         * 如果 dataFormat 属性的值是 URLLoaderDataFormat.VARIABLES，则所接收的数据是一个包含 URL 编码变量的 URLVariables 对象。
         * 默认值:URLLoaderDataFormat.TEXT
         * @member {string} egret.URLLoader#dataFormat
         */
        dataFormat: string;
        /**
         * 从加载操作接收的数据。只有完成加载操作时，才会填充该属性。该数据的格式取决于 dataFormat 属性的设置：
         * 如果 dataFormat 属性是 URLLoaderDataFormat.TEXT，则所接收的数据是一个包含已加载文件文本的字符串。
         * 如果 dataFormat 属性是 URLLoaderDataFormat.BINARY，则所接收的数据是一个包含原始二进制数据的 ByteArray 对象。
         * 如果 dataFormat 属性是 URLLoaderDataFormat.TEXTURE，则所接收的数据是一个包含位图数据的Texture对象。
         * 如果 dataFormat 属性是 URLLoaderDataFormat.VARIABLES，则所接收的数据是一个包含 URL 编码变量的 URLVariables 对象。
         * @member {any} egret.URLLoader#data
         */
        data: any;
        _request: URLRequest;
        /**
         * 从指定的 URL 发送和加载数据。可以以文本、原始二进制数据或 URL 编码变量格式接收数据，这取决于为 dataFormat 属性所设置的值。
         * 请注意 dataFormat 属性的默认值为文本。如果想将数据发送至指定的 URL，则可以在 URLRequest 对象中设置 data 属性。
         * @method egret.URLLoader#load
         * @param request {URLRequest}  一个 URLRequest 对象，指定要下载的 URL。
         */
        load(request: URLRequest): void;
        _status: number;
    }
}
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
declare module egret {
    /**
     * @class egret.Texture
     * @classdesc 纹理类是对不同平台不同的图片资源的封装
     * 在HTML5中，资源是一个HTMLElement对象
     * 在OpenGL / WebGL中，资源是一个提交GPU后获取的纹理id
     * Texture类封装了这些底层实现的细节，开发者只需要关心接口即可
     */
    class Texture extends HashObject {
        webGLTexture: any;
        constructor();
        /**
         * 表示这个纹理在bitmapData上的x起始位置
         */
        _bitmapX: number;
        /**
         * 表示这个纹理在bitmapData上的y起始位置
         */
        _bitmapY: number;
        /**
         * 表示这个纹理在bitmapData上的宽度
         */
        _bitmapWidth: number;
        /**
         * 表示这个纹理在bitmapData上的高度
         */
        _bitmapHeight: number;
        /**
         * 表示这个纹理显示了之后在x方向的渲染偏移量
         */
        _offsetX: number;
        /**
         * 表示这个纹理显示了之后在y方向的渲染偏移量
         */
        _offsetY: number;
        _textureWidth: number;
        /**
         * 纹理宽度
         * @member {number} egret.Texture#textureWidth
         */
        textureWidth: number;
        _textureHeight: number;
        /**
         * 纹理高度
         * @member {number} egret.Texture#textureWidth
         */
        textureHeight: number;
        /**
         * 表示bitmapData.width
         */
        _sourceWidth: number;
        /**
         * 表示bitmapData.height
         */
        _sourceHeight: number;
        _bitmapData: any;
        /**
         * 纹理对象中得位图数据
         * @member {any} egret.Texture#bitmapData
         */
        bitmapData: any;
        _setBitmapData(value: any): void;
        /**
         * 获取某一点像素的颜色值
         * @method egret.Texture#getPixel32
         * @param x 像素点的X轴坐标
         * @param y 像素点的Y轴坐标
         * @returns {number} 指定像素点的颜色值
         */
        getPixel32(x: any, y: any): number[];
    }
}
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
declare module egret {
    /**
     * @class egret.RenderTexture
     * @classdesc
     * RenderTexture 是动态纹理类，他实现了将显示对象及其子对象绘制成为一个纹理的功能
     * @extends egret.Texture
     */
    class RenderTexture extends Texture {
        private renderContext;
        constructor();
        /**
         * 将制定显示对象绘制为一个纹理
         * @method egret.RenderTexture#drawToTexture
         * @param displayObject {egret.DisplayObject}
         */
        drawToTexture(displayObject: DisplayObject): void;
    }
}
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
declare module egret {
    /**
     * @class egret.RendererContext
     * @classdesc
     * RenderContext是游戏的渲染上下文。
     * 这是一个抽象基类，制定主要的接口
     * @extends egret.HashObject
     */
    class RendererContext extends HashObject {
        /**
         * 渲染全部纹理的时间开销
         * @member egret.RendererContext#renderCost
         */
        renderCost: number;
        /**
         * 绘制纹理的缩放比率，默认值为1
         * @member egret.RendererContext#texture_scale_factor
         */
        texture_scale_factor: number;
        /**
         * 是否对图像使用平滑处理
         * 该特性目前只支持Canvas
         */
        static imageSmoothingEnabled: boolean;
        private profiler;
        /**
         * @method egret.RendererContext#constructor
         */
        constructor();
        /**
         * @method egret.RendererContext#clearScreen
         * @private
         */
        clearScreen(): void;
        /**
         * 清除Context的渲染区域
         * @method egret.RendererContext#clearRect
         * @param x {number}
         * @param y {number}
         * @param w {number}
         * @param h {numbe}
         */
        clearRect(x: number, y: number, w: number, h: number): void;
        /**
         * 绘制图片
         * @method egret.RendererContext#drawImage
         * @param texture {Texture}
         * @param sourceX {any}
         * @param sourceY {any}
         * @param sourceWidth {any}
         * @param sourceHeight {any}
         * @param destX {any}
         * @param destY {any}
         * @param destWidth {any}
         * @param destHeigh {any}
         */
        drawImage(texture: Texture, sourceX: any, sourceY: any, sourceWidth: any, sourceHeight: any, destX: any, destY: any, destWidth: any, destHeight: any, repeat?: string): void;
        /**
         * 变换Context的当前渲染矩阵
         * @method egret.RendererContext#setTransform
         * @param matrix {egret.Matri}
         */
        setTransform(matrix: Matrix): void;
        /**
         * 设置渲染alpha
         * @method egret.RendererContext#setAlpha
         * @param value {number}
         * @param blendMode {egret.BlendMod}
         */
        setAlpha(value: number, blendMode: string): void;
        /**
         * 设置渲染文本参数
         * @method egret.RendererContext#setupFont
         * @param textField {TextField}
         */
        setupFont(textField: TextField): void;
        /**
         * 测量文本
         * @method egret.RendererContext#measureText
         * @param text {string}
         * @returns {number}
         * @stable B 参数很可能会需要调整，和setupFont整合
         */
        measureText(text: string): number;
        /**
         * 绘制文本
         * @method egret.RendererContext#drawText
         * @param textField {egret.TextField}
         * @param text {string}
         * @param x {number}
         * @param y {number}
         * @param maxWidth {numbe}
         */
        drawText(textField: TextField, text: string, x: number, y: number, maxWidth: number, style: Object): void;
        strokeRect(x: any, y: any, w: any, h: any, color: any): void;
        pushMask(mask: Rectangle): void;
        popMask(): void;
        onRenderStart(): void;
        onRenderFinish(): void;
        setGlobalColorTransform(colorTransformMatrix: number[]): void;
        static createRendererContext(canvas: any): RendererContext;
    }
}
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
declare module egret {
    class InteractionMode {
        /**
         * 使用鼠标交互模式。
         */
        static MOUSE: string;
        /**
         * 使用触摸交互模式。
         */
        static TOUCH: string;
        /**
         * 当前Egret使用的交互模式。
         */
        static mode: string;
    }
}
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
declare module egret {
    /**
     *
     * @class egret.TouchContext
     * @classdesc TouchContext是egret的触摸Context
     */
    class TouchContext extends HashObject {
        private _currentTouchTarget;
        maxTouches: number;
        private touchDownTarget;
        touchingIdentifiers: any[];
        constructor();
        /**
         * 启动触摸检测
         * @method egret.TouchContext#run
         */
        run(): void;
        getTouchData(identifier: any, x: any, y: any): any;
        dispatchEvent(type: string, data: any): void;
        onTouchBegan(x: number, y: number, identifier: number): void;
        private lastTouchX;
        private lastTouchY;
        onTouchMove(x: number, y: number, identifier: number): void;
        onTouchEnd(x: number, y: number, identifier: number): void;
    }
}
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
declare module egret {
    /**
     * @class egret.NetContext
     * @classdesc
     * @extends egret.HashObject
     */
    class NetContext extends HashObject {
        constructor();
        proceed(loader: URLLoader): void;
        static _getUrl(request: URLRequest): string;
    }
}
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
declare module egret {
    /**
     * @class egret.DeviceContext
     * @classdesc
     * @extends egret.HashObject
     */
    class DeviceContext extends HashObject {
        /**
         * @member egret.DeviceContext#frameRate
         */
        frameRate: number;
        /**
         * @method egret.DeviceContext#constructor
         */
        constructor();
        /**
         * @method egret.DeviceContext#executeMainLoop
         * @param callback {Function}
         * @param thisObject {any}
         */
        executeMainLoop(callback: Function, thisObject: any): void;
    }
}
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
declare module egret {
    class ExternalInterface {
        constructor();
        /**
         * 将信息传递给 Egret 外层容器。
         * 如果该容器是 HTML 页，则此方法不可用。
         * 如果该容器是某个 App 容器，该容器将处理该事件。
         * @method egret.ExternalInterface#call
         * @param functionName {string}
         * @param value {string}
         */
        static call(functionName: string, value: string): void;
        /**
         * 添加外层容器调用侦听，该容器将传递一个字符串给 Egret 容器
         * 如果该容器是 HTML 页，则此方法不可用。
         * @method egret.ExternalInterface#addCallBack
         * @param functionName {string}
         * @param listener {Function}
         */
        static addCallback(functionName: string, listener: Function): void;
    }
}
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
declare module egret {
    /**
     * 这个类是HTML5的WebWrapper的第一个版本
     */
    class Browser extends HashObject {
        private static instance;
        private trans;
        private ua;
        static getInstance(): Browser;
        /**
         * @deprecated
         * @returns {boolean}
         */
        isMobile: boolean;
        constructor();
        private _getHeader(tempStyle);
        private _getTrans();
        $new(x: any): any;
        $(x: any): any;
        translate(a: any): string;
        rotate(a: any): string;
        scale(a: any): string;
        skew(a: any): string;
    }
}
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
declare module egret.localStorage {
    /**
     * 读取数据
     * @method egret.localStorage.getItem
     * @param key {string} 要读取的键名称
     */
    function getItem(key: string): string;
    /**
     * 保存数据
     * @method egret.localStorage.setItem
     * @param key {string} 要保存的键名称
     * @param value {string} 要保存的值
     * @returns {boolean} 数据保存是否成功
     */
    function setItem(key: string, value: string): boolean;
    /**
     * 删除数据
     * @method egret.localStorage.removeItem
     * @param key {string} 要删除的键名称
     */
    function removeItem(key: string): void;
    /**
     * 将所有数据清空
     * @method egret.localStorage.clear
     */
    function clear(): void;
}
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
declare module egret {
    /**
     * @class egret.XML
     * @classdesc
     * XML文件解析工具，它将XML文件解析为标准的JSON对象返回。
     * 用法类似JSON.parse(),传入一个XML字符串给XML.parse()，将能得到一个标准JSON对象。
     * 示例：<root value="abc">
     *          <item value="item0"/>
     *          <item value="item1"/>
     *       </root>
     * 将解析为:
     * {"name":"root","$value":"abc","children":[{"name":"item","$value":"item0"},{"name":"item","$value":"item0"}]};
     * 其中XML上的属性节点都使用$+"属性名"的方式表示,子节点都存放在children属性的列表里，name表示节点名称。
     */
    class XML {
        /**
         * 解析一个XML字符串为JSON对象。
         * @method egret.XML.parse
         * @param value {string} 要解析的XML字符串。
         * @returns {any}
         */
        static parse(value: string): any;
        private static parseNode(node);
        /**
         * 查找xml上符合节点路径的所有子节点。
         * @method egret.XML.findChildren
         * @param xml {any} 要查找的XML节点。
         * @param path {string} 子节点路径，例如"item.node"
         * @param result {egret.Array<any>} 可选参数，传入一个数组用于存储查找的结果。这样做能避免重复创建对象。
         * @returns {any}
         */
        static findChildren(xml: any, path: string, result?: any[]): any[];
        /**
         * @method egret.XML.findByPath
         * @param xml {any}
         * @param path {string}
         * @param result {egret.Array<any>}
         */
        static findByPath(xml: any, path: string, result: any[]): void;
        /**
         * 获取一个XML节点上的所有属性名列表
         * @method egret.XML.getAttributes
         * @param xml {any} 要查找的XML节点。
         * @param result {egret.Array<any>} 可选参数，传入一个数组用于存储查找的结果。这样做能避免重复创建对象。
         * @returns {string}
         */
        static getAttributes(xml: any, result?: any[]): string[];
    }
}
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
declare module egret {
    /**
     * Endian 类中包含一些值，它们表示用于表示多字节数字的字节顺序。
     * 字节顺序为 bigEndian（最高有效字节位于最前）或 littleEndian（最低有效字节位于最前）。
     * @class egret.Endian
     * @classdesc
     */
    class Endian {
        /**
         * 表示多字节数字的最低有效字节位于字节序列的最前面。
         * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
         * @constant {string} egret.Endian.LITTLE_ENDIAN
         */
        static LITTLE_ENDIAN: string;
        /**
         * 表示多字节数字的最高有效字节位于字节序列的最前面。
         * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
         * @constant {string} egret.Endian.BIG_ENDIAN
         */
        static BIG_ENDIAN: string;
    }
    /**
     * @class egret.ByteArray
     * @classdesc
     * ByteArray 类提供用于优化读取、写入以及处理二进制数据的方法和属性。
     * 注意：ByteArray 类适用于需要在字节层访问数据的高级开发人员。
     * 内存中的数据是一个压缩字节数组（数据类型的最紧凑表示形式），但可以使用标准数组访问运算符来操作 ByteArray 类的实例。
     */
    class ByteArray {
        /**
         * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。
         * 下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
         * @member {number} egret.ByteArray#position
         */
        position: number;
        /**
         * ByteArray 对象的长度（以字节为单位）。
         * 如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧；如果将长度设置为小于当前长度的值，将会截断该字节数组。
         * @member {number} egret.ByteArray#length
         */
        length: number;
        private _mode;
        private maxlength;
        private arraybytes;
        private unalignedarraybytestemp;
        private _endian;
        private isLittleEndian;
        /**
         * 默认表示多字节数字的字节顺序的常量
         * @constant {string} egret.ByteArray.DEFAULT_ENDIAN
         */
        static DEFAULT_ENDIAN: string;
        constructor();
        /**
         * 更改或读取数据的字节顺序。
         * 请使用egret.Endian.BIG_ENDIAN 或 egret.Endian.LITTLE_ENDIAN表示。
         * @member {string} egret.ByteArray#endian
         */
        endian: string;
        /**
         * @method egret.ByteArray#ensureWriteableSpace
         * @param n {number}
         */
        ensureWriteableSpace(n: number): void;
        /**
         * @method egret.ByteArray#setArrayBuffer
         * @param aBuffer {egret.ArrayBuffer}
         */
        setArrayBuffer(aBuffer: ArrayBuffer): void;
        /**
         * 可从字节数组的当前位置到数组末尾读取的数据的字节数。【只读】
         * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
         * @method egret.ByteArray#getBytesAvailable
         * @returns {number}
         */
        bytesAvailable: number;
        /**
         * @method egret.ByteArray#ensureSpace
         * @param n {number}
         */
        ensureSpace(n: number): void;
        /**
         * 在字节流中写入一个字节。
         * 使用参数的低 8 位。忽略高 24 位。
         * @method egret.ByteArray#writeByte
         * @param b {number}  一个 32 位整数。低 8 位将被写入字节流。
         */
        writeByte(b: number): void;
        /**
         * 从字节流中读取带符号的字节。
         * 返回值的范围是从 -128 到 127。
         * @method egret.ByteArray#readByte
         * @returns {number} 介于 -128 和 127 之间的整数。
         */
        readByte(): number;
        /**
         * 从字节流中读取 length 参数指定的数据字节数。从 offset 指定的位置开始，将字节读入 bytes 参数指定的 ByteArray 对象中，并将字节写入目标 ByteArray 中。
         * @method egret.ByteArray#readBytes
         * @param bytes {egret.ByteArray} 要将数据读入的 ByteArray 对象。
         * @param offset {number} bytes 中的偏移（位置），应从该位置写入读取的数据。
         * @param length {number} 要读取的字节数。默认值 0 导致读取所有可用的数据。

         */
        readBytes(bytes: ByteArray, offset?: number, length?: number): void;
        /**
         * 在字节流中写入一个无符号的字节。
         * @method egret.ByteArray#writeUnsignedByte
         * @param b {number} 介于 0 到 255 之间的无符号字节。
         */
        writeUnsignedByte(b: number): void;
        /**
         * 从字节流中读取无符号的字节。
         * 返回值的范围是从 0 到 255。
         * @method egret.ByteArray#readUnsignedByte 介于 0 到 255 之间的无符号字节。
         */
        readUnsignedByte(): number;
        /**
         *在字节流中写入一个无符号的 16 位整数。
         * @method egret.ByteArray#writeUnsignedShort
         * @param b {number}  介于 0 到 65535 之间的无符号整数。
         */
        writeUnsignedShort(b: number): void;
        /**
         * 从字节流中读取一个由 length 参数指定的 UTF-8 字节序列，并返回一个字符串。
         * @method egret.ByteArray#readUTFBytes
         * @param len {number} 指明 UTF-8 字节长度的无符号短整型数。
         * @returns {string} 由指定长度的 UTF-8 字节组成的字符串。
         */
        readUTFBytes(len: number): string;
        /**
         * 从字节流中读取一个带符号的 32 位整数。
         * 返回值的范围是从 -2147483648 到 2147483647。
         * @method egret.ByteArray#readInt
         * @returns {number} 介于 -2147483648 到 2147483647 之间的整数。
         */
        readInt(): number;
        /**
         * 从字节流中读取一个带符号的 16 位整数。
         * 返回值的范围是从 -32768 到 32767。
         * @method egret.ByteArray#readShort
         * @returns {number} 介于 -32768 到 32767 之间的整数。
         */
        readShort(): number;
        /**
         * 从字节流中读取一个 IEEE 754 双精度（64 位）浮点数。
         * @method egret.ByteArray#readDouble
         * @returns {number} 返回双精度（64 位）浮点数。
         */
        readDouble(): number;
        /**
         * 从字节流中读取一个无符号的 16 位整数。
         * 返回值的范围是从 0 到 65535。
         * @method egret.ByteArray#readUnsignedShort
         * @returns {number} 介于 0 到 65535 之间的无符号整数。
         */
        readUnsignedShort(): number;
        /**
         * 在字节流中写入一个无符号的 32 位整数。
         * @method egret.ByteArray#writeUnsignedInt
         * @param b {number} 介于 0 和 4294967295 之间的无符号整数。
         */
        writeUnsignedInt(b: number): void;
        /**
         * 从字节流中读取一个无符号的 32 位整数。
         * 返回值的范围是从 0 到 4294967295。
         * @method egret.ByteArray#readUnsignedInt
         *  @returns {number} 介于 0 和 4294967295 之间的 32 位无符号整数。
         */
        readUnsignedInt(): number;
        /**
         * 在字节流中写入一个 IEEE 754 单精度（32 位）浮点数。
         * @method egret.ByteArray#writeFloat
         * @param b {number} 单精度（32 位）浮点数。
         */
        writeFloat(b: number): void;
        /**
         * 从字节流中读取一个 IEEE 754 单精度（32 位）浮点数。
         * @method egret.ByteArray#readFloat
         * @returns {number} 单精度（32 位）浮点数。
         */
        readFloat(): number;
    }
}
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
declare module egret {
    /**
     * @class egret.Tween
     * @classdesc
     * Tween是Egret的动画缓动类
     * @extends egret.EventDispatcher
     */
    class Tween extends EventDispatcher {
        /**
         * @constant {any} egret.Tween.NONE
         */
        static NONE: number;
        /**
         * @constant {any} egret.Tween.LOOP
         */
        static LOOP: number;
        /**
         * @constant {any} egret.Tween.REVERSE
         */
        static REVERSE: number;
        private static _tweens;
        private static IGNORE;
        private static _plugins;
        private static _inited;
        private _target;
        private _useTicks;
        private ignoreGlobalPause;
        private loop;
        private pluginData;
        private _curQueueProps;
        private _initQueueProps;
        private _steps;
        private _actions;
        private paused;
        private duration;
        private _prevPos;
        private position;
        private _prevPosition;
        private _stepPosition;
        private passive;
        /**
         * 激活一个显示对象，对其添加 Tween 动画
         * @method egret.Tween.get
         * @param target {egret.DisplayObject} 要激活的显示对象
         */
        static get(target: any, props?: any, pluginData?: any, override?: boolean): Tween;
        /**
         * 删除一个显示对象上的全部 Tween 动画
         * @method egret.Tween.removeTweens
         * @param target {egret.DisplayObject}
         */
        static removeTweens(target: any): void;
        /**
         * 暂停某个元件的所有缓动
         * @param target
         */
        static pauseTweens(target: any): void;
        /**
         * 继续播放某个元件的所有缓动
         * @param target
         */
        static resumeTweens(target: any): void;
        private static tick(delta, paused?);
        private static _register(tween, value);
        /**
         * @method egret.Tween.removeAllTweens
         */
        static removeAllTweens(): void;
        constructor(target: any, props: any, pluginData: any);
        private initialize(target, props, pluginData);
        private setPosition(value, actionsMode?);
        private _runActions(startPos, endPos, includeStart?);
        private _updateTargetProps(step, ratio);
        /**
         * @method egret.Tween#setPaused
         * @param value {boolean}
         * @returns {egret.Tween}
         */
        setPaused(value: boolean): Tween;
        private _cloneProps(props);
        private _addStep(o);
        private _appendQueueProps(o);
        private _addAction(o);
        private _set(props, o);
        /**
         * 等待指定毫秒后执行下一个动画
         * @method egret.Tween#wait
         * @param duration {number} 要等待的时间，以毫秒为单位
         * @param passive {boolean}
         * @returns {egret.Tween}
         */
        wait(duration: number, passive?: boolean): Tween;
        /**
         * 将指定显示对象的属性修改为指定值
         * @method egret.Tween#to
         * @param props {Object} 对象的属性集合
         * @param duration {number} 持续时间
         * @param ease {egret.Ease} 缓动算法
         * @returns {egret.Tween}
         */
        to(props: any, duration: number, ease?: any): Tween;
        /**
         * 执行回调函数
         * @method egret.Tween#call
         * @param callback {Function}
         * @param thisObj {Object}
         * @param params {Object}
         * @returns {egret.Tween}
         */
        call(callback: Function, thisObj?: any, params?: any): Tween;
        set(props: any, target?: any): Tween;
        /**
         * @method egret.Tween#play
         * @param tween {egret.Tween}
         * @returns {egret.Tween}
         */
        play(tween?: Tween): Tween;
        /**
         * @method egret.Tween#pause
         * @param tween {egret.Tween}
         * @returns {egret.Tween}
         */
        pause(tween?: Tween): Tween;
        /**
         * @method egret.Tween#tick
         * @param delta {number}
         */
        tick(delta: number): void;
    }
}
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
declare module egret {
    class Ease {
        constructor();
        static get(amount: any): Function;
        static getPowIn(pow: any): Function;
        static getPowOut(pow: any): Function;
        static getPowInOut(pow: any): Function;
        static quadIn: Function;
        static quadOut: Function;
        static quadInOut: Function;
        static cubicIn: Function;
        static cubicOut: Function;
        static cubicInOut: Function;
        static quartIn: Function;
        static quartOut: Function;
        static quartInOut: Function;
        static quintIn: Function;
        static quintOut: Function;
        static quintInOut: Function;
        static sineIn(t: any): number;
        static sineOut(t: any): number;
        static sineInOut(t: any): number;
        static getBackIn(amount: any): Function;
        static backIn: Function;
        static getBackOut(amount: any): Function;
        static backOut: Function;
        static getBackInOut(amount: any): Function;
        static backInOut: Function;
        static circIn(t: any): number;
        static circOut(t: any): number;
        static circInOut(t: any): number;
        static bounceIn(t: any): number;
        static bounceOut(t: any): number;
        static bounceInOut(t: any): number;
        static getElasticIn(amplitude: any, period: any): Function;
        static elasticIn: Function;
        static getElasticOut(amplitude: any, period: any): Function;
        static elasticOut: Function;
        static getElasticInOut(amplitude: any, period: any): Function;
        static elasticInOut: Function;
    }
}
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
declare module egret {
    /**
     * @class egret.Sound
     * @classdesc Sound 类允许您在应用程序中使用声音。
     */
    class Sound {
        static MUSIC: string;
        static EFFECT: string;
        path: string;
        constructor();
        /**
         * audio音频对象
         * @member {any} egret.Sound#audio
         */
        private audio;
        type: string;
        /**
         * 播放声音
         * @method egret.Sound#play
         * @param loop {boolean} 是否循环播放，默认为false
         */
        play(loop?: boolean): void;
        /**
         * 暂停声音
         * @method egret.Sound#pause
         */
        pause(): void;
        /**
         * 重新加载声音
         * @method egret.Sound#load
         */
        load(): void;
        /**
         * 添加事件监听
         * @param type 事件类型
         * @param listener 监听函数
         */
        addEventListener(type: string, listener: Function): void;
        /**
         * 移除事件监听
         * @param type 事件类型
         * @param listener 监听函数
         */
        removeEventListener(type: string, listener: Function): void;
        /**
         * 设置音量
         * @param value 值需大于0 小于等于 1
         */
        setVolume(value: number): void;
        /**
         * 获取当前音量值
         * @returns number
         */
        getVolume(): number;
        preload(type: string): void;
        _setAudio(value: any): void;
    }
}
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
declare module egret {
    class NumberUtils {
        static isNumber(value: any): Boolean;
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module RES {
    /**
     * @class RES.ResourceEvent
     * @classdesc
     * @extends egret.Event
     */
    class ResourceEvent extends egret.Event {
        /**
         * 一个加载项加载失败事件。
         * @constant {string} RES.ResourceEvent.ITEM_LOAD_ERROR
         */
        static ITEM_LOAD_ERROR: string;
        /**
         * 配置文件加载并解析完成事件
         * @constant {string} RES.ResourceEvent.CONFIG_COMPLETE
         */
        static CONFIG_COMPLETE: string;
        /**
         * 延迟加载组资源加载进度事件
         * @constant {string} RES.ResourceEvent.GROUP_PROGRESS
         */
        static GROUP_PROGRESS: string;
        /**
         * 延迟加载组资源加载完成事件
         * @constant {string} RES.ResourceEvent.GROUP_COMPLETE
         */
        static GROUP_COMPLETE: string;
        /**
         * 构造函数
         * @method RES.ResourceEvent#constructor
         * @param type {string}
         * @param bubbles {boolean}
         * @param cancelable {boolean}
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
         * 已经加载的文件数
         * @member {number} RES.ResourceEvent#itemsLoaded
         */
        itemsLoaded: number;
        /**
         * 要加载的总文件数
         * @member {number} RES.ResourceEvent#itemsTotal
         */
        itemsTotal: number;
        /**
         * 资源组名
         * @member {string} RES.ResourceEvent#groupName
         */
        groupName: string;
        /**
         * 一次加载项加载结束的项信息对象
         * @member {egret.ResourceItem} RES.ResourceEvent#resItem
         */
        resItem: ResourceItem;
        /**
         * 使用指定的EventDispatcher对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @method RES.ResourceEvent.dispatchResourceEvent
         * @param target {egret.IEventDispatcher}
         * @param type {string}
         * @param groupName {string}
         * @param resItem {egret.ResourceItem}
         * @param itemsLoaded {number}
         * @param itemsTotal {number}
         */
        static dispatchResourceEvent(target: egret.IEventDispatcher, type: string, groupName?: string, resItem?: ResourceItem, itemsLoaded?: number, itemsTotal?: number): void;
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module RES {
    /**
     * @class RES.ResourceItem
     * @classdesc
     */
    class ResourceItem {
        /**
         * XML文件
         * @constant {string} RES.ResourceItem.TYPE_XML
         */
        static TYPE_XML: string;
        /**
         * 图片文件
         * @constant {string} RES.ResourceItem.TYPE_IMAGE
         */
        static TYPE_IMAGE: string;
        /**
         * 二进制流文件
         * @constant {string} RES.ResourceItem.TYPE_BIN
         */
        static TYPE_BIN: string;
        /**
         * 文本文件(解析为字符串)
         * @constant {string} RES.ResourceItem.TYPE_TEXT
         */
        static TYPE_TEXT: string;
        /**
         * JSON文件
         * @constant {string} RES.ResourceItem.TYPE_JSON
         */
        static TYPE_JSON: string;
        /**
         * SpriteSheet文件
         * @constant {string} RES.ResourceItem.TYPE_SHEET
         */
        static TYPE_SHEET: string;
        /**
         * BitmapTextSpriteSheet文件
         * @constant {string} RES.ResourceItem.TYPE_FONT
         */
        static TYPE_FONT: string;
        /**
         * 声音文件
         * @constant {string} RES.ResourceItem.TYPE_SOUND
         */
        static TYPE_SOUND: string;
        /**
         * 构造函数
         * @method RES.ResourceItem#constructor
         * @param name {string} 加载项名称
         * @param url {string} 要加载的文件地址
         * @param type {string} 加载项文件类型
         */
        constructor(name: string, url: string, type: string);
        /**
         * 加载项名称
         * @member {string} RES.ResourceItem#name
         */
        name: string;
        /**
         * 要加载的文件地址
         * @member {string} RES.ResourceItem#url
         */
        url: string;
        /**
         * 加载项文件类型
         * @member {string} RES.ResourceItem#type
         */
        type: string;
        /**
         * 所属组名
         * @member {string} RES.ResourceItem#groupName
         */
        groupName: string;
        /**
         * 被引用的原始数据对象
         * @member {any} RES.ResourceItem#data
         */
        data: any;
        private _loaded;
        /**
         * 加载完成的标志
         * @member {boolean} RES.ResourceItem#loaded
         */
        loaded: boolean;
        /**
         * @method RES.ResourceItem#toString
         * @returns {string}
         */
        toString(): string;
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module RES {
    /**
     * @class RES.ResourceConfig
     * @classdesc
     */
    class ResourceConfig {
        constructor();
        /**
         * 根据组名获取组加载项列表
         * @method RES.ResourceConfig#getGroupByName
         * @param name {string} 组名
         * @returns {Array<egret.ResourceItem>}
         */
        getGroupByName(name: string): ResourceItem[];
        /**
         * 根据组名获取原始的组加载项列表
         * @method RES.ResourceConfig#getRawGroupByName
         * @param name {string} 组名
         * @returns {Array<any>}
         */
        getRawGroupByName(name: string): any[];
        /**
         * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
         * 可以监听ResourceEvent.CONFIG_COMPLETE事件来确认配置加载完成。
         * @method RES.ResourceConfig#createGroup
         * @param name {string} 要创建的加载资源组的组名
         * @param keys {egret.Array<string>} 要包含的键名列表，key对应配置文件里的name属性或sbuKeys属性的一项或一个资源组名。
         * @param override {boolean} 是否覆盖已经存在的同名资源组,默认false。
         * @returns {boolean}
         */
        createGroup(name: string, keys: string[], override?: boolean): boolean;
        /**
         * 一级键名字典
         */
        private keyMap;
        /**
         * 加载组字典
         */
        private groupDic;
        /**
         * 解析一个配置文件
         * @method RES.ResourceConfig#parseConfig
         * @param data {any} 配置文件数据
         * @param folder {string} 加载项的路径前缀。
         */
        parseConfig(data: any, folder: string): void;
        /**
         * 添加一个二级键名到配置列表。
         * @method RES.ResourceConfig#addSubkey
         * @param subkey {string} 要添加的二级键名
         * @param name {string} 二级键名所属的资源name属性
         */
        addSubkey(subkey: string, name: string): void;
        /**
         * 添加一个加载项数据到列表
         */
        private addItemToKeyMap(item);
        /**
         * 获取加载项的name属性
         * @method RES.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {string}
         */
        getName(key: string): string;
        /**
         * 获取加载项类型。
         * @method RES.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {string}
         */
        getType(key: string): string;
        getRawResourceItem(key: string): any;
        /**
         * 获取加载项信息对象
         * @method RES.ResourceConfig#getResourceItem
         * @param key {string} 对应配置文件里的key属性或sbuKeys属性的一项。
         * @returns {egret.ResourceItem}
         */
        getResourceItem(key: string): ResourceItem;
        /**
         * 转换Object数据为ResourceItem对象
         */
        private parseResourceItem(data);
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module RES {
    /**
     * @class RES.ResourceLoader
     * @classdesc
     * @extends egret.EventDispatcher
     */
    class ResourceLoader extends egret.EventDispatcher {
        /**
         * 构造函数
         * @method RES.ResourceLoader#constructor
         */
        constructor();
        /**
         * 最大并发加载数
         */
        thread: number;
        /**
         * 正在加载的线程计数
         */
        private loadingCount;
        /**
         * 一项加载结束回调函数。无论加载成功或者出错都将执行回调函数。示例：callBack(resItem:ResourceItem):void;
         * @member {Function} RES.ResourceLoader#callBack
         */
        callBack: Function;
        /**
         * RES单例的引用
         * @member {any} RES.ResourceLoader#resInstance
         */
        resInstance: any;
        /**
         * 当前组加载的项总个数,key为groupName
         */
        private groupTotalDic;
        /**
         * 已经加载的项个数,key为groupName
         */
        private numLoadedDic;
        /**
         * 正在加载的组列表,key为groupName
         */
        private itemListDic;
        /**
         * 优先级队列,key为priority，value为groupName列表
         */
        private priorityQueue;
        /**
         * 检查指定的组是否正在加载中
         * @method RES.ResourceLoader#isGroupInLoading
         * @param groupName {string}
         * @returns {boolean}
         */
        isGroupInLoading(groupName: string): boolean;
        /**
         * 开始加载一组文件
         * @method RES.ResourceLoader#loadGroup
         * @param list {egret.Array<ResourceItem>} 加载项列表
         * @param groupName {string} 组名
         * @param priority {number} 加载优先级
         */
        loadGroup(list: ResourceItem[], groupName: string, priority?: number): void;
        /**
         * 延迟加载队列
         */
        private lazyLoadList;
        /**
         * 加载一个文件
         * @method RES.ResourceLoader#loadItem
         * @param resItem {egret.ResourceItem} 要加载的项
         */
        loadItem(resItem: ResourceItem): void;
        /**
         * 资源解析库字典类
         */
        private analyzerDic;
        /**
         * 加载下一项
         */
        private next();
        /**
         * 当前应该加载同优先级队列的第几列
         */
        private queueIndex;
        /**
         * 获取下一个待加载项
         */
        private getOneResourceItem();
        /**
         * 加载结束
         */
        private onItemComplete(resItem);
        /**
         * 从优先级队列中移除指定的组名
         */
        private removeGroupName(groupName);
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module RES {
    class AnalyzerBase extends egret.HashObject {
        constructor();
        private resourceConfig;
        /**
         * 添加一个二级键名到配置列表。
         * @method RES.ResourceConfig#addSubkey
         * @param subkey {string} 要添加的二级键名
         * @param name {string} 二级键名所属的资源name属性
         */
        addSubkey(subkey: string, name: string): void;
        /**
         * 加载一个资源文件
         * @param resItem 加载项信息
         * @param compFunc 加载完成回调函数,示例:compFunc(resItem:ResourceItem):void;
         * @param thisObject 加载完成回调函数的this引用
         */
        loadFile(resItem: ResourceItem, compFunc: Function, thisObject: any): void;
        /**
         * 同步方式获取解析完成的数据
         * @param name 对应配置文件里的name属性。
         */
        getRes(name: string): any;
        /**
         * 销毁某个资源文件的二进制数据,返回是否删除成功。
         * @param name 配置文件中加载项的name属性
         */
        destroyRes(name: string): boolean;
        /**
         * 读取一个字符串里第一个点之前的内容。
         * @param name {string} 要读取的字符串
         */
        static getStringPrefix(name: string): string;
        /**
         * 读取一个字符串里第一个点之后的内容。
         * @param name {string} 要读取的字符串
         */
        static getStringTail(name: string): string;
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module RES {
    class BinAnalyzer extends AnalyzerBase {
        /**
         * 构造函数
         */
        constructor();
        /**
         * 字节流数据缓存字典
         */
        fileDic: any;
        /**
         * 加载项字典
         */
        resItemDic: any[];
        /**
         * @inheritDoc
         */
        loadFile(resItem: ResourceItem, compFunc: Function, thisObject: any): void;
        _dataFormat: string;
        /**
         * URLLoader对象池
         */
        recycler: egret.Recycler;
        /**
         * 获取一个URLLoader对象
         */
        private getLoader();
        /**
         * 一项加载结束
         */
        onLoadFinish(event: egret.Event): void;
        /**
         * 解析并缓存加载成功的数据
         */
        analyzeData(resItem: ResourceItem, data: any): void;
        /**
         * @inheritDoc
         */
        getRes(name: string): any;
        /**
         * @inheritDoc
         */
        hasRes(name: string): boolean;
        /**
         * @inheritDoc
         */
        destroyRes(name: string): boolean;
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module RES {
    class ImageAnalyzer extends BinAnalyzer {
        constructor();
        /**
         * 解析并缓存加载成功的数据
         */
        analyzeData(resItem: ResourceItem, data: any): void;
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module RES {
    class JsonAnalyzer extends BinAnalyzer {
        constructor();
        /**
         * 解析并缓存加载成功的数据
         */
        analyzeData(resItem: ResourceItem, data: any): void;
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module RES {
    class TextAnalyzer extends BinAnalyzer {
        constructor();
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module RES {
    /**
     * SpriteSheet解析器
     */
    class SheetAnalyzer extends BinAnalyzer {
        constructor();
        /**
         * @inheritDoc
         */
        getRes(name: string): any;
        /**
         * 一项加载结束
         */
        onLoadFinish(event: egret.Event): void;
        sheetMap: any;
        private textureMap;
        /**
         * 解析并缓存加载成功的数据
         */
        analyzeData(resItem: ResourceItem, data: any): void;
        private getRelativePath(url, file);
        parseSpriteSheet(texture: egret.Texture, data: any, name: string): egret.SpriteSheet;
    }
}
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
declare module RES {
    class FontAnalyzer extends SheetAnalyzer {
        constructor();
        /**
         * 解析并缓存加载成功的数据
         */
        analyzeData(resItem: ResourceItem, data: any): void;
        private getTexturePath(url, fntText);
    }
}
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
declare module RES {
    class SoundAnalyzer extends BinAnalyzer {
        constructor();
        analyzeData(resItem: ResourceItem, data: any): void;
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module RES {
    class XMLAnalyzer extends BinAnalyzer {
        constructor();
        /**
         * 解析并缓存加载成功的数据
         */
        analyzeData(resItem: ResourceItem, data: any): void;
    }
}
/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
declare module RES {
    /**
     * 加载配置文件并解析
     * @method RES.loadConfig
     * @param url {string} 配置文件路径(resource.json的路径)
     * @param resourceRoot {string} 资源根路径。配置中的所有url都是这个路径的相对值。最终url是这个字符串与配置里资源项的url相加的值。
     * @param type {string} 配置文件的格式。确定要用什么解析器来解析配置文件。默认"json"
     */
    function loadConfig(url: string, resourceRoot?: string, type?: string): void;
    /**
     * 根据组名加载一组资源
     * @method RES.loadGroup
     * @param name {string} 要加载资源组的组名
     * @param priority {number} 加载优先级,可以为负数,默认值为0。
     * 低优先级的组必须等待高优先级组完全加载结束才能开始，同一优先级的组会同时加载。
     */
    function loadGroup(name: string, priority?: number): void;
    /**
     * 检查某个资源组是否已经加载完成
     * @method RES.isGroupLoaded
     * @param name {string} 组名
     * @returns {boolean}
     */
    function isGroupLoaded(name: string): boolean;
    /**
     * 根据组名获取组加载项列表
     * @method RES.getGroupByName
     * @param name {string} 组名
     * @returns {egret.ResourceItem}
     */
    function getGroupByName(name: string): ResourceItem[];
    /**
     * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
     * 可以监听ResourceEvent.CONFIG_COMPLETE事件来确认配置加载完成。
     * @method RES.createGroup
     * @param name {string} 要创建的加载资源组的组名
     * @param keys {egret.Array<string>} 要包含的键名列表，key对应配置文件里的name属性或sbuKeys属性的一项或一个资源组名。
     * @param override {boolean} 是否覆盖已经存在的同名资源组,默认false。
     * @returns {boolean}
     */
    function createGroup(name: string, keys: string[], override?: boolean): boolean;
    /**
     * 检查配置文件里是否含有指定的资源
     * @method RES.hasRes
     * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
     * @returns {boolean}
     */
    function hasRes(key: string): boolean;
    /**
     * 同步方式获取缓存的已经加载成功的资源。<br/>
     * @method RES.getRes
     * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
     * @returns {any}
     */
    function getRes(key: string): any;
    /**
     * 异步方式获取配置里的资源。只要是配置文件里存在的资源，都可以通过异步方式获取。
     * @method RES.getResAsync
     * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
     * @param compFunc {Function} 回调函数。示例：compFunc(data,key):void。
     * @param thisObject {any} 回调函数的this引用
     */
    function getResAsync(key: string, compFunc: Function, thisObject: any): void;
    /**
     * 通过完整URL方式获取外部资源。
     * @method RES.getResByUrl
     * @param url {string} 要加载文件的外部路径。
     * @param compFunc {Function} 回调函数。示例：compFunc(data,url):void。
     * @param thisObject {any} 回调函数的this引用
     * @param type {string} 文件类型(可选)。请使用ResourceItem类中定义的静态常量。若不设置将根据文件扩展名生成。
     */
    function getResByUrl(url: string, compFunc: Function, thisObject: any, type?: string): void;
    /**
     * 销毁单个资源文件或一组资源的缓存数据,返回是否删除成功。
     * @method RES.destroyRes
     * @param name {string} 配置文件中加载项的name属性或资源组名
     * @returns {boolean}
     */
    function destroyRes(name: string): boolean;
    /**
     * 设置最大并发加载线程数量，默认值是2.
     * @method RES.setMaxLoadingThread
     * @param thread {number} 要设置的并发加载数。
     */
    function setMaxLoadingThread(thread: number): void;
    /**
     * 添加事件侦听器,参考ResourceEvent定义的常量。
     * @method RES.addEventListener
     * @param type {string} 事件的类型。
     * @param listener {Function} 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
     * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
     * @param thisObject {any} 侦听函数绑定的this对象
     * @param useCapture {boolean} 确定侦听器是运行于捕获阶段还是运行于目标和冒泡阶段。如果将 useCapture 设置为 true，
     * 则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在目标或冒泡阶段处理事件。
     * 要在所有三个阶段都侦听事件，请调用 addEventListener 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
     * @param priority {number} 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
     * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
     */
    function addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;
    /**
     * 移除事件侦听器,参考ResourceEvent定义的常量。
     * @method RES.removeEventListener
     * @param type {string} 事件名
     * @param listener {Function} 侦听函数
     * @param thisObject {any} 侦听函数绑定的this对象
     * @param useCapture {boolean} 是否使用捕获，这个属性只在显示列表中生效。
     */
    function removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
}
