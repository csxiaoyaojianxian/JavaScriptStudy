function isFunction(val) {
    return toString.call(val) === '[object Function]';
}
//
// function extend<T, U> (to: T & U, from: U, context?: object): T & U {
//   for (const key in from) {
//     const val = from[key] as any
//     if (context && isFunction(val)) {
//       to[key] = val.bind(context)
//     } else {
//       to[key] = from[key] as any
//     }
//   }
//   return to
// }
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
