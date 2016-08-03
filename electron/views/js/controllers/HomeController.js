app.controller('HomeController', ['$scope', function ($scope) {
    var access_token = null;
    if (!(access_token = localStorage.getItem('access_token'))) {
        window.location = '#login';
        return;
    }
}]);