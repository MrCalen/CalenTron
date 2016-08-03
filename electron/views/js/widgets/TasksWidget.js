app.directive('tasksWidget', function () {
    return {
        restrict: 'E',
        templateUrl: "taskWidget.html",
        controller: function ($scope, $http, $timeout) {
            var access_token = localStorage.getItem('access_token');

            $scope.refresh = function () {
                $http.get(window.url + "/api/tasks?token=" + access_token)
                .then(function () {
                    console.log("coucou les potes");
                });
            };

            $scope.refresh();
        }
    };
});