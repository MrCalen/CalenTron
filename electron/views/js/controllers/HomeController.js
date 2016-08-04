app.controller('HomeController', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
    var access_token;
    if (!(access_token = localStorage.getItem('access_token'))) {
        window.location = '#login';
        return;
    }

    $scope.access_token = access_token;
    $scope.labels = [];
    $scope.series = ['Ping'];
    $scope.data = [ [] ];

    $scope.datasetOverride = [{yAxisID: 'ping'}];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'ping',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }
            ]
        }
    };

    var ping = function () {
        $http.get(window.url + "/api/ping?token=" + $scope.access_token)
        .success(function (data) {
            $scope.labels.push("");
            $scope.data[0].push(data.ping);
        });
    };

    $scope.pingRec = function () {
        $timeout(function () {
            ping();
            $scope.pingRec();
        }, 30000);
    };

    ping();
    $scope.pingRec();


}])
;