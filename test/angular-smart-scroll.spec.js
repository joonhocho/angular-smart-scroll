/* jshint node: true, camelcase: false */
/* global angular, inject, describe, it, beforeEach, afterEach, spyOn, expect */
describe('Module: jun.smartScroll', function () {
	'use strict';

	beforeEach(module('jun.smartScroll'));

	var $rootScope,
		$compile,
		$window,
		$document,
		$body,
		$timeout,
		el,
		content,
		scope;

	beforeEach(inject(function (_$rootScope_, _$compile_, _$window_, _$document_, _$timeout_) {
		$rootScope = _$rootScope_;
		$compile = _$compile_;
		$window = _$window_;
		$document = _$document_;
		$body = angular.element('body');
		$timeout = _$timeout_;
	}));

	describe('Immediate next call', function () {

		var getHtml = function () {
			return '<div class="scroller" smart-scroll' +
				' scroll-next="getNext(scrollHeight, scrollTop, height, scrollBottom, remaining)"' +
				' scroll-distance="scrollDistance"' +
				' scroll-disabled="scrollDisabled"' +
				'>' +
				'<div class="content"></div>' +
				'</div>';
		};

		var initScope = function () {
			scope.getNext = function () {};
			scope.scrollDistance = 0;
			scope.scrollDisabled = false;
		};

		function prepare() {
			el = angular.element(getHtml()).appendTo($body);
			content = el.find('.content');

			scope = $rootScope.$new();
			initScope();

			$compile(el)(scope);
			scope.$digest();
		}

		afterEach(function () {
			el.remove();
		});

		it('should call `next` callback on init if necessary', function () {
			getHtml = function () {
				return '<div class="scroller" smart-scroll' +
					' scroll-next="getNext(scrollHeight, scrollTop, height, scrollBottom, remaining)"' +
					' scroll-distance="scrollDistance"' +
					' scroll-disabled="scrollDisabled"' +
					'>' +
					'<div class="content"></div>' +
					'</div>';
			};
			prepare();
			spyOn(scope, 'getNext').andCallThrough();
			expect(scope.getNext).not.toHaveBeenCalled();
			$timeout.flush();
			expect(scope.getNext).toHaveBeenCalled();
		});

		it('should not call `next` callback on init if unnecessary', function () {
			getHtml = function () {
				return '<div class="scroller" smart-scroll' +
					' scroll-next="getNext(scrollHeight, scrollTop, height, scrollBottom, remaining)"' +
					' scroll-distance="scrollDistance"' +
					' scroll-disabled="scrollDisabled"' +
					'>' +
					'<div class="large-content"></div>' +
					'</div>';
			};
			prepare();
			spyOn(scope, 'getNext').andCallThrough();
			expect(scope.getNext).not.toHaveBeenCalled();
			$timeout.flush();
			expect(scope.getNext).not.toHaveBeenCalled();
		});
	});
});
