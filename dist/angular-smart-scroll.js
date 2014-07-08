/*! angular-smart-scroll - v0.0.2 - 2014-07-08 */
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

    function isDirectionalScroll(remaining, lastRemaining) {
      return lastRemaining != null && remaining < lastRemaining;
    }

    function onScrollTop(opts) {
      var viewport = opts.viewport,
        remaining = viewport.scrollTop(),
        lastRemaining = opts.remainingTop;

      opts.remainingTop = remaining;

      if (!isDirectionalScroll(remaining, lastRemaining)) {
        return;
      }

      var distance = getOptionVal(opts, 'distanceTop');
      if (distance == null) {
        return opts.onScrollTop();
      }

      var viewportLength = viewport.innerHeight();
      if (remaining <= getScrollThreshold(distance, viewportLength)) {
        return opts.onScrollTop();
      }
    }

    function onScrollLeft(opts) {
      var viewport = opts.viewport,
        remaining = viewport.scrollLeft(),
        lastRemaining = opts.remainingLeft;

      opts.remainingLeft = remaining;

      if (!isDirectionalScroll(remaining, lastRemaining)) {
        return;
      }

      var distance = getOptionVal(opts, 'distanceLeft');
      if (distance == null) {
        return opts.onScrollLeft();
      }

      var viewportLength = viewport.innerWidth();
      if (remaining <= getScrollThreshold(distance, viewportLength)) {
        opts.onScrollLeft();
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
      var viewport = opts.viewport,
        scrollPos = viewport.scrollTop(),
        viewportLength = viewport.innerHeight(),
        scrollLength = getScrollHeight(viewport[0], opts),
        remaining = getRemainingBottomOrRight(scrollPos, viewportLength, scrollLength),
        lastRemaining = opts.remainingBottom;

      opts.remainingBottom = remaining;

      if (!isDirectionalScroll(remaining, lastRemaining)) {
        return;
      }

      var distance = getOptionVal(opts, 'distanceBottom');
      if (distance == null) {
        return opts.onScrollBottom();
      }

      if (remaining <= getScrollThreshold(distance, viewportLength)) {
        return opts.onScrollBottom();
      }
    }

    function onScrollRight(opts) {
      var viewport = opts.viewport,
        scrollPos = viewport.scrollLeft(),
        viewportLength = viewport.innerWidth(),
        scrollLength = getScrollWidth(viewport[0], opts),
        remaining = getRemainingBottomOrRight(scrollPos, viewportLength, scrollLength),
        lastRemaining = opts.remainingRight;

      opts.remainingRight = remaining;

      if (!isDirectionalScroll(remaining, lastRemaining)) {
        return;
      }

      var distance = getOptionVal(opts, 'distanceRight');
      if (distance == null) {
        return opts.onScrollRight();
      }

      if (remaining <= getScrollThreshold(distance, viewportLength)) {
        return opts.onScrollRight();
      }
    }

    function getOptionVal(opts, name) {
      var val = opts[name];
      if (typeof val === 'function') {
        return opts[name]();
      }
      return val;
    }

    function getOnScroll(opts) {
      return function () {
        if (getOptionVal(opts, 'disabled')) {
          return;
        }

        if (!getOptionVal(opts, 'disabledTop') && opts.onScrollTop) {
          onScrollTop(opts);
        }
        if (!getOptionVal(opts, 'disabledBottom') && opts.onScrollBottom) {
          onScrollBottom(opts);
        }
        if (!getOptionVal(opts, 'disabledLeft') && opts.onScrollLeft) {
          onScrollLeft(opts);
        }
        if (!getOptionVal(opts, 'disabledRight') && opts.onScrollRight) {
          onScrollRight(opts);
        }

        if (opts.onScroll) {
          opts.onScroll();
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

    function getOption(scope) {
      while (scope) {
        if (scope.smartScroll) {
          return scope.smartScroll;
        }
        scope = scope.$parent;
      }
    }

    return {
      link: function (scope, elem /*, attrs*/ ) {
        var opts = getOption(scope) || {},
          viewport = opts.viewport = getViewport(opts, elem),
          onScroll = getOnScroll(opts);

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
