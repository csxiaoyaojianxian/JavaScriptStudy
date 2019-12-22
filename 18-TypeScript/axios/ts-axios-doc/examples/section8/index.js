var UIElement = /** @class */ (function () {
    function UIElement() {
    }
    UIElement.prototype.animate = function (dx, dy, easing) {
        if (easing === 'ease-in') {
            // ...
        }
        else if (easing === 'ease-out') {
        }
        else if (easing === 'ease-in-out') {
        }
        else {
        }
    };
    return UIElement;
}());
var button = new UIElement();
button.animate(0, 0, 'ease-in');
button.animate(0, 0, null);
