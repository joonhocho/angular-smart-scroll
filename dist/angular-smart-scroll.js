/*! angular-smart-scroll - v0.0.1 - 2014-02-13 */
/* global angular */
angular.module('jun.smartScroll', [])

.directive('smartScroll', [
	'$rootScope', '$window', '$timeout',
	function ($rootScope, $window, $timeout) {
		'use strict';
		var $ = angular.element;

		function hasScroll(el) {
			return isValueScroll($.css(el, 'overflow')) || isValueScroll($.css(el, 'overflow-y'));
		}

		function isValueScroll(v) {
			return v === 'scroll' || v === 'auto';
		}

		function getFirstParent(el, fn) {
			while (el) {
				if (fn(el)) {
					return el;
				}
				el = el.parentNode;
			}
			return null;
		}

		return {
			link: function (scope, elem, attrs) {
				var viewport = getFirstParent(elem[0], hasScroll) || $window;
				viewport = angular.element(viewport);

				var scrollDistance = 0;
				if (attrs.infiniteScrollDistance) {
					scope.$watch(attrs.infiniteScrollDistance, function (value) {
						scrollDistance = parseInt(value, 10);
					});
				}

				var enabled = true,
					checkWhenEnabled = false,
					handler;
				if (attrs.infiniteScrollDisabled) {
					scope.$watch(attrs.infiniteScrollDisabled, function (value) {
						enabled = !value;
						if (enabled && checkWhenEnabled) {
							checkWhenEnabled = false;
							handler();
						}
					});
				}

				handler = function () {
					var scrollHeight = viewport[0].scrollHeight,
						viewportHeight = viewport.height(),
						scrollBottom = viewport.scrollTop() + viewportHeight,
						remaining = scrollHeight - scrollBottom,
						epsilon = 0.9,
						scrollThreshold = viewportHeight * scrollDistance + epsilon;

					if (remaining <= scrollThreshold) {
						if (enabled) {
							if ($rootScope.$$phase) {
								scope.$eval(attrs.infiniteScroll);
							}
							else {
								scope.$apply(attrs.infiniteScroll);
							}
						}
						else {
							checkWhenEnabled = true;
						}
					}
				};

				var throttled = handler,
					throttleWait = 300,
					_ = $window._;
				if (_ && typeof _.throttle === 'function') {
					throttled = _.throttle(handler, throttleWait);
				}

				viewport.on('scroll', throttled);

				scope.$on('$destroy', function () {
					viewport.off('scroll', throttled);
				});

				$timeout(function () {
					var check = attrs.infiniteScrollImmediateCheck;
					if (!check || (check && scope.$eval(check))) {
						handler();
					}
				}, 0);
			}
		};
	}
]);
