var add = function (x, y) {
    return x + y;
}

var sub = function (x, y) {
    return x - y;
}

var mul = function (x, y) {
    return x * y;
}

var div = function (x, y) {
    if (y != 0)
        return x / y;
    else
        return Infinity
}

var pow = function (x, y) {
    return Math.pow(x, y);
}

module.exports = { add, sub, mul, div, pow };