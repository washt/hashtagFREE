$(window).load(function() {
	"use strict";
	recolor();
    redraw();
    return false;
	
});

var t = new Trianglify({
    x_gradient: colorbrewer.RdGy[9],
    y_gradient: colorbrewer.RdGy[9],
    noiseIntensity: 0.1,
    cellpadding: 10,
    cellsize: 90
    });

var prevheight = height();

window.onresize = function() {
    redraw();
};

function heightChange() {
    if (height() != prevheight) {
        console.log("height changed from "+prevheight+" to "+height());
        prevheight = height();
        redraw();
    };
}

redraw();

function redraw() {
    console.log("drawing "+document.body.clientWidth+"x"+height())
    var pattern = t.generate(document.body.clientWidth, height());
    document.body.setAttribute('style', 'background-image: '+pattern.dataUrl);
};

function recolor() {
    t.options.x_gradient = colorbrewer.RdGy[9];
    t.options.y_gradient = colorbrewer.RdGy[9];
}

function noise(i) {
    i += t.options.noiseIntensity;
    if (i >= 0 && i <= 1) {
        t.options.noiseIntensity = i;
        redraw();
    } else if (i < 0) {
        t.options.noiseIntensity = 0;
        redraw();
    }
}

function cellsize(i) {
    i += t.options.cellsize;
    if (i >= 0) {
        t.options.cellsize = i;
        t.options.bleed = i;
        if (t.options.cellpadding >= t.options.cellsize/2) {
            t.options.cellpadding = 5*Math.floor((t.options.cellsize/2 - 1)/5);
        }
        redraw();
    }
}

function cellpadding(i) {
    i += t.options.cellpadding;
    if (i >= 0  && i < t.options.cellsize/2) {
        t.options.cellpadding = i;
        redraw();
    }
}

function height() {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
}

function toggleClass(el, className) {
    if (el.classList) {
      return el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
      return existingIndex >= 0;
    }
}         