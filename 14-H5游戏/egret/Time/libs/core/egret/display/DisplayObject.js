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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
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
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        function DisplayObject() {
            _super.call(this);
            this.__hack_local_matrix = null;
            this._normalDirty = true;
            //对宽高有影响
            this._sizeDirty = true;
            this._texture_to_render = null;
            this._parent = null;
            /**
             * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。
             * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
             * @member {number} egret.DisplayObject#x
             */
            this._x = 0;
            /**
             * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 y 坐标。
             * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
             * @member {number} egret.DisplayObject#y
             */
            this._y = 0;
            /**
             * 表示从注册点开始应用的对象的水平缩放比例（百分比）。
             * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
             * 默认值为 1，即不缩放。
             * @member {number} egret.DisplayObject#scaleX
             * @default 1
             */
            this._scaleX = 1;
            /**
             * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。
             * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
             * 默认值为 1，即不缩放。
             * @member {number} egret.DisplayObject#scaleY
             * @default 1
             */
            this._scaleY = 1;
            /**
             * 表示从对象绝对锚点X。
             * @member {number} egret.DisplayObject#anchorOffsetX
             * @default 0
             */
            this._anchorOffsetX = 0;
            /**
             * 表示从对象绝对锚点Y。
             * @member {number} egret.DisplayObject#anchorOffsetY
             * @default 0
             */
            this._anchorOffsetY = 0;
            /**
             * 表示从对象相对锚点X。
             * @member {number} egret.DisplayObject#anchorX
             * @default 0
             */
            this._anchorX = 0;
            /**
             * 表示从对象相对锚点Y。
             * @member {number} egret.DisplayObject#anchorY
             * @default 0
             */
            this._anchorY = 0;
            /**
             * 显示对象是否可见。
             * 不可见的显示对象已被禁用。例如，如果实例的 visible=false，则无法单击该对象。
             * 默认值为 true 可见
             * @member {boolean} egret.DisplayObject#visible
             */
            this._visible = true;
            /**
             * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
             * 从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或减去 360 获得该范围内的值。例如，my_video.rotation = 450语句与 my_video.rotation = 90 是相同的。
             * @member {number} egret.DisplayObject#rotation
             * @default 0 默认值为 0 不旋转。
             */
            this._rotation = 0;
            /**
             * 表示指定对象的 Alpha 透明度值。
             * 有效值为 0（完全透明）到 1（完全不透明）。alpha 设置为 0 的显示对象是活动的，即使它们不可见。
             * @member {number} egret.DisplayObject#alpha
             *  @default 1 默认值为 1。
             */
            this._alpha = 1;
            /**
             * 表示DisplayObject的x方向斜切
             * @member {number} egret.DisplayObject#skewX
             * @default 0
             */
            this._skewX = 0;
            /**
             * 表示DisplayObject的y方向斜切
             * @member {number} egret.DisplayObject#skewY
             * @default 0
             */
            this._skewY = 0;
            /**
             * 指定此对象是否接收鼠标/触摸事件
             * @member {boolean} egret.DisplayObject#touchEnabled
             * @default false 默认为 false 即不可以接收。
             */
            this._touchEnabled = false;
            /**
             * BlendMode 类中的一个值，用于指定要使用的混合模式。
             * 内部绘制位图的方法有两种。 如果启用了混合模式或外部剪辑遮罩，则将通过向矢量渲染器添加有位图填充的正方形来绘制位图。 如果尝试将此属性设置为无效值，则运行时会将此值设置为 BlendMode.NORMAL。
             * @member {BlendMode} egret.DisplayObject#blendMode
             */
            this.blendMode = null;
            /**
             * 显示对象的滚动矩形范围。显示对象被裁切为矩形定义的大小，当您更改 scrollRect 对象的 x 和 y 属性时，它会在矩形内滚动。
             *  @member {egret.Rectangle} egret.DisplayObject#scrollRect
             */
            this._scrollRect = null;
            this._hasWidthSet = false;
            this._hasHeightSet = false;
            /**
             * 调用显示对象被指定的 mask 对象遮罩。
             * 要确保当舞台缩放时蒙版仍然有效，mask 显示对象必须处于显示列表的活动部分。但不绘制 mask 对象本身。
             * 将 mask 设置为 null 可删除蒙版。
             */
            this.mask = null;
            this._worldBounds = null;
            this.worldAlpha = 1;
            this._rectW = 0;
            this._rectH = 0;
            this._stage = null;
            this._cacheAsBitmap = false;
            this._cacheDirty = false;
            /**
             * beta功能，请勿调用此方法
             */
            this._colorTransform = null;
            this._worldTransform = new egret.Matrix();
            this._worldBounds = new egret.Rectangle(0, 0, 0, 0);
            this._cacheBounds = new egret.Rectangle(0, 0, 0, 0);
        }
        DisplayObject.prototype._setDirty = function () {
            this._normalDirty = true;
        };
        DisplayObject.prototype.getDirty = function () {
            return this._normalDirty || this._sizeDirty;
        };
        DisplayObject.prototype._setParentSizeDirty = function () {
            var parent = this._parent;
            if (parent && (!(parent._hasWidthSet || parent._hasHeightSet))) {
                parent._setSizeDirty();
            }
        };
        DisplayObject.prototype._setSizeDirty = function () {
            if (this._sizeDirty) {
                return;
            }
            this._sizeDirty = true;
            this._setDirty();
            this._setParentSizeDirty();
        };
        DisplayObject.prototype._clearDirty = function () {
            //todo 这个除了文本的，其他都没有clear过
            this._normalDirty = false;
        };
        DisplayObject.prototype._clearSizeDirty = function () {
            //todo 最好在enterFrame都重新算一遍
            this._sizeDirty = false;
        };
        Object.defineProperty(DisplayObject.prototype, "parent", {
            /**
             * 表示包含此显示对象的 DisplayObjectContainer 对象。【只读】
             * 使用 parent 属性可以指定高于显示列表层次结构中当前显示对象的显示对象的相对路径。
             * @member {egret.DisplayObjectContainer} egret.DisplayObject#parent
             */
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype._parentChanged = function (parent) {
            this._parent = parent;
        };
        Object.defineProperty(DisplayObject.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._setX(value);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype._setX = function (value) {
            if (egret.NumberUtils.isNumber(value) && this._x != value) {
                this._x = value;
                this._setDirty();
                this._setParentSizeDirty();
            }
        };
        Object.defineProperty(DisplayObject.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._setY(value);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype._setY = function (value) {
            if (egret.NumberUtils.isNumber(value) && this._y != value) {
                this._y = value;
                this._setDirty();
                this._setParentSizeDirty();
            }
        };
        Object.defineProperty(DisplayObject.prototype, "scaleX", {
            get: function () {
                return this._scaleX;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value) && this._scaleX != value) {
                    this._scaleX = value;
                    this._setDirty();
                    this._setParentSizeDirty();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scaleY", {
            get: function () {
                return this._scaleY;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value) && this._scaleY != value) {
                    this._scaleY = value;
                    this._setDirty();
                    this._setParentSizeDirty();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "anchorOffsetX", {
            get: function () {
                return this._anchorOffsetX;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value) && this._anchorOffsetX != value) {
                    this._anchorOffsetX = value;
                    this._setDirty();
                    this._setParentSizeDirty();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "anchorOffsetY", {
            get: function () {
                return this._anchorOffsetY;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value) && this._anchorOffsetY != value) {
                    this._anchorOffsetY = value;
                    this._setDirty();
                    this._setParentSizeDirty();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "anchorX", {
            get: function () {
                return this._anchorX;
            },
            set: function (value) {
                this._setAnchorX(value);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype._setAnchorX = function (value) {
            if (egret.NumberUtils.isNumber(value) && this._anchorX != value) {
                this._anchorX = value;
                this._setDirty();
                this._setParentSizeDirty();
            }
        };
        Object.defineProperty(DisplayObject.prototype, "anchorY", {
            get: function () {
                return this._anchorY;
            },
            set: function (value) {
                this._setAnchorY(value);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype._setAnchorY = function (value) {
            if (egret.NumberUtils.isNumber(value) && this._anchorY != value) {
                this._anchorY = value;
                this._setDirty();
                this._setParentSizeDirty();
            }
        };
        Object.defineProperty(DisplayObject.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._setVisible(value);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype._setVisible = function (value) {
            if (this._visible != value) {
                this._visible = value;
                this._setSizeDirty();
            }
        };
        Object.defineProperty(DisplayObject.prototype, "rotation", {
            get: function () {
                return this._rotation;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value) && this._rotation != value) {
                    this._rotation = value;
                    this._setSizeDirty();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value) && this._alpha != value) {
                    this._alpha = value;
                    this._setDirty();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "skewX", {
            get: function () {
                return this._skewX;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value) && this._skewX != value) {
                    this._skewX = value;
                    this._setSizeDirty();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "skewY", {
            get: function () {
                return this._skewY;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value) && this._skewY != value) {
                    this._skewY = value;
                    this._setSizeDirty();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "touchEnabled", {
            get: function () {
                return this._touchEnabled;
            },
            set: function (value) {
                this._setTouchEnabled(value);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype._setTouchEnabled = function (value) {
            this._touchEnabled = value;
        };
        Object.defineProperty(DisplayObject.prototype, "scrollRect", {
            get: function () {
                return this._scrollRect;
            },
            set: function (value) {
                this._setScrollRect(value);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype._setScrollRect = function (value) {
            this._scrollRect = value;
            this._setSizeDirty();
        };
        Object.defineProperty(DisplayObject.prototype, "measuredWidth", {
            /**
             * 测量宽度
             * @returns {number}
             */
            get: function () {
                return this._measureBounds().width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "measuredHeight", {
            /**
             * 测量高度
             * @returns {number}
             */
            get: function () {
                return this._measureBounds().height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "explicitWidth", {
            get: function () {
                return this._explicitWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "explicitHeight", {
            get: function () {
                return this._explicitHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "width", {
            /**
             * 表示显示对象的宽度，以像素为单位。
             * 宽度是根据显示对象内容的范围来计算的。优先顺序为 显式设置宽度 > 测量宽度。
             * @member {number} egret.DisplayObject#width
             * @returns {number}
             */
            get: function () {
                return this._getSize(egret.Rectangle.identity).width;
            },
            /**
             * 显式设置宽度
             * @param value
             */
            set: function (value) {
                this._setWidth(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "height", {
            /**
             * 表示显示对象的高度，以像素为单位。
             * 高度是根据显示对象内容的范围来计算的。优先顺序为 显式设置高度 > 测量高度。
             * @member {number} egret.DisplayObject#height
             * @returns {number}
             */
            get: function () {
                return this._getSize(egret.Rectangle.identity).height;
            },
            /**
             * 显式设置高度
             * @param value
             */
            set: function (value) {
                this._setHeight(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @inheritDoc
         */
        DisplayObject.prototype._setWidth = function (value) {
            this._setSizeDirty();
            this._setCacheDirty();
            this._explicitWidth = value;
            this._hasWidthSet = egret.NumberUtils.isNumber(value);
        };
        /**
         * @inheritDoc
         */
        DisplayObject.prototype._setHeight = function (value) {
            this._setSizeDirty();
            this._setCacheDirty();
            this._explicitHeight = value;
            this._hasHeightSet = egret.NumberUtils.isNumber(value);
        };
        /**
         * @private
         * @param renderContext
         */
        DisplayObject.prototype._draw = function (renderContext) {
            if (!this._visible) {
                this.destroyCacheBounds();
                return;
            }
            var hasDrawCache = this.drawCacheTexture(renderContext);
            if (hasDrawCache) {
                this.destroyCacheBounds();
                return;
            }
            var o = this;
            if (o._colorTransform) {
                renderContext.setGlobalColorTransform(o._colorTransform.matrix);
            }
            renderContext.setAlpha(o.worldAlpha, o.blendMode);
            renderContext.setTransform(o._worldTransform);
            var mask = o.mask || o._scrollRect;
            if (mask) {
                renderContext.pushMask(mask);
            }
            this._render(renderContext);
            if (mask) {
                renderContext.popMask();
            }
            if (o._colorTransform) {
                renderContext.setGlobalColorTransform(null);
            }
            this.destroyCacheBounds();
        };
        DisplayObject.prototype.drawCacheTexture = function (renderContext) {
            var display = this;
            if (display._cacheAsBitmap) {
                if (this._cacheDirty || this.width != this.renderTexture._sourceWidth || this.height != this.renderTexture._sourceHeight) {
                    this._makeBitmapCache();
                    this._cacheDirty = false;
                }
                var renderTexture = display._texture_to_render;
                var offsetX = renderTexture._offsetX;
                var offsetY = renderTexture._offsetY;
                var width = renderTexture._textureWidth;
                var height = renderTexture._textureHeight;
                display._updateTransform();
                renderContext.setAlpha(display.worldAlpha, display.blendMode);
                renderContext.setTransform(display._worldTransform);
                var scale_factor = egret.MainContext.instance.rendererContext.texture_scale_factor;
                var renderFilter = egret.RenderFilter.getInstance();
                renderFilter.drawImage(renderContext, display, 0, 0, width * scale_factor, height * scale_factor, offsetX, offsetY, width, height);
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * @private
         * @param renderContext
         */
        DisplayObject.prototype._updateTransform = function () {
            this._calculateWorldTransform();
        };
        /**
         * 计算全局数据
         * @private
         */
        DisplayObject.prototype._calculateWorldTransform = function () {
            var o = this;
            var worldTransform = o._worldTransform;
            var parent = o._parent;
            worldTransform.identityMatrix(parent._worldTransform);
            this._getMatrix(worldTransform);
            var scrollRect = this._scrollRect;
            if (scrollRect) {
                worldTransform.append(1, 0, 0, 1, -scrollRect.x, -scrollRect.y);
            }
            //            if (this._texture_to_render){
            //                var bounds:egret.Rectangle = DisplayObject.getTransformBounds(o._getSize(Rectangle.identity), o._worldTransform);
            //                o._worldBounds.initialize(bounds.x, bounds.y, bounds.width, bounds.height);
            //            }
            o.worldAlpha = parent.worldAlpha * o._alpha;
        };
        /**
         * @private
         * @param renderContext
         */
        DisplayObject.prototype._render = function (renderContext) {
        };
        /**
         * 获取显示对象的测量边界
         * @method egret.DisplayObject#getBounds
         * @param resultRect {Rectangle} 可选参数，传入用于保存结果的Rectangle对象，避免重复创建对象。
         * @param calculateAnchor {boolean} 可选参数，是否会计算锚点。
         * @returns {Rectangle}
         */
        DisplayObject.prototype.getBounds = function (resultRect, calculateAnchor) {
            if (calculateAnchor === void 0) { calculateAnchor = true; }
            //            if (this._cacheBounds.x == 0 && this._cacheBounds.y == 0 && this._cacheBounds.width == 0 && this._cacheBounds.height == 0) {
            var rect = this._measureBounds();
            var w = this._hasWidthSet ? this._explicitWidth : rect.width;
            var h = this._hasHeightSet ? this._explicitHeight : rect.height;
            //记录测量宽高
            this._rectW = rect.width;
            this._rectH = rect.height;
            this._clearSizeDirty();
            var x = rect.x;
            var y = rect.y;
            var anchorX = 0, anchorY = 0;
            if (calculateAnchor) {
                if (this._anchorX != 0 || this._anchorY != 0) {
                    anchorX = w * this._anchorX;
                    anchorY = h * this._anchorY;
                }
                else {
                    anchorX = this._anchorOffsetX;
                    anchorY = this._anchorOffsetY;
                }
            }
            this._cacheBounds.initialize(x - anchorX, y - anchorY, w, h);
            //            }
            var result = this._cacheBounds;
            if (!resultRect) {
                resultRect = new egret.Rectangle();
            }
            return resultRect.initialize(result.x, result.y, result.width, result.height);
        };
        DisplayObject.prototype.destroyCacheBounds = function () {
            this._cacheBounds.x = 0;
            this._cacheBounds.y = 0;
            this._cacheBounds.width = 0;
            this._cacheBounds.height = 0;
        };
        DisplayObject.prototype._getConcatenatedMatrix = function () {
            //todo:采用local_matrix模式下这里的逻辑需要修改
            var matrix = DisplayObject.identityMatrixForGetConcatenated.identity();
            var o = this;
            while (o != null) {
                if (o._anchorX != 0 || o._anchorY != 0) {
                    var bounds = o._getSize(egret.Rectangle.identity);
                    matrix.prependTransform(o._x, o._y, o._scaleX, o._scaleY, o._rotation, o._skewX, o._skewY, bounds.width * o._anchorX, bounds.height * o._anchorY);
                }
                else {
                    matrix.prependTransform(o._x, o._y, o._scaleX, o._scaleY, o._rotation, o._skewX, o._skewY, o._anchorOffsetX, o._anchorOffsetY);
                }
                o = o._parent;
            }
            return matrix;
        };
        /**
         * 将 point 对象从显示对象的（本地）坐标转换为舞台（全局）坐标。
         * @method egret.DisplayObject#localToGlobal
         * @param x {number} 本地x坐标
         * @param y {number} 本地y坐标
         * @param resultPoint {Point} 可选参数，传入用于保存结果的Point对象，避免重复创建对象。
         * @returns {egret.Point} 具有相对于舞台的坐标的 Point 对象。
         */
        DisplayObject.prototype.localToGlobal = function (x, y, resultPoint) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var mtx = this._getConcatenatedMatrix();
            mtx.append(1, 0, 0, 1, x, y);
            if (!resultPoint) {
                resultPoint = new egret.Point();
            }
            resultPoint.x = mtx.tx;
            resultPoint.y = mtx.ty;
            return resultPoint;
        };
        /**
         * 将指定舞台坐标（全局）转换为显示对象（本地）坐标。
         * @method egret.DisplayObject#globalToLocal
         * @param x {number} 全局x坐标
         * @param y {number} 全局y坐标
         * @param resultPoint {Point} 可选参数，传入用于保存结果的Point对象，避免重复创建对象。
         * @returns {egret.Point} 具有相对于显示对象的坐标的 Point 对象。
         */
        DisplayObject.prototype.globalToLocal = function (x, y, resultPoint) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var mtx = this._getConcatenatedMatrix();
            mtx.invert();
            mtx.append(1, 0, 0, 1, x, y);
            if (!resultPoint) {
                resultPoint = new egret.Point();
            }
            resultPoint.x = mtx.tx;
            resultPoint.y = mtx.ty;
            return resultPoint;
        };
        /**
         * 检测指定坐标是否在显示对象内
         * @method egret.DisplayObject#hitTest
         * @param x {number} 检测坐标的x轴
         * @param y {number} 检测坐标的y轴
         * @param ignoreTouchEnabled {boolean} 是否忽略TouchEnabled
         * @returns {*}
         */
        DisplayObject.prototype.hitTest = function (x, y, ignoreTouchEnabled) {
            if (ignoreTouchEnabled === void 0) { ignoreTouchEnabled = false; }
            if (!this._visible || (!ignoreTouchEnabled && !this._touchEnabled)) {
                return null;
            }
            var bound = this._getSize(egret.Rectangle.identity);
            if (0 <= x && x < bound.width && 0 <= y && y < bound.height) {
                if (this.mask || this._scrollRect) {
                    if (this._scrollRect && x > this._scrollRect.x && y > this._scrollRect.y && x < this._scrollRect.x + this._scrollRect.width && y < this._scrollRect.y + this._scrollRect.height) {
                        return this;
                    }
                    else if (this.mask && this.mask.x <= x && x < this.mask.x + this.mask.width && this.mask.y <= y && y < this.mask.y + this.mask.height) {
                        return this;
                    }
                    return null;
                }
                return this;
            }
            else {
                return null;
            }
        };
        /**
         * 计算显示对象，以确定它是否与 x 和 y 参数指定的点重叠或相交。x 和 y 参数指定舞台的坐标空间中的点，而不是包含显示对象的显示对象容器中的点（除非显示对象容器是舞台）。
         * 注意，不要在大量物体中使用精确碰撞像素检测，这回带来巨大的性能开销
         * @method egret.DisplayObject#hitTestPoint
         * @param x {number}  要测试的此对象的 x 坐标。
         * @param y {number}  要测试的此对象的 y 坐标。
         * @param shapeFlag {boolean} 是检查对象 (true) 的实际像素，还是检查边框 (false) 的实际像素。
         * @returns {boolean} 如果显示对象与指定的点重叠或相交，则为 true；否则为 false。
         */
        DisplayObject.prototype.hitTestPoint = function (x, y, shapeFlag) {
            var p = this.globalToLocal(x, y);
            if (!shapeFlag) {
                return !!this.hitTest(p.x, p.y, true);
            }
            else {
                if (!this._hitTestPointTexture) {
                    this._hitTestPointTexture = new egret.RenderTexture();
                }
                var testTexture = this._hitTestPointTexture;
                testTexture.drawToTexture(this);
                var pixelData = testTexture.getPixel32(p.x - this._hitTestPointTexture._offsetX, p.y - this._hitTestPointTexture._offsetY);
                if (pixelData[3] != 0) {
                    return true;
                }
                return false;
            }
        };
        DisplayObject.prototype._getMatrix = function (parentMatrix) {
            if (!parentMatrix) {
                parentMatrix = egret.Matrix.identity.identity();
            }
            var anchorX, anchorY;
            var resultPoint = this._getOffsetPoint();
            anchorX = resultPoint.x;
            anchorY = resultPoint.y;
            var matrix = this.__hack_local_matrix;
            if (matrix) {
                parentMatrix.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                parentMatrix.append(1, 0, 0, 1, -anchorX, -anchorY);
            }
            else {
                parentMatrix.appendTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation, this._skewX, this._skewY, anchorX, anchorY);
            }
            return parentMatrix;
        };
        DisplayObject.prototype._getSize = function (resultRect) {
            if (this._hasHeightSet && this._hasWidthSet) {
                return resultRect.initialize(0, 0, this._explicitWidth, this._explicitHeight);
            }
            return this._measureSize(resultRect);
        };
        /**
         * 测量显示对象坐标与大小
         */
        DisplayObject.prototype._measureSize = function (resultRect) {
            if (this._sizeDirty) {
                resultRect = this._measureBounds();
                this._rectW = resultRect.width;
                this._rectH = resultRect.height;
                this._clearSizeDirty();
            }
            else {
                resultRect.width = this._rectW;
                resultRect.height = this._rectH;
            }
            resultRect.x = 0;
            resultRect.y = 0;
            return resultRect;
        };
        /**
         * 测量显示对象坐标，这个方法需要子类重写
         * @returns {egret.Rectangle}
         * @private
         */
        DisplayObject.prototype._measureBounds = function () {
            return egret.Rectangle.identity.initialize(0, 0, 0, 0);
        };
        DisplayObject.prototype._getOffsetPoint = function () {
            var o = this;
            var regX = o._anchorOffsetX;
            var regY = o._anchorOffsetY;
            if (o._anchorX != 0 || o._anchorY != 0) {
                var bounds = o._getSize(egret.Rectangle.identity);
                regX = o._anchorX * bounds.width;
                regY = o._anchorY * bounds.height;
            }
            var result = egret.Point.identity;
            result.x = regX;
            result.y = regY;
            return result;
        };
        DisplayObject.prototype._onAddToStage = function () {
            this._stage = egret.MainContext.instance.stage;
            egret.DisplayObjectContainer.__EVENT__ADD_TO_STAGE_LIST.push(this);
        };
        DisplayObject.prototype._onRemoveFromStage = function () {
            egret.DisplayObjectContainer.__EVENT__REMOVE_FROM_STAGE_LIST.push(this);
        };
        Object.defineProperty(DisplayObject.prototype, "stage", {
            /**
             * 显示对象的舞台。【只读】
             * 例如，您可以创建多个显示对象并加载到显示列表中，每个显示对象的 stage 属性是指相同的 Stage 对象。
             * 如果显示对象未添加到显示列表，则其 stage 属性会设置为 null。
             * @member {number} egret.DisplayObject#stage
             * @returns {egret.Stage}
             */
            get: function () {
                return this._stage;
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            if (useCapture === void 0) { useCapture = false; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.addEventListener.call(this, type, listener, thisObject, useCapture, priority);
            var isEnterFrame = (type == egret.Event.ENTER_FRAME);
            if (isEnterFrame || type == egret.Event.RENDER) {
                var list = isEnterFrame ? DisplayObject._enterFrameCallBackList : DisplayObject._renderCallBackList;
                this._insertEventBin(list, listener, thisObject, priority, this);
            }
        };
        DisplayObject.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            _super.prototype.removeEventListener.call(this, type, listener, thisObject, useCapture);
            var isEnterFrame = (type == egret.Event.ENTER_FRAME);
            if (isEnterFrame || type == egret.Event.RENDER) {
                var list = isEnterFrame ? DisplayObject._enterFrameCallBackList : DisplayObject._renderCallBackList;
                this._removeEventBin(list, listener, thisObject, this);
            }
        };
        DisplayObject.prototype.dispatchEvent = function (event) {
            if (!event._bubbles) {
                return _super.prototype.dispatchEvent.call(this, event);
            }
            var list = [];
            var target = this;
            while (target) {
                list.push(target);
                target = target._parent;
            }
            event._reset();
            this._dispatchPropagationEvent(event, list);
            return !event._isDefaultPrevented;
        };
        DisplayObject.prototype._dispatchPropagationEvent = function (event, list, targetIndex) {
            var length = list.length;
            var eventPhase = 1;
            for (var i = length - 1; i >= 0; i--) {
                var currentTarget = list[i];
                event._currentTarget = currentTarget;
                event._target = this;
                event._eventPhase = eventPhase;
                currentTarget._notifyListener(event);
                if (event._isPropagationStopped || event._isPropagationImmediateStopped) {
                    return;
                }
            }
            var eventPhase = 2;
            var currentTarget = list[0];
            event._currentTarget = currentTarget;
            event._target = this;
            event._eventPhase = eventPhase;
            currentTarget._notifyListener(event);
            if (event._isPropagationStopped || event._isPropagationImmediateStopped) {
                return;
            }
            var eventPhase = 3;
            for (i = 1; i < length; i++) {
                var currentTarget = list[i];
                event._currentTarget = currentTarget;
                event._target = this;
                event._eventPhase = eventPhase;
                currentTarget._notifyListener(event);
                if (event._isPropagationStopped || event._isPropagationImmediateStopped) {
                    return;
                }
            }
        };
        DisplayObject.prototype.willTrigger = function (type) {
            var parent = this;
            while (parent) {
                if (parent.hasEventListener(type))
                    return true;
                parent = parent._parent;
            }
            return false;
        };
        Object.defineProperty(DisplayObject.prototype, "cacheAsBitmap", {
            get: function () {
                return this._cacheAsBitmap;
            },
            set: function (bool) {
                this._cacheAsBitmap = bool;
                if (bool) {
                    this._makeBitmapCache();
                }
                else {
                    this._texture_to_render = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype._makeBitmapCache = function () {
            if (!this.renderTexture) {
                this.renderTexture = new egret.RenderTexture();
            }
            this.renderTexture.drawToTexture(this);
            this._texture_to_render = this.renderTexture;
        };
        DisplayObject.prototype._setCacheDirty = function (dirty) {
            if (dirty === void 0) { dirty = true; }
            this._cacheDirty = dirty;
        };
        DisplayObject.getTransformBounds = function (bounds, mtx) {
            var x = bounds.x, y = bounds.y;
            //            var x, y;
            var width = bounds.width, height = bounds.height;
            if (x || y) {
                mtx.appendTransform(0, 0, 1, 1, 0, 0, 0, -x, -y);
            }
            //        if (matrix) { mtx.prependMatrix(matrix); }
            var x_a = width * mtx.a, x_b = width * mtx.b;
            var y_c = height * mtx.c, y_d = height * mtx.d;
            var tx = mtx.tx, ty = mtx.ty;
            var minX = tx, maxX = tx, minY = ty, maxY = ty;
            if ((x = x_a + tx) < minX) {
                minX = x;
            }
            else if (x > maxX) {
                maxX = x;
            }
            if ((x = x_a + y_c + tx) < minX) {
                minX = x;
            }
            else if (x > maxX) {
                maxX = x;
            }
            if ((x = y_c + tx) < minX) {
                minX = x;
            }
            else if (x > maxX) {
                maxX = x;
            }
            if ((y = x_b + ty) < minY) {
                minY = y;
            }
            else if (y > maxY) {
                maxY = y;
            }
            if ((y = x_b + y_d + ty) < minY) {
                minY = y;
            }
            else if (y > maxY) {
                maxY = y;
            }
            if ((y = y_d + ty) < minY) {
                minY = y;
            }
            else if (y > maxY) {
                maxY = y;
            }
            return bounds.initialize(minX, minY, maxX - minX, maxY - minY);
        };
        Object.defineProperty(DisplayObject.prototype, "colorTransform", {
            get: function () {
                return this._colorTransform;
            },
            set: function (value) {
                this._colorTransform = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @returns {Matrix}
         */
        DisplayObject.identityMatrixForGetConcatenated = new egret.Matrix();
        DisplayObject._enterFrameCallBackList = [];
        DisplayObject._renderCallBackList = [];
        return DisplayObject;
    })(egret.EventDispatcher);
    egret.DisplayObject = DisplayObject;
    DisplayObject.prototype.__class__ = "egret.DisplayObject";
    var ColorTransform = (function () {
        function ColorTransform() {
            this.matrix = null;
        }
        ColorTransform.prototype.updateColor = function (r, g, b, a, addR, addG, addB, addA) {
            //todo;
        };
        return ColorTransform;
    })();
    egret.ColorTransform = ColorTransform;
    ColorTransform.prototype.__class__ = "egret.ColorTransform";
})(egret || (egret = {}));
