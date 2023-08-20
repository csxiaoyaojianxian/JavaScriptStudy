// tsconfig.json 可以写注释


// noImplicitAny
function fn3(a: number, b: number) {
  return a + b;
}

// noImplicitThis
function fn4(this: Window) {
  alert(this);
}