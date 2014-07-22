'use strict';

/**
 * @ngdoc directive
 * @name billShareApp.directive:inputAddNew
 * @description
 * # inputAddNew
 */
angular.module('billShareApp')
  .directive('inputAddNew', function () {
    return {
      templateUrl: 'views/templates/input-add-new.html',

      scope: {
        addFn: '&',
        parentObject: '=',
        size: '@'
      },

      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var input = jQuery(element).find("div > input");

        var attrProperties = JSON.parse(angular.toJson(attrs));
        angular.forEach(attrProperties, function(value, key) {
          if (attrs.hasOwnProperty(key)) {
            input.attr(key, value);
          }
        });

        input.first().on('focusout', function() {
          var thisElement = this;
          scope.$apply(function() {
            if (typeof(scope.addFn) === "function") {
              var value = scope.inputValue;
              scope.inputValue = null;
              if (value) {
                scope.addFn({value: value, parentObject: scope.parentObject});
                thisElement.focus();
              }
            }
          });
        });

        element.on('$destroy', function() {
          //todo clean up jQuery event here
        });
      }
    };
  });
