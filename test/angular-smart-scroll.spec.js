/* jshint node: true, camelcase: false */
/* global angular: true, inject: true, describe: true, it: true, beforeEach: true, afterEach: true, spyOn: true, expect: true */
describe('Module: jun.smartScroll', function () {
	'use strict';

	beforeEach(module('jun.smartScroll'));

	describe('basic functionality', function () {
		var $rootScope,
			$compile,
			$window,
			$document,
			$timeout,
			el,
			scope;

		beforeEach(inject(function (_$rootScope_, _$compile_, _$window_, _$document_, _$timeout_) {
			$rootScope = _$rootScope_;
			$compile = _$compile_;
			$window = _$window_;
			$document = _$document_;
			$timeout = _$timeout_;

			el = angular.element('<div smart-scroll></div>');
			el.css({
				height: '1000px'
			});

			scope = $rootScope.$new();
			$compile(el)(scope);

			scope.$apply();
		}));

		afterEach(function () {
			el.remove();
		});

		it('should not fail', function () {
			expect(true).toBe(true);
			spyOn(scope, '$watch');
		});
	});
});
