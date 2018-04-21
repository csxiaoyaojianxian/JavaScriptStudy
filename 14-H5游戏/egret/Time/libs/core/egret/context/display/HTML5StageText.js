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
     * @class egret.StageText
     * @classdesc
     * @extends egret.HashObject
     */
    var HTML5StageText = (function (_super) {
        __extends(HTML5StageText, _super);
        function HTML5StageText() {
            _super.call(this);
            this._hasListeners = false;
            this._inputType = "";
            this._isShow = false;
            this.textValue = "";
            this._width = 0;
            this._height = 0;
            this._styleInfoes = {};
            var scaleX = egret.StageDelegate.getInstance().getScaleX();
            var scaleY = egret.StageDelegate.getInstance().getScaleY();
            var div = egret.Browser.getInstance().$new("div");
            div.position.x = 0;
            div.position.y = 0;
            div.scale.x = scaleX;
            div.scale.y = scaleY;
            div.transforms();
            div.style[egret_dom.getTrans("transformOrigin")] = "0% 0% 0px";
            this.div = div;
            var stage = egret.MainContext.instance.stage;
            var stageWidth = stage.stageWidth;
            var stageHeight = stage.stageHeight;
            var shape = new egret.Shape();
            //            shape.graphics.beginFill(0x000000, .3);
            //            shape.graphics.drawRect(0, 0, stageWidth, stageHeight);
            //            shape.graphics.endFill();
            shape.width = stageWidth;
            shape.height = stageHeight;
            shape.touchEnabled = true;
            this._shape = shape;
            this.getStageDelegateDiv().appendChild(this.div);
        }
        HTML5StageText.prototype.getStageDelegateDiv = function () {
            var stageDelegateDiv = egret.Browser.getInstance().$("#StageDelegateDiv");
            if (!stageDelegateDiv) {
                stageDelegateDiv = egret.Browser.getInstance().$new("div");
                stageDelegateDiv.id = "StageDelegateDiv";
                //                stageDelegateDiv.style.position = "absolute";
                var container = document.getElementById(egret.StageDelegate.canvas_div_name);
                container.appendChild(stageDelegateDiv);
                stageDelegateDiv.transforms();
            }
            return stageDelegateDiv;
        };
        HTML5StageText.prototype._setMultiline = function (value) {
            _super.prototype._setMultiline.call(this, value);
            this.createInput();
        };
        HTML5StageText.prototype.callHandler = function (e) {
            e.stopPropagation();
        };
        HTML5StageText.prototype._add = function () {
            if (this.div && this.div.parentNode == null) {
                this.getStageDelegateDiv().appendChild(this.div);
            }
        };
        /**
         * @method egret.StageText#remove
         */
        HTML5StageText.prototype._remove = function () {
            if (this._shape && this._shape.parent) {
                this._shape.parent.removeChild(this._shape);
            }
            if (this.div && this.div.parentNode) {
                this.div.parentNode.removeChild(this.div);
            }
        };
        HTML5StageText.prototype._addListeners = function () {
            if (this.inputElement && !this._hasListeners) {
                this._hasListeners = true;
                this.inputElement.addEventListener("mousedown", this.callHandler);
                this.inputElement.addEventListener("touchstart", this.callHandler);
                this.inputElement.addEventListener("MSPointerDown", this.callHandler);
            }
        };
        HTML5StageText.prototype._removeListeners = function () {
            if (this.inputElement && this._hasListeners) {
                this._hasListeners = false;
                this.inputElement.removeEventListener("mousedown", this.callHandler);
                this.inputElement.removeEventListener("touchstart", this.callHandler);
                this.inputElement.removeEventListener("MSPointerDown", this.callHandler);
            }
        };
        HTML5StageText.prototype.createInput = function () {
            var type = this._multiline ? "textarea" : "input";
            if (this._inputType == type) {
                return;
            }
            this._inputType = type;
            if (this.inputElement != null) {
                this._removeListeners();
                this.div.removeChild(this.inputElement);
            }
            if (this._multiline) {
                var inputElement = document.createElement("textarea");
                inputElement.style["resize"] = "none";
            }
            else {
                inputElement = document.createElement("input");
            }
            inputElement.type = "text";
            this.inputElement = inputElement;
            this.inputElement.value = "";
            this.div.appendChild(inputElement);
            this._addListeners();
            this.setElementStyle("width", 0 + "px");
            //默认值
            this.setElementStyle("border", "none");
            this.setElementStyle("margin", "0");
            this.setElementStyle("padding", "0");
            this.setElementStyle("outline", "medium");
            this.setElementStyle("verticalAlign", "top");
            this.setElementStyle("wordBreak", "break-all");
            this.setElementStyle("overflow", "hidden");
        };
        /**
         * @method egret.StageText#open
         * @param x {number}
         * @param y {number}
         * @param width {number}
         * @param height {number}
         */
        HTML5StageText.prototype._open = function (x, y, width, height) {
            if (width === void 0) { width = 160; }
            if (height === void 0) { height = 21; }
        };
        HTML5StageText.prototype._setScale = function (x, y) {
            _super.prototype._setScale.call(this, x, y);
            var scaleX = egret.StageDelegate.getInstance().getScaleX();
            var scaleY = egret.StageDelegate.getInstance().getScaleY();
            this.div.scale.x = scaleX * x;
            this.div.scale.y = scaleY * y;
            this.div.transforms();
        };
        HTML5StageText.prototype.changePosition = function (x, y) {
            //            if (this._isShow) {
            var scaleX = egret.StageDelegate.getInstance().getScaleX();
            var scaleY = egret.StageDelegate.getInstance().getScaleY();
            this.div.position.x = x * scaleX;
            this.div.position.y = y * scaleY;
            this.div.transforms();
            //            }
        };
        HTML5StageText.prototype.setStyles = function () {
            //修改属性
            this.setElementStyle("fontStyle", this._italic ? "italic" : "normal");
            this.setElementStyle("fontWeight", this._bold ? "bold" : "normal");
            this.setElementStyle("textAlign", this._textAlign);
            this.setElementStyle("fontSize", this._size + "px");
            this.setElementStyle("color", "#000000");
            this.setElementStyle("width", this._width + "px");
            //            if (this._multiline) {
            this.setElementStyle("height", this._height + "px");
            //            }
            this.setElementStyle("border", "1px solid red");
            this.setElementStyle("display", "block");
        };
        /**
         * @method egret.StageText#add
         */
        HTML5StageText.prototype._show = function () {
            this.inputElement.setAttribute("maxlength", this._maxChars > 0 ? this._maxChars : -1);
            this._isShow = true;
            //打开
            var txt = this._getText();
            this.inputElement.value = txt;
            var self = this;
            this.inputElement.oninput = function () {
                self.textValue = self.inputElement.value;
                self.dispatchEvent(new egret.Event("updateText"));
            };
            this.setStyles();
            this.inputElement.focus();
            //            if (this._multiline) {
            this.inputElement.selectionStart = txt.length;
            this.inputElement.selectionEnd = txt.length;
            //            }
            if (this._shape && this._shape.parent == null) {
                egret.MainContext.instance.stage.addChild(this._shape);
            }
        };
        HTML5StageText.prototype._hide = function () {
            this._isShow = false;
            this.inputElement.oninput = function () {
            };
            this.setElementStyle("border", "none");
            this.setElementStyle("display", "none");
            //关闭
            this.inputElement.value = "";
            this.setElementStyle("width", 0 + "px");
            window.scrollTo(0, 0);
            var self = this;
            egret.setTimeout(function () {
                self.inputElement.blur();
                window.scrollTo(0, 0);
            }, this, 50);
            if (this._shape && this._shape.parent) {
                this._shape.parent.removeChild(this._shape);
            }
        };
        /**
         * @method egret.StageText#getText
         * @returns {string}
         */
        HTML5StageText.prototype._getText = function () {
            if (!this.textValue) {
                this.textValue = "";
            }
            return this.textValue;
        };
        /**
         * @method egret.StageText#setText
         * @param value {string}
         */
        HTML5StageText.prototype._setText = function (value) {
            this.textValue = value;
            this.resetText();
        };
        HTML5StageText.prototype.resetText = function () {
            if (this.inputElement) {
                this.inputElement.value = this.textValue;
            }
        };
        HTML5StageText.prototype._setWidth = function (value) {
            this._width = value;
        };
        HTML5StageText.prototype._setHeight = function (value) {
            this._height = value;
        };
        HTML5StageText.prototype.setElementStyle = function (style, value) {
            if (this.inputElement) {
                if (this._styleInfoes[style] != value) {
                    this.inputElement.style[style] = value;
                    this._styleInfoes[style] = value;
                }
            }
        };
        return HTML5StageText;
    })(egret.StageText);
    egret.HTML5StageText = HTML5StageText;
    HTML5StageText.prototype.__class__ = "egret.HTML5StageText";
})(egret || (egret = {}));
egret.StageText.create = function () {
    return new egret.HTML5StageText();
};
