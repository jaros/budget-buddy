// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'underscore',
  'starter.controllers',
  'starter.services'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.budget', {
    url: '/budget',
    views: {
      'tab-budget': {
        templateUrl: 'templates/tab-budget.html',
        controller: 'DashCtrl as vm',
        resolve: {
          allCategories: function (Categories) {
            return Categories.all();
          }
        }
      }
    }
  })

   .state('tab.expenses', {
    url: '/expenses',
    views: {
      'tab-expenses': {
        templateUrl: 'templates/tab-expenses.html',
        controller: 'BudgetCtrl as vm',
        resolve: {
          totalExpenses: function (Expenses) {
            return Expenses.getExpensesOverview();
          }
        }
      }
    }
  })
    .state('tab.budget-details', {
    url: '/budget-category-details/:category',
    views: {
      'tab-budget': {
        templateUrl: 'templates/tab-budget-category-details.html',
        controller: 'BudgetCategoryDetailsCtrl as vm'
      }
    }
  })

  .state('tab.transactions', {
      url: '/transactions',
      views: {
        'tab-transactions': {
          templateUrl: 'templates/tab-transactions.html',
          controller: 'TransactionsCtrl as vm'
        }
      }
    })
    .state('tab.transactions-detail', {
      url: '/transactions/:trxId',
      views: {
        'tab-transactions': {
          templateUrl: 'templates/transaction-detail.html',
          controller: 'TransactionDetailCtrl as vm'
        }
      }
    })
    .state('tab.transactions-category', {
      url: '/transactions/:trxId/category',
      views: {
        'tab-transactions': {
          templateUrl: 'templates/select-category.html',
          controller: 'CategoryCtrl as vm'
        }
      }
    })

  .state('tab.offers', {
    url: '/offers',
    views: {
      'tab-offers': {
        templateUrl: 'templates/tab-offers.html',
        controller: 'OffersCtrl as vm'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/budget');

});
