var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Control = /** @class */ (function () {
    function Control() {
    }
    return Control;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () {
    };
    return Button;
}(Control));
var TexBox = /** @class */ (function (_super) {
    __extends(TexBox, _super);
    function TexBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TexBox.prototype.select = function () {
    };
    return TexBox;
}(Control));
var ImageC = /** @class */ (function () {
    function ImageC() {
    }
    ImageC.prototype.select = function () {
    };
    return ImageC;
}());
