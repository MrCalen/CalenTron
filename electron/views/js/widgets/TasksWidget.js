app.directive('tasksWidget', function () {
    return {
        restrict: 'E',
        templateUrl: "taskWidget.html",
        controller: function ($scope, $http, $timeout) {
            $scope.size = 'small';

            var access_token = localStorage.getItem('access_token');

            $scope.loading = true;
            $scope.refresh = function () {
                $http.get(window.url + "/api/tasks?token=" + access_token)
                .then(function (response) {
                    $scope.tasks = response.data;
                    $scope.loading = false;
                });
            };

            function refreshData() {
                $timeout(function () {
                    refresh();
                    refreshData();
                }, 2000);
            }
            $scope.refresh();

            $scope.updateTask = function (task) {
                $http.post(window.url + "/api/task/" + task.id
                    + "/" + (task.solved ? 'solve' : 'unsolve')
                    + '?token=' + $scope.access_token)
                    .success(function (data) {
                        $scope.refresh();
                    });
            };

            $scope.createTask = function (name) {
                $http.post(
                    window.url + '/api/tasks/new' + '?token=' + $scope.access_token, {
                        name: name
                    }
                )
                .success(function (data) {
                    $scope.refresh();
                })
            };

            $scope.removeTask = function (task) {
                $http.post(window.url + "/api/task/" + task.id
                    + "/delete"
                    + '?token=' + $scope.access_token)
                    .success(function (data) {
                        $scope.refresh();
                    });
            }
        }
    };
});