'use strict';

var cloudWidth = 420;
var cloudHeight = 270;
var cloudX = 100;
var cloudY = 10;

var statWidth = 40;
var statHeight = 150;
var statX = cloudX;
var statY = cloudY + 85;
var statOffsetX = 50;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudWidth, cloudHeight);
}

function createStatRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function getRandomBlueColor() {
  return 'rgb(0, 0, ' + (Math.random() * 255) + ')';
}

function getMaxNumber(array) {
  var max = array[0];

  for (var i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }

  return max;
}

function printStatText(ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloudX + 10, cloudY + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, cloudX, cloudY, '#fff');

  ctx.font = '16px "PT Mono"';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', cloudX + 20, cloudY + 30);
  ctx.fillText('Список результатов:', cloudX + 20, cloudY + 50);

  var pxRate = getMaxNumber(times) / 100;
  var x = statX + 40;

  for (var i = 0; i < names.length; i++) {
    var columnColor = names[i] === 'Вы' ? 'red' : getRandomBlueColor();
    var columnHeight = (times[i] / pxRate) * (statHeight / 100);
    createStatRect(ctx, x, statY + (statHeight - columnHeight), statWidth, columnHeight, columnColor);

    printStatText(ctx, names[i], x, statY + statHeight + 20, columnColor);
    printStatText(ctx, Math.round(times[i]), x, statY + (statHeight - columnHeight) - 10, columnColor);

    x += statOffsetX + statWidth;
  }
};
