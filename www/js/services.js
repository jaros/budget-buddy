angular.module('starter.services', [])
  .constant('serviceApiUrl', '')
  // .constant('serviceApiUrl','http://wcciqphwza.localtunnel.me')

.factory('Categories', function($http, serviceApiUrl) {
  return {
    all: function() {
      return $http.get(serviceApiUrl + '/api/categories').then(function (resp) {
        var ruleCategories = _.filter(resp.data[0], function (cat) {
            return typeof cat._id.category != "string";
        });

        var res = _.map(ruleCategories, function(elem) {
          return {
            id: elem._id.category == null ? 'undefined' : elem._id.category._id.$oid,
            category: {
              name: elem._id.category == null ? 'Unclassified' : elem._id.category.name,
              budget: elem._id.category == null ? null : elem._id.category.budget
            },
            currency: elem.currencies[0] ? elem.currencies[0].currency : null, // assume that 1st element is always EUR
            total: elem.currencies[0] ? elem.currencies[0].total : null,
            count: elem.currencies[0] ? elem.currencies[0].count : null
          }
        });
        return res;
      }, function (error) {
        console.log(error);
      });
    }
  }
})

.factory('Transactions', function($http, serviceApiUrl) {

  var transactionMapper = function (resp) {
    var res = _.map(resp.data, function(elem) {
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
    all: function() {
      return $http.get(serviceApiUrl + '/api/transactions').then(transactionMapper, function (error) {
        console.log(error);
      });
    },
    get: function(trxId) {
      return $http.get(serviceApiUrl + '/api/transactions/'+trxId).then(transactionMapper);
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
});
