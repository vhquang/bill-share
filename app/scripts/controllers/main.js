'use strict';

/**
 * @ngdoc function
 * @name billShareApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the billShareApp
 */
angular.module('billShareApp')
  .controller('MainCtrl', function ($scope) {
    var key = "billShareApp-party";
    $scope.party = JSON.parse( sessionStorage.getItem(key) ) || [];

    function addPerson(name) {
      if (name) {
        var person = {
          name: name,
          order: [],
          cost: 0
        };
        $scope.party.push(person);
      }
    }

    function deletePerson(index) {
      $scope.party.splice(index, 1);
    }

    function addItem(person, price) {
      price = parseFloat(price);
      if ( !isNaN(price) ) {
        person.order.push(price);
      }
    }

    function deleteItem(person, itemIndex) {
      var price = person.order.splice(itemIndex, 1);
      console.log(price);
    }

    function updateItem(person, itemIndex, newValue) {
      person.order[itemIndex] = newValue;
    }

    function toggleDetail($event) {
      jQuery('.collapse.in').collapse('hide');
      jQuery('.more').css('display', 'block');
      $scope.isCollapse = true;
      var element = $event.target;
      var panel = jQuery(element).parents('.panel');
      var eCollapse = panel.children('.collapse:not(.in)');
      if (eCollapse.length > 0) {
        panel.children('.more').css('display', 'none');
      }
      eCollapse.collapse('show');
    }

    function calculateTax (cost) {
      var tax = ($scope.tax || 0.0) / 100;
      return (cost * tax);
    }

    function calculateTip (cost) {
      var tip = ($scope.tip || 0.0) / 100;
      return (cost * tip);
    }

    function getTotal(cost) {
      var includeTax = cost + calculateTax(cost);
      var includeTip = includeTax + calculateTip(includeTax);
      return includeTip;
    }

    function getBillTotal() {
      var total = 0;
      for (var i = 0, person; person = $scope.party[i]; i++) { //jshint ignore:line
        var cost = 0;
        for (var j = 0, item; item = person.order[j]; j++) { //jshint ignore:line
          cost += item;
        }
        total += cost;
      }
      return getTotal(total);
    }

    $scope.$watch("party", function(newValue) {
      if (newValue) {
        for (var i = 0, person; person = newValue[i]; i++) { //jshint ignore:line
          var cost = 0;
          for (var j = 0, item; item = person.order[j]; j++) { //jshint ignore:line
            cost += item;
          }
          person.cost = cost;
        }
        sessionStorage.setItem(key, angular.toJson(newValue));
      }
    }, true);

    function validatePositiveNumber(input) {
      var ret = parseFloat(input);
      if (isNaN(ret) || ret < 0) {
        return null;
      }
      return ret;
    }

    $scope.$watch('tax', function(v) {
      $scope.tax = validatePositiveNumber(v);
    });
    $scope.$watch('tip', function(v) {
      $scope.tip = validatePositiveNumber(v);
    });


    angular.extend($scope, {
      addPerson: addPerson,
      deletePerson: deletePerson,
      addItem: addItem,
      updateItem: updateItem,
      deleteItem: deleteItem,
      toggleDetail: toggleDetail,
      calculateTax: calculateTax,
      calculateTip: calculateTip,
      getTotal: getTotal,
      getBillTotal: getBillTotal,
      tax: 9.25,
      tip: 15
    });
  });
