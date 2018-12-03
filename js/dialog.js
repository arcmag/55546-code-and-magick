'use strict';

(function () {
  var setupBlock = window.main.setupBlock;
  var setupBlockUpload = document.querySelector('.upload');

  var dragged = false;
  var mouseData = {};
  setupBlockUpload.addEventListener('mousedown', function (e) {
    var dataElement = setupBlock.getBoundingClientRect();

    dragged = false;

    mouseData.x = e.clientX - dataElement.left;
    mouseData.y = e.clientY - dataElement.top;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  });

  var mouseMove = function (e) {
    dragged = true;

    setupBlock.style.left = (e.clientX - mouseData.x + (setupBlock.offsetWidth / 2)) + 'px';
    setupBlock.style.top = e.clientY - mouseData.y + 'px';
  };

  var mouseUp = function (e) {
    e.preventDefault();
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        setupBlockUpload.removeEventListener('click', onClickPreventDefault);
      };
      setupBlockUpload.addEventListener('click', onClickPreventDefault);
    }
  };
}());
