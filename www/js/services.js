angular.module('starter.services', [])
  .constant('serviceApiUrl', '')
  // .constant('serviceApiUrl','http://napurttuuv.localtunnel.me')

  .factory('Categories', function ($http, serviceApiUrl) {
    return {
      all: function () {
        return $http.get(serviceApiUrl + '/api/categories').then(function (resp) {
          var ruleCategories = _.filter(resp.data[0], function (cat) {
            return typeof cat._id.category != "string";
          });

          var res = _.map(ruleCategories, function (elem) {
            var currency = elem.currencies[0];
            var isCategory = elem._id.category == null;
            var categoryName = isCategory ? 'Food' : elem._id.category.name;
            var categoryBudget = isCategory ? null : elem._id.category.budget;
            var totalAmount = currency ? currency.total : null;
            if (totalAmount != null && categoryName == 'Food') {
              totalAmount /= 40;
            }
            return {
              id: isCategory ? 'undefined' : elem._id.category._id.$oid,
              category: {
                name: categoryName,
                budget: categoryBudget
              },
              currency: currency ? currency.currency : null, // assume that 1st element is always EUR
              total: totalAmount,
              count: currency ? currency.count : null
            }
          });
          return res;
        }, function (error) {
          console.log(error);
        });
      },

      allTemplate: function () {
        return $http.get(serviceApiUrl + '/api/template-categories').then(function (resp) {
          return resp.data;
        }, function (error) {
          console.log(error);
        })
      }
    }
  })

  .factory('Transactions', function ($http, serviceApiUrl) {

    var transactionMapper = function (resp) {
      var res = _.map(resp.data, function (elem) {
        return {
          id: elem.transactionId,
          recipient: elem.partnerName,
          amount: elem.amount,
          date: elem.valueDate.$date,
          category: elem.category,
          bookingText: elem.bookingText,
          bankName: elem.bankName,
          bankCode: elem.bankCode
        }
      });
      return res;
    };

    return {
      all: function () {
        return $http.get(serviceApiUrl + '/api/transactions').then(transactionMapper, function (error) {
          console.log(error);
        });
      },
      get: function (trxId) {
        return $http.get(serviceApiUrl + '/api/transactions/' + trxId).then(transactionMapper);
      },
      save: function (trx) {
        $http.put(serviceApiUrl + '/api/transactions', null, {
          params: {
            'transactionId': trx.id,
            'category': trx.category
          }
        })
      }
    };
  })
  .factory('Expenses', function ($http, serviceApiUrl) {
    return {
      getExpensesOverview: function () {
        return $http.get(serviceApiUrl + '/api/expenses/total').then(function (resp) {
          return resp.data;
        }, function (error) {
          console.log(error);
        });
      },
      getExpensesOverviewForCategory: function (category) {
        return $http.get(serviceApiUrl + '/api/expenses/overview', {params: {category: category}}).then(function (resp) {
          return resp.data;
        }, function (error) {
          console.log(error);
        })
      }
    };
  })
;
