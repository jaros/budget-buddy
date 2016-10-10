angular.module('starter.controllers', ['nvd3'])

  .controller('DashCtrl', ['$scope', '$state', 'Transactions', mainController])

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

  .controller('BudgetCategoryDetailsCtrl', function ($scope, $stateParams, Transactions) {
    var vm = this;

    vm.selectedCategory = $stateParams.category;
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

  .controller('OffersCtrl', function ($scope) {
    var vm = this;
    vm.shownGroup = 1;

    vm.toggleGroup = function(group) {
      if (vm.isGroupShown(group)) {
        vm.shownGroup = null;
      } else {
        vm.shownGroup = group;
      }
    };

    vm.isGroupShown = function(group) {
      return vm.shownGroup === group;
    };

  });

function mainController($scope, $state, Transactions) {
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

    vm.pieData = [];
    _.each(sumAmount, function (element, index, list) {
      vm.pieData.push({
        key: index,
        y: element.amount ? parseFloat(element.amount) : element
      });
    });

  });

  vm.pieOptions = {
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
      pie: {
        dispatch: {
          elementClick: function(t) {
            console.log("one click: " + t.data.key);
          },
          elementDblClick: function (t) {
            console.log("db click: " + t.data.key);
            $state.go('tab.budget-details', {category: t.data.key});
          }
        }
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

  vm.barOptions = {
    chart: {
      type: 'multiBarHorizontalChart',
      height: 450,
      x: function(d){return d.label;},
      y: function(d){return d.value;},
      showControls: false,
      showValues: true,
      duration: 500,
      xAxis: {
        showMaxMin: false
      },
      yAxis: {
        axisLabel: 'Values',
        tickFormat: function(d){
          return d3.format(',.2f')(d);
        }
      }
    }
  };

  vm.barData = [
    {
      "key": "Target",
      "color": "#d62728",
      "values": [
        {
          "label" : "Mediamarket",
          "value" : 100
        } ,
        {
          "label" : "Penny" ,
          "value" : 150
        } ,
        {
          "label" : "Lidl" ,
          "value" : 195.70
        } ,
        {
          "label" : "Edeka" ,
          "value" : 181.74
        } ,
        {
          "label" : "Kaufland" ,
          "value" : 172.009071426284
        }
      ]
    },
    {
      "key": "Spent",
      "color": "#1f77b4",
      "values": [
        {
          "label" : "Mediamarket" ,
          "value" : 50
        } ,
        {
          "label" : "Penny" ,
          "value" : 97.5
        } ,
        {
          "label" : "Lidl" ,
          "value" : 185
        } ,
        {
          "label" : "Edeka" ,
          "value" : 170
        },
        {
          "label" : "Kaufland" ,
          "value" : 49.9
        }
      ]
    }
  ];
}
