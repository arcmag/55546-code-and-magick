'use strict';

(function () {
  var setupBlock = document.querySelector('.setup');
  var setupBlockUpload = document.querySelector('.upload');

  var mouseData = false;
  setupBlockUpload.addEventListener('mousedown', function (e) {
    var dataElement = setupBlock.getBoundingClientRect();

    mouseData = {
      x: e.clientX - dataElement.left,
      y: e.clientY - dataElement.top
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  });

  var mouseMove = function (e) {
    if (!mouseData) {
      return;
    }

    setupBlock.style.left = (e.clientX - mouseData.x) + 'px';
    setupBlock.style.top = (e.clientY - mouseData.y) + 'px';
  };
  var mouseUp = function () {
    mouseData = false;

    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };
}());
