/* jshint node: true, camelcase: false */
/* global angular, inject, jasmine, describe, it, beforeEach, afterEach, expect, runs, waitsFor */
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

	var SCROLL_WIDTH = 15,
		MAX_SCROLL = Math.pow(2, 20);

	beforeEach(inject(function (_$rootScope_, _$compile_, _$window_, _$document_, _$timeout_) {
		$rootScope = _$rootScope_;
		$compile = _$compile_;
		$window = _$window_;
		$document = _$document_;
		$body = angular.element('body');
		$timeout = _$timeout_;
	}));

	afterEach(function () {
		el.remove();
		scope.$destroy();
		el = content = scope = null;
	});

	function init(html, initScope) {
		el = angular.element(html).appendTo($body);
		content = el.find('.content');
		scope = $rootScope.$new();

		initScope(scope);

		$compile(el)(scope);

		// IMPORTANT: $digest fires scroll events
		//scope.$digest();
	}

	describe('Immediate "next" call:', function () {

		it('call "next" on init if necessary', function () {
			init(
				'<div class="scroller" smart-scroll' +
				' scroll-next="getNext(scrollHeight, scrollTop, height, scrollBottom, remaining)"' +
				' scroll-distance="scrollDistance"' +
				' scroll-disabled="scrollDisabled"' +
				'>' +
				'<div class="content"></div>' +
				'</div>',
				function (scope) {
					scope.getNext = jasmine.createSpy();
					scope.scrollDistance = 0;
					scope.scrollDisabled = false;
				}
			);

			expect(scope.getNext).not.toHaveBeenCalled();

			$timeout.flush();
			expect(scope.getNext).toHaveBeenCalled();
		});

		it('do not call "next" on init if not necessary', function () {
			init(
				'<div class="scroller" smart-scroll' +
				' scroll-next="getNext(scrollHeight, scrollTop, height, scrollBottom, remaining)"' +
				' scroll-distance="scrollDistance"' +
				' scroll-disabled="scrollDisabled"' +
				'>' +
				'<div class="large-content"></div>' +
				'</div>',
				function (scope) {
					scope.getNext = jasmine.createSpy();
					scope.scrollDistance = 0;
					scope.scrollDisabled = false;
				}
			);

			expect(scope.getNext).not.toHaveBeenCalled();

			$timeout.flush();
			expect(scope.getNext).not.toHaveBeenCalled();
		});
	});

	describe('"next" call:', function () {

		it('call "next" on scroll only if past threshold', function () {
			init(
				'<div class="scroller" smart-scroll' +
				' scroll-next="getNext(scrollHeight, scrollTop, height, scrollBottom, remaining)"' +
				' scroll-distance="scrollDistance"' +
				' scroll-disabled="scrollDisabled"' +
				' scroll-throttle="scrollThrottle"' +
				'>' +
				'<div class="large-content"></div>' +
				'</div>',
				function (scope) {
					scope.getNext = jasmine.createSpy();
					scope.scrollDistance = 0;
					scope.scrollDisabled = false;
				}
			);

			expect(scope.getNext).not.toHaveBeenCalled();

			$timeout.flush();
			expect(scope.getNext).not.toHaveBeenCalled();

			var scrolled = false;
			el.scroll(function () {
				scrolled = true;
			});

			el.scrollTop(5000);

			waitsFor(function () {
				return scrolled;
			}, 'should be scrolled', 500);

			runs(function () {
				expect(scope.getNext).not.toHaveBeenCalled();

				scrolled = false;
				el.scrollTop(MAX_SCROLL);

				waitsFor(function () {
					return scrolled;
				}, 'should be scrolled', 500);

				runs(function () {
					expect(scope.getNext).toHaveBeenCalled();

					scope.getNext = jasmine.createSpy();

					scrolled = false;
					var max = el.scrollTop();
					el.scrollTop(max - SCROLL_WIDTH - 1);

					waitsFor(function () {
						return scrolled;
					}, 'should be scrolled', 500);

					runs(function () {
						expect(scope.getNext).not.toHaveBeenCalled();

						scrolled = false;
						el.scrollTop(max - SCROLL_WIDTH);

						waitsFor(function () {
							return scrolled;
						}, 'should be scrolled', 500);

						runs(function () {
							expect(scope.getNext).toHaveBeenCalled();
						});
					});
				});
			});
		});
	});

	describe('Window scroll:', function () {

		it('call "next" on scroll only if past threshold', function () {
			init(
				'<div smart-scroll' +
				' scroll-next="getNext(scrollHeight, scrollTop, height, scrollBottom, remaining)"' +
				' scroll-distance="scrollDistance"' +
				' scroll-disabled="scrollDisabled"' +
				'>' +
				'<div class="content"></div>' +
				'</div>',
				function (scope) {
					scope.getNext = jasmine.createSpy();
					scope.scrollDistance = 0;
					scope.scrollDisabled = false;
				}
			);

			expect(scope.getNext).not.toHaveBeenCalled();

			$timeout.flush();
			expect(scope.getNext).toHaveBeenCalled();
		});

		it('do not call "next" on init if not necessary', function () {
			init(
				'<div smart-scroll' +
				' scroll-next="getNext(scrollHeight, scrollTop, height, scrollBottom, remaining)"' +
				' scroll-distance="scrollDistance"' +
				' scroll-disabled="scrollDisabled"' +
				'>' +
				'<div class="large-content"></div>' +
				'</div>',
				function (scope) {
					scope.getNext = jasmine.createSpy();
					scope.scrollDistance = 0;
					scope.scrollDisabled = false;
				}
			);

			expect(scope.getNext).not.toHaveBeenCalled();

			$timeout.flush();
			expect(scope.getNext).not.toHaveBeenCalled();
		});
	});

	describe('Disabled:', function () {

		it('should not call "next" when disabled', function () {
			init(
				'<div class="scroller" smart-scroll' +
				' scroll-next="getNext(scrollHeight, scrollTop, height, scrollBottom, remaining)"' +
				' scroll-distance="scrollDistance"' +
				' scroll-disabled="scrollDisabled"' +
				'>' +
				'<div class="content"></div>' +
				'</div>',
				function (scope) {
					scope.getNext = jasmine.createSpy();
					scope.scrollDistance = 0;
					scope.scrollDisabled = true;
				}
			);

			expect(scope.getNext).not.toHaveBeenCalled();

			$timeout.flush();
			expect(scope.getNext).not.toHaveBeenCalled();
		});
	});
});
