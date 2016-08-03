app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/login.html',
        controller: 'HomeController'
    }).when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    }).otherwise({
        redirectTo: '/login'
    });
}]);