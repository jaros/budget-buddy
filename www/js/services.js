angular.module('starter.services', [])

.factory('Categories', function($http) {
  return {
    all: function() {
      return $http.get('/api/categories').then(function (resp) {
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

.factory('Transactions', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var trxs = [{
    id: 0,
    recipient: 'Cheapair',
    amount: '22',
    date: '23.10.2016',
    category: 'Travel'
  },{
    id: 1,
    recipient: 'LIDL',
    amount: '102',
    date: '23.10.2016',
    category: 'Food'
  },{
    id: 2,
    recipient: 'SportX',
    amount: '50',
    date: '21.10.2016',
    category: 'Leisure'
  },{
    id: 3,
    recipient: 'Bauhof',
    amount: '25',
    date: '23.08.2016',
    category: 'Utility'
  },{
    id: 4,
    recipient: 'Cheapair',
    amount: '5',
    date: '02.10.2016',
    category: 'Travel'
  },{
    id: 5,
    recipient: 'Kaufland',
    amount: '7.75',
    date: '30.09.2016',
    category: 'Food'
  },{
    id: 6,
    recipient: 'Kaufland',
    amount: '59',
    date: '01.10.2016',
    category: 'Food'
  },{
    id: 7,
    recipient: '-',
    amount: '30',
    date: '-',
    category: 'Unspent'
  }];

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
    //  http://bwjmgpmevk.localtunnel.me
    all: function() {
      return $http.get('/api/transactions').then(transactionMapper, function (error) {
        console.log(error);
      });
    },
    remove: function(trx) {
      trxs.splice(trxs.indexOf(trx), 1);
    },
    get: function(trxId) {
      return $http.get('/api/transactions/'+trxId).then(transactionMapper);
    },
    save: function (trx) {
      $http.put('/api/transactions', null, {
        params: {
          'transactionId': trx.id,
          'category': trx.category
        }
      })
    }
  };
});
