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
            if (data.ping >= 150) {
                new Notification("Ping too High", {
                    body: "Actual ping " + data.ping
                });
            }
            if ($scope.labels.length > 20) {
                $scope.labels.shift();
                $scope.data[0].shift();
            }
            $scope.labels.push("");
            $scope.data[0].push(data.ping);
        });
    };

    $scope.pingRec = function () {
        $timeout(function () {
            ping();
            $scope.pingRec();
        }, 20000);
    };

    ping();
    $scope.pingRec();


}])
;