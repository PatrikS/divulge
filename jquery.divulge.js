/*!
 * jQuery Divulge v0.9.1
 * https://github.com/PatrikS/divulge
 * Copyright 2016 Patrik Svensson
 * Licensed under the MIT license
 */

; (function ($) {

  $.fn.divulge = function (options) {

    var $window = $(window),
        defaults = {
            container: $window,
            threshold: 0,
            debounce: 0,
            callback: undefined
        };

    if(typeof options === "function"){
        defaults.callback = options;
        options = null;
    }

    options = $.extend({}, defaults, options);
    
    var $container = options.container,
        windowHeight = $window.height(),
        items = this,
        loaded;

    this.one("divulge", function () {
        var $this = $(this);

        if ($this.data("divulged")) {
            return;
        }

        if (options.callback) {
            options.callback(this);
        }

        $this.trigger("divulged");
        $this.data("divulged", true);
    });

    function divulge() {
        var inView = items.filter(function () {
            var $element = $(this);
            if ($element.is(":hidden")) {
              return;
            }

            var windowTop     = $window.scrollTop(),
                windowBottom  = windowTop + windowHeight,
                containerTop  = $container === $window ? 0 : windowTop - $container.offset().top,
                elementTop    = $element.offset().top + containerTop,
                elementBottom = elementTop + $element.height();

            return elementBottom >= windowTop - options.threshold && elementTop <= windowBottom + options.threshold;
        });

        loaded = inView.trigger("divulge");
        items = items.not(loaded);
    }

    function resize() {
        windowHeight = $window.height();
        divulge();
    }

    function debounce(fn) {
        var timer;
        return function () {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(fn, options.debounce || 0);
        };
    }

    $container.on({
        "resize.divulge": debounce(resize),
        "scroll.divulge": debounce(divulge),
        "lookup.divulge": divulge
    });

    divulge();

    return this;
  };

})(window.jQuery);