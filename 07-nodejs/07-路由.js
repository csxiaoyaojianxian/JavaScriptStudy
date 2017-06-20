
// url.parse(string).query
//                                            |
//            url.parse(string).pathname      |
//                        |                   |
//                        |                   |
//                      ------ -------------------
// http://localhost:8888/start?foo=bar&hello=world
//                                 ---       -----
//                                  |          |
//                                  |          |
//               querystring.parse(queryString)["foo"]    |
//                                             |
//                          querystring.parse(queryString)["hello"]


var server = require("./07-server");
var router = require("./07-router");

server.start(router.route);