/*! angular-smart-scroll - v0.0.5 - 2014-07-21 */
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

      var prev = !! opts.atTop,
        atTop = opts.atTop = !remaining;
      if (prev !== atTop && opts.onAtTop) {
        opts.onAtTop(atTop);
      }

      if (opts.onScrollTop && isDirectionalScroll(remaining, lastRemaining)) {
        var distance = getOptionVal(opts, 'distanceTop');
        if (distance == null || remaining <= getScrollThreshold(distance, viewport.innerHeight())) {
          opts.onScrollTop();
        }
      }
    }

    function onScrollLeft(opts) {
      var viewport = opts.viewport,
        remaining = viewport.scrollLeft(),
        lastRemaining = opts.remainingLeft;

      opts.remainingLeft = remaining;

      var prev = !! opts.atLeft,
        atLeft = opts.atLeft = !remaining;
      if (prev !== atLeft && opts.onAtLeft) {
        opts.onAtLeft(atLeft);
      }

      if (opts.onScrollLeft && isDirectionalScroll(remaining, lastRemaining)) {
        var distance = getOptionVal(opts, 'distanceLeft');
        if (distance == null || remaining <= getScrollThreshold(distance, viewport.innerWidth())) {
          opts.onScrollLeft();
        }
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

    function getScrollBottomStats(opts) {
      opts = opts || this;
      var viewport = opts.viewport,
        scrollPos = viewport.scrollTop(),
        viewportLength = viewport.innerHeight(),
        scrollLength = getScrollHeight(viewport[0], opts),
        remaining = getRemainingBottomOrRight(scrollPos, viewportLength, scrollLength);
      return {
        scrollPos: scrollPos,
        viewportLength: viewportLength,
        scrollLength: scrollLength,
        remaining: remaining
      };
    }

    function onScrollBottom(opts) {
      var stats = getScrollBottomStats(opts),
        remaining = stats.remaining,
        lastRemaining = opts.remainingBottom;

      opts.remainingBottom = remaining;

      var prev = !! opts.atBottom,
        atBottom = opts.atBottom = !remaining;
      if (prev !== atBottom && opts.onAtBottom) {
        opts.onAtBottom(atBottom);
      }

      if (opts.onScrollBottom && isDirectionalScroll(remaining, lastRemaining)) {
        var distance = getOptionVal(opts, 'distanceBottom');
        if (distance == null || remaining <= getScrollThreshold(distance, stats.viewportLength)) {
          opts.onScrollBottom();
        }
      }
    }

    function getScrollRightStats(opts) {
      opts = opts || this;
      var viewport = opts.viewport,
        scrollPos = viewport.scrollLeft(),
        viewportLength = viewport.innerWidth(),
        scrollLength = getScrollWidth(viewport[0], opts),
        remaining = getRemainingBottomOrRight(scrollPos, viewportLength, scrollLength);
      return {
        scrollPos: scrollPos,
        viewportLength: viewportLength,
        scrollLength: scrollLength,
        remaining: remaining
      };
    }

    function onScrollRight(opts) {
      var stats = getScrollRightStats(opts),
        remaining = stats.remaining,
        lastRemaining = opts.remainingRight;

      opts.remainingRight = remaining;

      var prev = !! opts.atRight,
        atRight = opts.atRight = !remaining;
      if (prev !== atRight && opts.onAtRight) {
        opts.onAtRight(atRight);
      }

      if (opts.onScrollRight && isDirectionalScroll(remaining, lastRemaining)) {
        var distance = getOptionVal(opts, 'distanceRight');
        if (distance == null || remaining <= getScrollThreshold(distance, stats.viewportLength)) {
          opts.onScrollRight();
        }
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

        if (!getOptionVal(opts, 'disabledTop')) {
          onScrollTop(opts);
        }
        if (!getOptionVal(opts, 'disabledBottom') && opts.onScrollBottom) {
          onScrollBottom(opts);
        }
        if (!getOptionVal(opts, 'disabledLeft')) {
          onScrollLeft(opts);
        }
        if (!getOptionVal(opts, 'disabledRight')) {
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

        opts.getScrollRightStats = getScrollRightStats;
        opts.getScrollBottomStats = getScrollBottomStats;

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
