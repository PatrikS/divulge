// Licensed under the MIT license.
// Copyright 2016 Patrik Svensson
// https://github.com/PatrikS/divulge

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

        $this.trigger("divulged");
        $this.data("divulged", true);

        if (options.callback) {
            options.callback(this);
        }
    });

    function divulge() {
        var inView = items.filter(function () {
            var $element = $(this);
            if ($element.is(":hidden")) {
              return;
            }

            var windowTop     = $window.scrollTop(),
                windowBottom  = windowTop + windowHeight,
                containerTop  = $container !== $window ? windowTop - $container.offset().top : 0,
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
            if (timer) clearTimeout(timer);
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