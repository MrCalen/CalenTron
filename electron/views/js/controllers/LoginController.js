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
        .success(function (data) {
            if (!data.success) {
                $scope.loginError = data.message;
                return;
            }

            localStorage.setItem('access_token', data.message);
            window.location = '/';
        });
    }
}]);