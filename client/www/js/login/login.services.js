'use strict';

angular.module('login.services', [])
  .factory('loginService', ['$localStorage', '$window', '$rootScope',
  function ($localStorage, $window, $rootScope) {

      var url = 'http://localhost:3000/api/auth/facebook';
      var loginWindow, token, hasToken, facebookID, hasFacebookID;

      return {
        login: function () {
          $rootScope.loginWindow = $window.open(url, '_blank');

          // loginWindow.$on('loadstart', function (e) {
          //   console.log('gets here')

          // })

          $rootScope.loginWindow.addEventListener('loadstart', function (event) {
            hasToken = event.url.indexOf('/oauth_token=');
            hasFacebookID = event.url.indexOf('&facebookID=');

            if (hasToken > -1 && hasFacebookID > -1) {
              token = event.url.match('/oauth_token=(.*)&facebookID=')[1];
              facebookID = event.url.match('&facebookID=(.*)')[1];
              // the big deal
              $rootScope.token = token;
              console.log($rootScope.token)

              console.log(token, facebookID);
              loginWindow.close();
              location.href = location.pathname;
            }
          });
        }
      };
}]);
