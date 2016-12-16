app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    }).when('/app', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
    })
    .otherwise({
        redirectTo: '/login'
    });
}]);