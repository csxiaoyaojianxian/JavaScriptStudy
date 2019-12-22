var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        if (this.greeting) {
            return 'Hello, ' + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    };
    Greeter.standardGreeting = 'Hello, there';
    return Greeter;
}());
var greeter;
greeter = new Greeter();
console.log(greeter.greet());
var greeterMaker = Greeter;
greeterMaker.standardGreeting = 'Hey there';
var greeter2 = new greeterMaker();
console.log(greeter2.greet());
