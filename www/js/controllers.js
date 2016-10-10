angular.module('starter.controllers', ['nvd3'])

  .controller('DashCtrl', ['$scope', 'Transactions', mainController])

  .controller('TransactionsCtrl', function ($scope, Transactions) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.transactions = Transactions.all();
    $scope.remove = function (trx) {
      Transactions.remove(trx);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Transactions) {
    $scope.chat = Transactions.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });

function mainController($scope, Transactions) {
  var vm = this;

  $scope.$on('$ionicView.enter', function(e) {
    vm.data = Transactions.all().map(function (trx) {
      return {
        key: trx.category,
        y: parseInt(trx.amount)
      };
    });
  });

  vm.options = {
    chart: {
      type: 'pieChart',
      height: 500,
      // donut: true,
      x: function (d) {
        return d.key;
      },
      y: function (d) {
        return d.y;
      },
      showLabels: true,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      legend: {
        margin: {
          top: 5,
          right: 35,
          bottom: 5,
          left: 0
        }
      }
    }
  };

  /*vm.data = [
   {
   key: "One",
   y: 5
   },
   {
   key: "Two",
   y: 2
   },
   {
   key: "Three",
   y: 9
   },
   {
   key: "Four",
   y: 7
   },
   {
   key: "Five",
   y: 4
   },
   {
   key: "Six",
   y: 3
   },
   {
   key: "Seven",
   y: .5
   }
   ];*/
}
