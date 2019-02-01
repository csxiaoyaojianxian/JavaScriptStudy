// mylib.js
define(['math'], function(math){
	function foo(x,y){
		return math.add(x,y);
	}
	return {
		foo : foo
	};
});