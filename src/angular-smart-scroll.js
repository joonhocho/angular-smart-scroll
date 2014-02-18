/* global angular */
angular.module('jun.smartScroll', [])

.directive('smartScroll', [
	'$rootScope', '$window', '$timeout',
	function ($rootScope, $window, $timeout) {
		'use strict';
		var $ = angular.element,
			html;

		function hasScroll(el) {
			if (el.style) {
				var $el = $(el);
				return isValueScroll($el.css('overflow')) || isValueScroll($el.css('overflow-y'));
			}
			return false;
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

		function getDistance(distance, height) {
			if (!distance) {
				return 0;
			}
			if (typeof distance === 'string') {
				if (endsWith(distance, '%')) {
					return parseInt(distance, 10) / 100 * height;
				}
				return parseInt(distance, 10);
			}
			return distance;
		}

		function endsWith(str, suffix) {
			return str === suffix || str.indexOf(suffix, str.length - suffix.length) !== -1;
		}

		function getScrollHeight(el) {
			if (el === $window) {
				el = html || (html = $('html')[0]);
			}
			return el.scrollHeight;
		}

		function createOnScroll(scope, viewport) {
			return function () {
				if (scope.disabled) {
					return;
				}

				var scrollHeight = getScrollHeight(viewport[0]),
					scrollTop = viewport.scrollTop(),
					height = viewport.innerHeight(),
					scrollBottom = scrollTop + height,
					remaining = scrollHeight - scrollBottom,
					epsilon = 0.9,
					scrollThreshold = getDistance(scope.distance, height) + epsilon;

				if (remaining <= scrollThreshold) {
					scope.next({
						scrollHeight: scrollHeight,
						scrollTop: scrollTop,
						height: height,
						scrollBottom: scrollBottom,
						remaining: remaining
					});
				}
			};
		}

		function getThrottled(scope, onScroll) {
			var _ = $window._;
			if (!(_ && typeof _.throttle === 'function')) {
				return onScroll;
			}

			var options = scope.throttle,
				wait = 300;
			switch (typeof options) {
			case 'number':
				wait = options;
				break;
			case 'object':
				if (options) {
					if (options.wait != null) {
						wait = options.wait;
					}
					return _.throttle(onScroll, wait, options);
				}
			}
			return _.throttle(onScroll, wait);
		}

		return {
			scope: {
				distance: '=scrollDistance',
				disabled: '=scrollDisabled',
				throttle: '=scrollThrottle',
				next: '&scrollNext',
				data: '=scrollData'
			},
			link: function (scope, elem /*, attrs*/ ) {
				var viewport = getFirstParent(elem[0], hasScroll) || $window;
				viewport = angular.element(viewport);

				if (scope.data) {
					scope.data.viewport = viewport;
				}

				var onScroll = createOnScroll(scope, viewport),
					throttled = getThrottled(scope, onScroll);

				scope.$watch('distance', onScroll);
				scope.$watch('disabled', onScroll);

				viewport.on('scroll', throttled);

				scope.$on('$destroy', function () {
					viewport.off('scroll', throttled);
				});

				$timeout(onScroll);
			}
		};
	}
]);
