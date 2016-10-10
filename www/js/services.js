angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
}).factory('Transactions', function() {
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
    amount: '12',
    date: '23.10.2016',
    category: 'Food'
  },{
    id: 2,
    recipient: 'SportX',
    amount: '30',
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
    id: 4,
    recipient: 'Kaufland',
    amount: '7',
    date: '30.09.2016',
    category: 'Food'
  },{
    id: 4,
    recipient: 'Kaufland',
    amount: '9',
    date: '01.10.2016',
    category: 'Food'
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
    }
  };
});
