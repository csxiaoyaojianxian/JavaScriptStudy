const request   = require('request');
module.exports.get = function (url, opt = {}) {
    return new Promise((r, j) => {
        request.get(url, opt, (err, res, body) => {
            if (err) {
                j(err);
                return;
            }
            r(body);
        });
    });
};

module.exports.post = function (url, opt = {}) {
    return new Promise((r, j) => {
        request.post(url, opt, (err, res, body) => {
            if (err) {
                j(err);
                return;
            }
            r(body);
        });
    });
};