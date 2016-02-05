$(document).ready(function() {
  if ($('#bgvid').length === 0) {
    return;
  }

  if ($(window).width() > 1000) {
    $('#bgvid source').attr('src', '/vids/droneFootage.mp4');
  } else {
    $('#bgvid source').attr('src', '/vids/mobile.mp4');
  }

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
