angular.module('starter.services', [])

.factory('Categories', function($http) {
  return {
    all: function() {
      return $http.get('/categories').then(function (resp) {
        var res = _.map(resp.data[0], function(elem) {
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

.factory('Transactions', function() {
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

  return {
    all: function() {
      return trxs;
    },
    remove: function(trx) {
      trxs.splice(trxs.indexOf(trx), 1);
    },
    get: function(trxId) {
      for (var i = 0; i < trxs.length; i++) {
        if (trxs[i].id === parseInt(trxId)) {
          return trxs[i];
        }
      }
      return null;
    },
    save: function (trx) {
      for (var i = 0; i < trxs.length; i++) {
        if (trxs[i].id == trx.id) {
          trxs[i] = trx;
          return;
        }
      }
    }
  };
});
