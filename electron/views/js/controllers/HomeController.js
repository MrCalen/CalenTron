app.controller('HomeController', [
  '$scope', '$timeout', '$http', '$location', '$rootScope',
  function ($scope, $timeout, $http, $location, $rootScope) {
    var access_token;
    if (!(access_token = localStorage.getItem('access_token'))) {
      $location.path("/");
      return;
    }

    $scope.access_token = access_token;
    $scope.labels = [];
    $scope.series = ['Ping'];
    $scope.data = [[]];

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
      .then(function (data) {
        data = data.data;
        if (data.ping >= 50) {
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
      }).catch(function (err) {
        debugger;
        if (err.status === 403) {
          localStorage.removeItem('access_token');
          $window.location.reload();
          $scope.$apply();
        }
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
