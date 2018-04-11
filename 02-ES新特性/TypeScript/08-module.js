var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;
    var LettersValidator = /** @class */ (function () {
        function LettersValidator() {
        }
        LettersValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersValidator;
    }());
    Validation.LettersValidator = LettersValidator;
    var ZipCodeValidator = /** @class */ (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === 5 && numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    Validation.ZipCodeValidator = ZipCodeValidator;
})(Validation || (Validation = {}));
var Time;
(function (Time) {
    var Test = /** @class */ (function () {
        function Test(e) {
            this.element = e;
            this.element.innerHTML = "现在时间是：";
            this.span = document.createElement("span");
            this.element.appendChild(this.span);
            this.span.innerHTML = new Date().toTimeString();
        }
        Test.prototype.start = function () {
            var _this = this;
            this.timer = setInterval(function () { return _this.span.innerHTML = new Date().toTimeString(); }, 500);
        };
        Test.prototype.stop = function () {
            // clearTimeout(this.timer);
            clearInterval(this.timer);
        };
        return Test;
    }());
    Time.Test = Test;
})(Time || (Time = {}));
