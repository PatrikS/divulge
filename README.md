#divulge.js
**A lightweight plugin for lazy-triggering events when scrolling elements into view**

Based on [Luis Almeidas Unveil](http://luis-almeida.github.io/unveil/), this plugin aims to simply fire a callback when elements are scrolled into view, giving the user the choice of action, whether it be lazy loading images, fetching additional data or simply show/hide elements.

## Installation

**Bower**

`bower install jquery-divulge`

**In browser**

`<script src="path/to/jquery.divulge.js"></script>`

Be sure to include jQuery.js on your page first!

##Example (lazy load images)

`<img class="divulge img" src="placeholder-img.gif" data-replace="some-img-to-lazy-load.png"/>`
  
    $(".divulge.img").divulge({
      threshold: 200,
      callback: function(el) {
        var src = $(el).data("replace");
        el.setAttribute("src", src);
      }
    });

--

##License
Divulge is licensed under the [MIT license](http://opensource.org/licenses/MIT).
