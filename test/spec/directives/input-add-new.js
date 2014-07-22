'use strict';

describe('Directive: inputAddNew', function () {

  // load the directive's module
  beforeEach(module('billShareApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<input-add-new></input-add-new>');
    element = $compile(element)(scope);
//    expect(element.text()).toBe('');
  }));
});
