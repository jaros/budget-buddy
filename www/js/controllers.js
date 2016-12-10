angular.module('starter.controllers', ['nvd3', 'chart.js'])
  .config(function () {
    Chart.defaults.global.colors = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78'];
  })

  .controller('DashCtrl', ['$scope', '$state', 'allCategories', mainController])

  .controller('TransactionsCtrl', function ($scope, $state, Transactions) {
    var vm = this;
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    $scope.$on('$ionicView.enter', function (e) {
      Transactions.all().then(function (transactions) {
        vm.transactions = transactions;
      });
    });

    vm.addCategory = function (trx) {
      $state.go('tab.transactions-category', {trxId: trx.id})
    };
  })

  .controller('BudgetCtrl', ['totalExpenses', function (budgetExpensesTotal) {
    var vm = this;

    vm.budgetOptions = {
      chart: {
        type: 'multiBarHorizontalChart',
        height: 450,
        x: function (d) {
          return d.label;
        },
        y: function (d) {
          return d.value;
        },
        showControls: false,
        showValues: true,
        duration: 500,
        xAxis: {
          showMaxMin: false
        },
        yAxis: {
          axisLabel: 'Values',
          tickFormat: function (d) {
            return d3.format(',.2f')(d);
          }
        },
        margin: {
          left: 75
        }
      }
    };

    vm.budgetData = [
      {
        "key": "Limit",
        "color": "#d62728",
        "values": budgetExpensesTotal.Limit
      },
      {
        "key": "Spent",
        "color": "#1f77b4",
        "values": budgetExpensesTotal.Spent
      }
    ];

  }])

  .controller('BudgetCategoryDetailsCtrl', function ($scope, $stateParams, Expenses) {
    var vm = this;

    vm.selectedCategory = $stateParams.category;

    vm.barOptions = {
      chart: {
        type: 'multiBarHorizontalChart',
        height: 450,
        x: function (d) {
          return d.label;
        },
        y: function (d) {
          return d.value;
        },
        showControls: false,
        showValues: true,
        duration: 500,
        xAxis: {
          showMaxMin: false
        },
        yAxis: {
          axisLabel: 'Values',
          tickFormat: function (d) {
            return d3.format(',.2f')(d);
          }
        },
        margin: {
          left: 75
        }
      }
    };

    Expenses.getExpensesOverviewForCategory(vm.selectedCategory).then(function (expensesByCategory) {
      vm.barData = [
        {
          "key": "Target",
          "color": "#d62728",
          "values": expensesByCategory.Target
        },
        {
          "key": "Spent",
          "color": "#1f77b4",
          "values": expensesByCategory.Spent
        }
      ];
    });
  })

  .controller('TransactionDetailCtrl', function ($scope, $stateParams, Transactions) {
    var vm = this;
    Transactions.get($stateParams.trxId).then(function (trans) {
      vm.trx = trans[0];
    });
  })

  .controller('CategoryCtrl', function ($scope, $stateParams, $state, Transactions, Categories) {
    var vm = this;
    Transactions.get($stateParams.trxId).then(function (trx) {
      vm.trx = trx[0];
    });

    vm.save = function (category) {
      vm.trx.category = category.name;
      Transactions.save(vm.trx);
      $state.go('tab.transactions')
    };

    Categories.allTemplate().then(function (categories) {
      vm.categories = categories;
    });
  })

  .controller('OffersCtrl', function ($scope) {
    var vm = this;
    vm.shownGroup = 1;

    vm.toggleGroup = function (group) {
      if (vm.isGroupShown(group)) {
        vm.shownGroup = null;
      } else {
        vm.shownGroup = group;
      }
    };

    vm.isGroupShown = function (group) {
      return vm.shownGroup === group;
    };

  });

function mainController($scope, $state, allCategories) {
  var vm = this;

  $scope.$on('$ionicView.enter', function (e) {

    /*var grouped = _.groupBy(Transactions.all(), function (trx) {
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
    });*/

    vm.pieData = [];
    vm.pieLabels = [];

    var lastClickedIdx = -1;

    _.each(allCategories, function (element) {
      vm.pieData.push(element.total);
      vm.pieLabels.push(element.category.name);
    });

    vm.pieClicked = function (event) {
      var chart = event[0];
      if (chart) {
        var key = chart._model.label;
        var index = chart._index;
        if (key != 'Unspent' && lastClickedIdx === index) {
          lastClickedIdx = -1;
          $state.go('tab.budget-details', {category: key});
        }
        lastClickedIdx = index;
      }
    };

    vm.pieOptions = {
      animation:{
        animateScale:true
      },
      legend: {
        display: true
      }
    }

  });
}
