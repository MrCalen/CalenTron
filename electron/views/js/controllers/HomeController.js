app.controller('HomeController', ['$scope', function ($scope) {
    if (!localStorage.getItem('access_token')) {
        window.location = '#login';
        return;
    }
}]);