app.controller('HomeController', ['$scope', function ($scope) {
    var access_token;
    if (!(access_token = localStorage.getItem('access_token'))) {
        window.location = '#login';
        return;
    }
    $scope.access_token = access_token;

}]);