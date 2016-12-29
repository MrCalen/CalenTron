app.directive('tasksWidget', function () {
    return {
        restrict: 'E',
        templateUrl: "taskWidget.html",
        controller: function ($scope, $http, $timeout) {
            $scope.size = 'small';

            var access_token = localStorage.getItem('access_token');

            $scope.refresh = function () {
                $scope.loading = true;
                $http.get(window.url + "/api/tasks?token=" + access_token)
                .then(function (response) {
                    $scope.tasks = response.data;
                    $scope.loading = false;
                })
                .catch(function (err) {
                    $scope.loading = false;
                });
            };

            $scope.refreshData = function () {
                $timeout(function () {
                    $scope.refresh();
                    $scope.refreshData();
                }, 5000);
            };

            $scope.refresh();
            $scope.refreshData();

            $scope.updateTask = function (task) {
                $http.post(window.url + "/api/task/" + task.id
                    + "/" + (task.solved ? 'solve' : 'unsolve')
                    + '?token=' + $scope.access_token)
                    .then(function (data) {
                        $scope.refresh();
                    })
                    .catch(function (err) {
                        $scope.refresh();
                    });
            };

            $scope.createTask = function (name) {
                $http.post(
                    window.url + '/api/tasks/new' + '?token=' + $scope.access_token, {
                        name: name
                    }
                )
                .then(function (data) {
                    $scope.refresh();
                })
                .catch(function (err) {
                    $scope.refresh();
                })
            };

            $scope.removeTask = function (task) {
                $http.post(window.url + "/api/task/" + task.id
                    + "/delete"
                    + '?token=' + $scope.access_token)
                    .then(function (data) {
                        $scope.refresh();
                    }).catch(function (err) {
                        $scope.refresh();
                    });;
            }
        }
    };
});