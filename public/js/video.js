$(function () {
  var vid = document.getElementById("bgvid");
  if (!vid) {
    return;
  };

  function vidFade() {
    vid.classList.add("stopfade");
  }

  vid.addEventListener('ended', function() {
    // only functional if "loop" is removed
    vid.pause();
    // to capture IE10
    vidFade();
  });
});
