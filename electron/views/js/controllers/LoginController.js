app.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
    if (localStorage.getItem('access_token') !== null) {
        window.location = '/';
        return;
    }
    $scope.api_url = window.url;

    $scope.postLogin = function () {
        var login = $scope.login;
        var password = $scope.password;

        $http.post($scope.api_url + "/login", {
            login: login,
            password: password
        })
        .then(function (data) {
            // FIXME: get access token here.
        });
    }
}]);