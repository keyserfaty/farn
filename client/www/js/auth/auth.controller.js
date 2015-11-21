angular.module('auth.controller', [])
  .controller('AuthCtrl', ['$localStorage', '$http',
  function ($localStorage, $http) {

      console.log('gets here')

      $http({
          method: 'GET',
          url: 'api/auth/facebook/token/' + token
        })
        .then(function successCallback(response) {
          console.log(token)
        })


}]);
