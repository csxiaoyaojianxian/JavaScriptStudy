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
     * @class egret.HTML5CanvasRenderer
     * @classdesc
     * @extends egret.RendererContext
     */
    var HTML5CanvasRenderer = (function (_super) {
        __extends(HTML5CanvasRenderer, _super);
        function HTML5CanvasRenderer(canvas) {
            _super.call(this);
            this.globalAlpha = 1;
            this.canvas = canvas || this.createCanvas();
            this.canvasContext = this.canvas.getContext("2d");
            this._cacheCanvas = document.createElement("canvas");
            this._cacheCanvas.width = this.canvas.width;
            this._cacheCanvas.height = this.canvas.height;
            this._cacheCanvasContext = this._cacheCanvas.getContext("2d");
            this._cacheCanvasContext["imageSmoothingEnabled"] = egret.RendererContext.imageSmoothingEnabled;
            this._cacheCanvasContext["webkitImageSmoothingEnabled"] = egret.RendererContext.imageSmoothingEnabled;
            this._cacheCanvasContext["mozImageSmoothingEnabled"] = egret.RendererContext.imageSmoothingEnabled;
            this._cacheCanvasContext["msImageSmoothingEnabled"] = egret.RendererContext.imageSmoothingEnabled;
            var f = this.canvasContext.setTransform;
            var that = this;
            this._cacheCanvasContext.setTransform = function (a, b, c, d, tx, ty) {
                that._matrixA = a;
                that._matrixB = b;
                that._matrixC = c;
                that._matrixD = d;
                that._matrixTx = tx;
                that._matrixTy = ty;
                f.call(that._cacheCanvasContext, a, b, c, d, tx, ty);
            };
            this._matrixA = 1;
            this._matrixB = 0;
            this._matrixC = 0;
            this._matrixD = 1;
            this._matrixTx = 0;
            this._matrixTy = 0;
            this._transformTx = 0;
            this._transformTy = 0;
            this.initBlendMode();
        }
        HTML5CanvasRenderer.prototype.createCanvas = function () {
            var canvas = egret.Browser.getInstance().$("#egretCanvas");
            if (!canvas) {
                var container = document.getElementById(egret.StageDelegate.canvas_div_name);
                canvas = egret.Browser.getInstance().$new("canvas");
                canvas.id = "egretCanvas";
                canvas.width = egret.MainContext.instance.stage.stageWidth; //stageW
                canvas.height = egret.MainContext.instance.stage.stageHeight; //stageH
                canvas.style.width = container.style.width;
                canvas.style.height = container.style.height;
                //                canvas.style.position = "absolute";
                container.appendChild(canvas);
            }
            return canvas;
        };
        HTML5CanvasRenderer.prototype.clearScreen = function () {
            var list = egret.RenderFilter.getInstance().getDrawAreaList();
            for (var i = 0, l = list.length; i < l; i++) {
                var area = list[i];
                this.clearRect(area.x, area.y, area.width, area.height);
            }
            var stage = egret.MainContext.instance.stage;
            this._cacheCanvasContext.clearRect(0, 0, stage.stageWidth, stage.stageHeight);
            this.renderCost = 0;
        };
        HTML5CanvasRenderer.prototype.clearRect = function (x, y, w, h) {
            //            this.canvasContext.fillRect(x, y, w, h);
            this.canvasContext.clearRect(x, y, w, h);
        };
        HTML5CanvasRenderer.prototype.drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat) {
            if (repeat === void 0) { repeat = undefined; }
            var scale = egret.MainContext.instance.rendererContext.texture_scale_factor;
            sourceX = sourceX / scale;
            sourceY = sourceY / scale;
            sourceWidth = sourceWidth / scale;
            sourceHeight = sourceHeight / scale;
            //            if (DEBUG && DEBUG.DRAW_IMAGE) {
            //                DEBUG.checkDrawImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            //            }
            var image = texture._bitmapData;
            destX += this._transformTx;
            destY += this._transformTy;
            var beforeDraw = egret.getTimer();
            if (repeat === undefined) {
                this._cacheCanvasContext.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            }
            else {
                this.drawRepeatImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat);
            }
            _super.prototype.drawImage.call(this, texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat);
            this.renderCost += egret.getTimer() - beforeDraw;
        };
        HTML5CanvasRenderer.prototype.drawRepeatImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat) {
            if (texture['pattern'] === undefined) {
                var image = texture._bitmapData;
                var tempImage = image;
                if (image.width != sourceWidth || image.height != sourceHeight) {
                    var tempCanvas = document.createElement("canvas");
                    tempCanvas.width = sourceWidth;
                    tempCanvas.height = sourceHeight;
                    tempCanvas.getContext("2d").drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
                    tempImage = tempCanvas;
                }
                var pat = this._cacheCanvasContext.createPattern(tempImage, repeat);
                texture['pattern'] = pat;
            }
            var pattern = texture['pattern'];
            this._cacheCanvasContext.fillStyle = pattern;
            this._cacheCanvasContext.translate(destX, destY);
            this._cacheCanvasContext.fillRect(0, 0, destWidth, destHeight);
            this._cacheCanvasContext.translate(-destX, -destY);
        };
        HTML5CanvasRenderer.prototype.setTransform = function (matrix) {
            //在没有旋转缩放斜切的情况下，先不进行矩阵偏移，等下次绘制的时候偏移
            if (matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1 && this._matrixA == 1 && this._matrixB == 0 && this._matrixC == 0 && this._matrixD == 1) {
                this._transformTx = matrix.tx - this._matrixTx;
                this._transformTy = matrix.ty - this._matrixTy;
                return;
            }
            this._transformTx = this._transformTy = 0;
            if (this._matrixA != matrix.a || this._matrixB != matrix.b || this._matrixC != matrix.c || this._matrixD != matrix.d || this._matrixTx != matrix.tx || this._matrixTy != matrix.ty) {
                this._cacheCanvasContext.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            }
        };
        HTML5CanvasRenderer.prototype.setAlpha = function (alpha, blendMode) {
            if (alpha != this.globalAlpha) {
                this._cacheCanvasContext.globalAlpha = this.globalAlpha = alpha;
            }
            if (blendMode) {
                this.blendValue = this.blendModes[blendMode];
                this._cacheCanvasContext.globalCompositeOperation = this.blendValue;
            }
            else if (this.blendValue != egret.BlendMode.NORMAL) {
                this.blendValue = this.blendModes[egret.BlendMode.NORMAL];
                this._cacheCanvasContext.globalCompositeOperation = this.blendValue;
            }
        };
        HTML5CanvasRenderer.prototype.initBlendMode = function () {
            this.blendModes = {};
            this.blendModes[egret.BlendMode.NORMAL] = "source-over";
            this.blendModes[egret.BlendMode.ADD] = "lighter";
        };
        HTML5CanvasRenderer.prototype.setupFont = function (textField) {
            var ctx = this._cacheCanvasContext;
            var font = textField._italic ? "italic " : "normal ";
            font += textField._bold ? "bold " : "normal ";
            font += textField._size + "px " + textField._fontFamily;
            ctx.font = font;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
        };
        HTML5CanvasRenderer.prototype.measureText = function (text) {
            var result = this._cacheCanvasContext.measureText(text);
            return result.width;
        };
        HTML5CanvasRenderer.prototype.drawText = function (textField, text, x, y, maxWidth, style) {
            var textColor;
            if (style["textColor"]) {
                textColor = egret.toColorString(parseInt(style["textColor"]));
            }
            else {
                textColor = textField._textColorString;
            }
            var strokeColor;
            if (style["strokeColor"]) {
                strokeColor = egret.toColorString(style["strokeColor"]);
            }
            else {
                strokeColor = textField._strokeColorString;
            }
            var outline;
            if (style["outline"]) {
                outline = style["outline"];
            }
            else {
                outline = textField._stroke;
            }
            var renderContext = this._cacheCanvasContext;
            renderContext.fillStyle = textColor;
            renderContext.strokeStyle = strokeColor;
            if (outline) {
                renderContext.lineWidth = outline * 2;
                renderContext.strokeText(text, x + this._transformTx, y + this._transformTy, maxWidth || 0xFFFF);
            }
            renderContext.fillText(text, x + this._transformTx, y + this._transformTy, maxWidth || 0xFFFF);
            _super.prototype.drawText.call(this, textField, text, x, y, maxWidth, style);
        };
        HTML5CanvasRenderer.prototype.strokeRect = function (x, y, w, h, color) {
            this._cacheCanvasContext.strokeStyle = color;
            this._cacheCanvasContext.strokeRect(x, y, w, h);
        };
        HTML5CanvasRenderer.prototype.pushMask = function (mask) {
            this._cacheCanvasContext.save();
            this._cacheCanvasContext.beginPath();
            this._cacheCanvasContext.rect(mask.x + this._transformTx, mask.y + this._transformTy, mask.width, mask.height);
            this._cacheCanvasContext.clip();
            this._cacheCanvasContext.closePath();
        };
        HTML5CanvasRenderer.prototype.popMask = function () {
            this._cacheCanvasContext.restore();
            this._cacheCanvasContext.setTransform(1, 0, 0, 1, 0, 0);
        };
        HTML5CanvasRenderer.prototype.onRenderStart = function () {
            this._cacheCanvasContext.save();
        };
        HTML5CanvasRenderer.prototype.onRenderFinish = function () {
            this._cacheCanvasContext.restore();
            this._cacheCanvasContext.setTransform(1, 0, 0, 1, 0, 0);
            var list = egret.RenderFilter.getInstance().getDrawAreaList();
            for (var i = 0, l = list.length; i < l; i++) {
                var area = list[i];
                this.canvasContext.drawImage(this._cacheCanvas, area.x, area.y, area.width, area.height, area.x, area.y, area.width, area.height);
            }
        };
        return HTML5CanvasRenderer;
    })(egret.RendererContext);
    egret.HTML5CanvasRenderer = HTML5CanvasRenderer;
    HTML5CanvasRenderer.prototype.__class__ = "egret.HTML5CanvasRenderer";
})(egret || (egret = {}));
var egret_h5_graphics;
(function (egret_h5_graphics) {
    function beginFill(color, alpha) {
        if (alpha === void 0) { alpha = 1; }
        var _colorBlue = color & 0x0000FF;
        var _colorGreen = (color & 0x00ff00) >> 8;
        var _colorRed = color >> 16;
        var _colorStr = "rgba(" + _colorRed + "," + _colorGreen + "," + _colorBlue + "," + alpha + ")";
        this.fillStyleColor = _colorStr;
        this.commandQueue.push(new Command(this._setStyle, this, [_colorStr]));
    }
    egret_h5_graphics.beginFill = beginFill;
    function drawRect(x, y, width, height) {
        this.commandQueue.push(new Command(function (x, y, width, height) {
            var rendererContext = this.renderContext;
            this.canvasContext.beginPath();
            this.canvasContext.rect(rendererContext._transformTx + x, rendererContext._transformTy + y, width, height);
            this.canvasContext.closePath();
        }, this, [x, y, width, height]));
        this._fill();
    }
    egret_h5_graphics.drawRect = drawRect;
    function drawCircle(x, y, r) {
        this.commandQueue.push(new Command(function (x, y, r) {
            var rendererContext = this.renderContext;
            this.canvasContext.beginPath();
            this.canvasContext.arc(rendererContext._transformTx + x, rendererContext._transformTy + y, r, 0, Math.PI * 2);
            this.canvasContext.closePath();
        }, this, [x, y, r]));
        this._fill();
    }
    egret_h5_graphics.drawCircle = drawCircle;
    function drawRoundRect(x, y, width, height, ellipseWidth, ellipseHeight) {
        //非等值椭圆角实现
        this.commandQueue.push(new Command(function (x, y, width, height, ellipseWidth, ellipseHeight) {
            var rendererContext = this.renderContext;
            var _x = rendererContext._transformTx + x; //控制X偏移
            var _y = rendererContext._transformTy + y; //控制Y偏移
            var _w = width;
            var _h = height;
            var _ew = ellipseWidth / 2;
            var _eh = ellipseHeight ? ellipseHeight / 2 : _ew;
            var right = _x + _w;
            var bottom = _y + _h;
            var ax = right;
            var ay = bottom - _eh;
            this.canvasContext.beginPath();
            this.canvasContext.moveTo(ax, ay);
            this.canvasContext.quadraticCurveTo(right, bottom, right - _ew, bottom);
            this.canvasContext.lineTo(_x + _ew, bottom);
            this.canvasContext.quadraticCurveTo(_x, bottom, _x, bottom - _eh);
            this.canvasContext.lineTo(_x, _y + _eh);
            this.canvasContext.quadraticCurveTo(_x, _y, _x + _ew, _y);
            this.canvasContext.lineTo(right - _ew, _y);
            this.canvasContext.quadraticCurveTo(right, _y, right, _y + _eh);
            this.canvasContext.lineTo(ax, ay);
            this.canvasContext.closePath();
        }, this, [x, y, width, height, ellipseWidth, ellipseHeight]));
        this._fill();
    }
    egret_h5_graphics.drawRoundRect = drawRoundRect;
    function drawEllipse(x, y, width, height) {
        //基于均匀压缩算法
        this.commandQueue.push(new Command(function (x, y, width, height) {
            var rendererContext = this.renderContext;
            this.canvasContext.save();
            var _x = rendererContext._transformTx + x; //控制X偏移
            var _y = rendererContext._transformTy + y; //控制Y偏移
            var r = (width > height) ? width : height; //选宽高较大者做为arc半径参数
            var ratioX = width / r; //横轴缩放比率
            var ratioY = height / r; //纵轴缩放比率
            this.canvasContext.scale(ratioX, ratioY); //进行缩放(均匀压缩)
            this.canvasContext.beginPath();
            this.canvasContext.moveTo((_x + width) / ratioX, _y / ratioY);
            this.canvasContext.arc(_x / ratioX, _y / ratioY, r, 0, 2 * Math.PI);
            this.canvasContext.closePath();
            this.canvasContext.restore();
            this.canvasContext.stroke();
        }, this, [x, y, width, height]));
        this._fill();
    }
    egret_h5_graphics.drawEllipse = drawEllipse;
    function lineStyle(thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
        if (thickness === void 0) { thickness = NaN; }
        if (color === void 0) { color = 0; }
        if (alpha === void 0) { alpha = 1.0; }
        if (pixelHinting === void 0) { pixelHinting = false; }
        if (scaleMode === void 0) { scaleMode = "normal"; }
        if (caps === void 0) { caps = null; }
        if (joints === void 0) { joints = null; }
        if (miterLimit === void 0) { miterLimit = 3; }
        if (this.strokeStyleColor) {
            this.createEndLineCommand();
            this.commandQueue.push(this.endLineCommand);
        }
        var _colorBlue = color & 0x0000FF;
        var _colorGreen = (color & 0x00ff00) >> 8;
        var _colorRed = color >> 16;
        var _colorStr = "rgba(" + _colorRed + "," + _colorGreen + "," + _colorBlue + "," + alpha + ")";
        this.strokeStyleColor = _colorStr;
        this.commandQueue.push(new Command(function (lineWidth, strokeStyle) {
            this.canvasContext.lineWidth = lineWidth;
            this.canvasContext.strokeStyle = strokeStyle;
            this.canvasContext.beginPath();
        }, this, [thickness, _colorStr]));
        if (typeof (this.lineX) === "undefined") {
            this.lineX = 0;
            this.lineY = 0;
        }
        this.moveTo(this.lineX, this.lineY);
    }
    egret_h5_graphics.lineStyle = lineStyle;
    function lineTo(x, y) {
        this.commandQueue.push(new Command(function (x, y) {
            var rendererContext = this.renderContext;
            var canvasContext = this.canvasContext;
            canvasContext.lineTo(rendererContext._transformTx + x, rendererContext._transformTy + y);
        }, this, [x, y]));
        this.lineX = x;
        this.lineY = y;
    }
    egret_h5_graphics.lineTo = lineTo;
    function curveTo(controlX, controlY, anchorX, anchorY) {
        this.commandQueue.push(new Command(function (x, y, ax, ay) {
            var rendererContext = this.renderContext;
            var canvasContext = this.canvasContext;
            canvasContext.quadraticCurveTo(rendererContext._transformTx + x, rendererContext._transformTy + y, rendererContext._transformTx + ax, rendererContext._transformTy + ay);
        }, this, [controlX, controlY, anchorX, anchorY]));
        this.lineX = anchorX;
        this.lineY = anchorY;
    }
    egret_h5_graphics.curveTo = curveTo;
    function moveTo(x, y) {
        this.commandQueue.push(new Command(function (x, y) {
            var rendererContext = this.renderContext;
            var canvasContext = this.canvasContext;
            canvasContext.moveTo(rendererContext._transformTx + x, rendererContext._transformTy + y);
        }, this, [x, y]));
    }
    egret_h5_graphics.moveTo = moveTo;
    function clear() {
        this.commandQueue.length = 0;
        this.lineX = 0;
        this.lineY = 0;
        this.strokeStyleColor = null;
        this.fillStyleColor = null;
    }
    egret_h5_graphics.clear = clear;
    function createEndFillCommand() {
        if (!this.endFillCommand) {
            this.endFillCommand = new Command(function () {
                this.canvasContext.fill();
                this.canvasContext.closePath();
            }, this, null);
        }
    }
    egret_h5_graphics.createEndFillCommand = createEndFillCommand;
    function endFill() {
        if (this.fillStyleColor != null) {
            this._fill();
        }
        this.fillStyleColor = null;
    }
    egret_h5_graphics.endFill = endFill;
    function _fill() {
        if (this.fillStyleColor) {
            this.createEndFillCommand();
            this.commandQueue.push(this.endFillCommand);
        }
    }
    egret_h5_graphics._fill = _fill;
    function createEndLineCommand() {
        if (!this.endLineCommand) {
            this.endLineCommand = new Command(function () {
                this.canvasContext.stroke();
                this.canvasContext.closePath();
            }, this, null);
        }
    }
    egret_h5_graphics.createEndLineCommand = createEndLineCommand;
    function _draw(renderContext) {
        var length = this.commandQueue.length;
        if (length == 0) {
            return;
        }
        this.renderContext = renderContext;
        this.canvasContext = this.renderContext._cacheCanvasContext || this.renderContext.canvasContext;
        var canvasContext = this.canvasContext;
        canvasContext.save();
        if (this.strokeStyleColor && length > 0 && this.commandQueue[length - 1] != this.endLineCommand) {
            this.createEndLineCommand();
            this.commandQueue.push(this.endLineCommand);
            length = this.commandQueue.length;
        }
        for (var i = 0; i < length; i++) {
            var command = this.commandQueue[i];
            command.method.apply(command.thisObject, command.args);
        }
        canvasContext.restore();
    }
    egret_h5_graphics._draw = _draw;
    var Command = (function () {
        function Command(method, thisObject, args) {
            this.method = method;
            this.thisObject = thisObject;
            this.args = args;
        }
        return Command;
    })();
    Command.prototype.__class__ = "Command";
    function _setStyle(colorStr) {
        this.canvasContext.fillStyle = colorStr;
        this.canvasContext.beginPath();
    }
    egret_h5_graphics._setStyle = _setStyle;
    function init() {
        for (var key in egret_h5_graphics) {
            egret.Graphics.prototype[key] = egret_h5_graphics[key];
        }
        egret.RendererContext.createRendererContext = function (canvas) {
            return new egret.HTML5CanvasRenderer(canvas);
        };
    }
    egret_h5_graphics.init = init;
})(egret_h5_graphics || (egret_h5_graphics = {}));
egret_h5_graphics.init();
