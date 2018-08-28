var Milo = function () {

}

Milo.logout = function () {
  need("biz.login", function (LoginManager) {
    LoginManager.logout();
    location.href = '/cp/a20170728ms/Login_Sr98shV.html';
  });
}
Milo.checkLogin = function () {
  try {
    need("biz.login", function (LoginManager) {
      LoginManager.checkLogin(function () {
        $('.nickname').html(LoginManager.getUserUin());
      }, function () {
        LoginManager.login();
      });
    });
  } catch (e) {

  }

}

export default Milo;
