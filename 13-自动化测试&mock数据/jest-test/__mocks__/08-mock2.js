export const fetchData = () => {
    return new Promise ((resolved, reject) => {
        resolved('(function(){return 123})()')
    })
}