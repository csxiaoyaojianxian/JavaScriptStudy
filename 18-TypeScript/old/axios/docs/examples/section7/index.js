function broken(name) {
    function postfix(epithet) {
        return name.charAt(0) + '.  the ' + epithet; // error, 'name' 可能为 null
    }
    name = name || 'Bob';
    return postfix('great');
}
function fixed(name) {
    function postfix(epithet) {
        return name.charAt(0) + '.  the ' + epithet; // ok
    }
    name = name || 'Bob';
    return postfix('great');
}
broken(null);
