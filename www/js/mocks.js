var myAppDev = angular.module('myAppDev', ['starter', 'ngMockE2E']);
myAppDev.run(function ($httpBackend) {

  var categories = [[{
    "_id": {"category": null},
    "currencies": [{"currency": "EUR", "total": 1725544.6399999997, "count": 741}]
  }, {
    "_id": {
      "category": {
        "_id": {"$oid": "57fcd69224c24071fdbc24a8"},
        "name": "Telekom",
        "budget": 150.0,
        "expression": "telekom|telefonica"
      }
    }, "currencies": [{"currency": "EUR", "total": 10900.279999999993, "count": 57}]
  }, {
    "_id": {
      "category": {
        "_id": {"$oid": "57fcd6c224c24071fdbc24aa"},
        "name": "Healthcare",
        "budget": 250.0,
        "expression": "krankenkasse"
      }
    }, "currencies": [{"currency": "EUR", "total": 118159.84, "count": 22}]
  }, {
    "_id": {
      "category": {
        "_id": {"$oid": "57fcd6ab24c24071fdbc24a9"},
        "name": "Fuel",
        "budget": 400.0,
        "expression": "aral"
      }
    }, "currencies": [{"currency": "EUR", "total": 9756.0, "count": 5}]
  }]];

// returns the current list of categories
  $httpBackend.whenGET('/api/categories').respond(categories);


  var transactions = [{
    "_id": {"$oid": "57fc974724c24071fdbc20bf"},
    "transactionId": "0",
    "bankCode": "figo demobank",
    "bankName": "90090099",
    "bookingText": "Girokonto Sparen",
    "valueDate": {"$date": "2015-02-27T00:00:00.000Z"},
    "amount": 25.0,
    "currency": "EUR",
    "partnerName": "Girokonto",
    "category": "Travel"
  }, {
    "_id": {"$oid": "57fc974724c24071fdbc20c0"},
    "transactionId": "1",
    "bankCode": "figo demobank",
    "bankName": "90090099",
    "bookingText": "Girokonto Sparen",
    "valueDate": {"$date": "2015-02-28T00:00:00.000Z"},
    "amount": 200.0,
    "currency": "EUR",
    "partnerName": "Girokonto",
    "category": "Utility"
  }, {
    "_id": {"$oid": "57fc974724c24071fdbc20c1"},
    "transactionId": "2",
    "bankCode": "figo demobank",
    "bankName": "90090099",
    "bookingText": "Girokonto Sparen",
    "valueDate": {"$date": "2015-03-29T00:00:00.000Z"},
    "amount": 150.0,
    "currency": "EUR",
    "partnerName": "Girokonto",
    "category": "Hobby"
  }, {
    "_id": {"$oid": "57fc974724c24071fdbc20c2"},
    "transactionId": "3",
    "bankCode": "figo demobank",
    "bankName": "90090099",
    "bookingText": "Girokonto Sparen",
    "valueDate": {"$date": "2015-04-30T00:00:00.000Z"},
    "amount": 200.0,
    "currency": "EUR",
    "partnerName": "Girokonto",
    "category": null
  }, {
    "_id": {"$oid": "57fc974724c24071fdbc20c3"},
    "transactionId": "4",
    "bankCode": "figo demobank",
    "bankName": "90090099",
    "bookingText": "Girokonto Sparen",
    "valueDate": {"$date": "2015-05-31T00:00:00.000Z"},
    "amount": 200.0,
    "currency": "EUR",
    "partnerName": "Girokonto",
    "category": "Rental"
  }, {
    "_id": {"$oid": "57fc974724c24071fdbc20c4"},
    "transactionId": "5",
    "bankCode": "figo demobank",
    "bankName": "90090099",
    "bookingText": "Girokonto Sparen",
    "valueDate": {"$date": "2015-06-01T00:00:00.000Z"},
    "amount": 200.0,
    "currency": "EUR",
    "partnerName": "Girokonto",
    "category": null
  }, {
    "_id": {"$oid": "57fc974724c24071fdbc20c5"},
    "transactionId": "6",
    "bankCode": "figo demobank",
    "bankName": "90090099",
    "bookingText": "Girokonto Sparen",
    "valueDate": {"$date": "2015-07-02T00:00:00.000Z"},
    "amount": 300.0,
    "currency": "EUR",
    "partnerName": "Girokonto",
    "category": "Education"
  }, {
    "_id": {"$oid": "57fc974724c24071fdbc20c6"},
    "transactionId": "7",
    "bankCode": "figo demobank",
    "bankName": "90090099",
    "bookingText": "Girokonto Sparen",
    "valueDate": {"$date": "2015-08-03T00:00:00.000Z"},
    "amount": 200.0,
    "currency": "EUR",
    "partnerName": "Girokonto",
    "category": null
  }, {
    "_id": {"$oid": "57fc974724c24071fdbc20c7"},
    "transactionId": "8",
    "bankCode": "figo demobank",
    "bankName": "90090099",
    "bookingText": "Girokonto Sparen",
    "valueDate": {"$date": "2015-09-04T00:00:00.000Z"},
    "amount": 200.0,
    "currency": "EUR",
    "partnerName": "Girokonto",
    "category": null
  }, {
    "_id": {"$oid": "57fc974724c24071fdbc20c8"},
    "transactionId": "9",
    "bankCode": "figo demobank",
    "bankName": "90090099",
    "bookingText": "Girokonto Sparen",
    "valueDate": {"$date": "2015-10-05T00:00:00.000Z"},
    "amount": 200.0,
    "currency": "EUR",
    "partnerName": "Girokonto",
    "category": null
  }, {
    "_id": {"$oid": "57fc974724c24071fdbc20c9"},
    "transactionId": "10",
    "bankCode": "figo demobank",
    "bankName": "90090099",
    "bookingText": "Girokonto Sparen",
    "valueDate": {"$date": "2015-11-06T00:00:00.000Z"},
    "amount": 200.0,
    "currency": "EUR",
    "partnerName": "Girokonto",
    "category": null
  }];

  $httpBackend.whenGET('/api/transactions').respond(transactions);

  $httpBackend.whenGET(/\/api\/transactions\/\d+/).respond(function (method, url, data) {
    var transactionId = url.split('/')[3];
    return [200, {'data': transactions[transactionId]}, {}];
  });

  $httpBackend.whenPUT(/^\/api\/transactions(?:\?(.*))?$/).respond(function (method, url, data, headers, params) {
    var transactionId = params.transactionId;
    transactions[transactionId].category = params.category;
    return [200];
  });

// adds a new phone to the phones array
  $httpBackend.whenPOST('/api/categories').respond(function (method, url, data) {
    var phone = angular.fromJson(data);
    categories.push(phone);
    return [200, phone, {}];
  });

  $httpBackend.whenGET('/api/expenses/total').respond({
    "Limit": [
      {
        "label": "Food",
        "value": 100
      },
      {
        "label": "Leisure",
        "value": 150
      },
      {
        "label": "Travel",
        "value": 195.70
      },
      {
        "label": "Utility",
        "value": 181.74
      }
    ],
    "Spent": [
      {
        "label": "Food",
        "value": 50
      },
      {
        "label": "Leisure",
        "value": 97.5
      },
      {
        "label": "Travel",
        "value": 185
      },
      {
        "label": "Utility",
        "value": 170
      }
    ]
  });

  $httpBackend.whenGET(/templates/).passThrough(); // Requests for templates are handled by the real server
//...

});
