app.controller('LoginController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    if (localStorage.getItem('access_token') !== null) {
        $location.path("/app");
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
            data = data.data;
            if (!data.success) {
                $scope.loginError = data.message;
                return;
            }

            localStorage.setItem('access_token', data.message);
            $location.path("/app");
        })
        .catch(function (err) {
            console.log(err);
        });
    }
}]);