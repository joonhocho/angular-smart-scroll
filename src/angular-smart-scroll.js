/* global angular */
angular.module('jun.smartScroll', [])

.directive('smartScroll', [
  '$window', '$timeout',
  function ($window, $timeout) {
    'use strict';

    var $ = angular.element,
      EPSILON = 0.9;

    function hasScroll(el) {
      if (el.style) {
        var $el = $(el);
        return isScrollable($el.css('overflow')) || isScrollable($el.css('overflow-x')) || isScrollable($el.css('overflow-y'));
      }
      return false;
    }

    function isScrollable(v) {
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

    function parseDistance(distance, height) {
      if (!distance) {
        return 0;
      }
      if (typeof distance === 'number') {
        return distance;
      }
      if (distance.charAt(distance.length - 1) === '%') {
        return parseInt(distance, 10) / 100 * height;
      }
      return parseInt(distance, 10);
    }

    function getScrollThreshold(distance, viewportLength) {
      return parseDistance(distance, viewportLength) + EPSILON;
    }

    function onScrollTop(opts) {
      var distance = opts.distanceTop;
      if (distance == null) {
        return opts.scrollTop();
      }

      var viewport = opts.viewport,
        remaining = viewport.scrollTop(),
        viewportLength = viewport.innerHeight();
      if (remaining <= getScrollThreshold(distance, viewportLength)) {
        return opts.scrollTop();
      }
    }

    function onScrollLeft(opts) {
      var distance = opts.distanceLeft;
      if (distance == null) {
        return opts.scrollLeft();
      }

      var viewport = opts.viewport,
        remaining = viewport.scrollLeft(),
        viewportLength = viewport.innerWidth();
      if (remaining <= getScrollThreshold(distance, viewportLength)) {
        opts.scrollLeft();
      }
    }

    function getRemainingBottomOrRight(scrollPos, viewportLength, scrollLength) {
      return scrollLength - (scrollPos + viewportLength);
    }

    function getHtml(opts) {
      return opts.html || (opts.html = $('html')[0]);
    }

    function getBody(opts) {
      return opts.body || (opts.body = $('body')[0]);
    }

    function getScrollWidth(el, opts) {
      if (el === $window) {
        return getHtml(opts).scrollWidth || getBody(opts).scrollWidth;
      }
      return el.scrollWidth;
    }

    function getScrollHeight(el, opts) {
      if (el === $window) {
        return getHtml(opts).scrollHeight || getBody(opts).scrollHeight;
      }
      return el.scrollHeight;
    }

    function onScrollBottom(opts) {
      var distance = opts.distanceBottom;
      if (distance == null) {
        return opts.scrollBottom();
      }

      var viewport = opts.viewport,
        scrollPos = viewport.scrollTop(),
        viewportLength = viewport.innerHeight(),
        scrollLength = getScrollHeight(viewport[0], opts),
        remaining = getRemainingBottomOrRight(scrollPos, viewportLength, scrollLength);
      if (remaining <= getScrollThreshold(distance, viewportLength)) {
        return opts.scrollBottom();
      }
    }

    function onScrollRight(opts) {
      var distance = opts.distanceRight;
      if (distance == null) {
        return opts.scrollRight();
      }

      var viewport = opts.viewport,
        scrollPos = viewport.scrollLeft(),
        viewportLength = viewport.innerWidth(),
        scrollLength = getScrollWidth(viewport[0], opts),
        remaining = getRemainingBottomOrRight(scrollPos, viewportLength, scrollLength);
      if (remaining <= getScrollThreshold(distance, viewportLength)) {
        return opts.scrollRight();
      }
    }

    function getOnScroll(scope) {
      return function () {
        var opts = scope.scrollOptions;
        if (opts.disabled) {
          return;
        }

        if (!opts.disabledTop && opts.scrollTop) {
          onScrollTop(opts);
        }
        if (!opts.disabledBottom && opts.scrollBottom) {
          onScrollBottom(opts);
        }
        if (!opts.disabledLeft && opts.scrollLeft) {
          onScrollLeft(opts);
        }
        if (!opts.disabledRight && opts.scrollRight) {
          onScrollRight(opts);
        }
        if (opts.scroll) {
          opts.scroll();
        }
      };
    }

    function getViewport(opts, elem) {
      var viewport = opts.viewport || getFirstParent(elem[0], hasScroll) || $window;
      if (typeof viewport.on !== 'function') {
        viewport = $(viewport);
      }
      return viewport;
    }

    return {
      link: function (scope, elem /*, attrs*/ ) {
        var opts = scope.scrollOptions || {};
        var viewport = opts.viewport = getViewport(opts, elem);
        var onScroll = getOnScroll(scope);

        viewport.on('scroll', onScroll);
        viewport.on('resize', onScroll);

        scope.$on('$destroy', function () {
          viewport.off('scroll', onScroll);
          viewport.off('resize', onScroll);
        });

        $timeout(onScroll);
      }
    };
  }
]);
