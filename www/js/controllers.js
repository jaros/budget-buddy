angular.module('starter.controllers', ['nvd3'])

  .controller('DashCtrl', ['$scope', 'Transactions', mainController])

  .controller('TransactionsCtrl', function ($scope, $state, Transactions) {
    var vm = this;
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    $scope.$on('$ionicView.enter', function(e) {
      vm.transactions = Transactions.all();
      // vm.transactions = [];
    });

    vm.addCategory = function (trx) {
      $state.go('tab.transactions-category', {trxId: trx.id})
    };
  })

  .controller('TransactionDetailCtrl', function ($scope, $stateParams, Transactions) {
    var vm = this;
    vm.trx = Transactions.get($stateParams.trxId);
  })

  .controller('CategoryCtrl', function ($scope, $stateParams, $state, Transactions) {
    var vm = this;
    vm.trx = Transactions.get($stateParams.trxId);

    vm.save = function(category) {
      vm.trx.category = category.name;
      Transactions.save(vm.trx);
      $state.go('tab.transactions')
    };

    vm.categories = [
      {
        name: 'Travel'
      },
      {
        name: 'Food'
      },{
        name: 'Leisure'
      },{
        name: 'Utility'
      },{
        name: 'Rental'
      },{
        name: 'Family'
      },{
        name: 'Hobby'
      },{
        name: 'Education'
      }
    ];
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });

function mainController($scope, Transactions) {
  var vm = this;

  $scope.$on('$ionicView.enter', function (e) {

    var grouped = _.groupBy(Transactions.all(), function (trx) {
      return trx.category;
    });

    var sumAmount = _.mapObject(grouped, function (trxs, categoryName) {
      return _.reduce(trxs, function (memo, trx) {
        if (memo.amount) {
          return parseFloat(memo.amount) + parseFloat(trx.amount);
        } else {
          return parseFloat(memo) + parseFloat(trx.amount);
        }
      });
    });

    vm.data = [];
    _.each(sumAmount, function (element, index, list) {
      vm.data.push({
        key: index,
        y: element.amount ? parseFloat(element.amount) : element
      });
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
}
