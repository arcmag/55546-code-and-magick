'use strict';

(function () {
  var setupBlock = document.querySelector('.setup');
  var setupBlockUpload = document.querySelector('.upload');

  var mouseData = {};
  setupBlockUpload.addEventListener('mousedown', function (e) {
    var dataElement = setupBlock.getBoundingClientRect();

    mouseData.x = e.clientX - dataElement.left;
    mouseData.y = e.clientY - dataElement.top;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  });

  var mouseMove = function (e) {
    setupBlock.style.left = e.clientX - mouseData.x + 'px';
    setupBlock.style.top = e.clientY - mouseData.y + 'px';
  };

  var mouseUp = function () {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };
}());
