'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_CLOUD_OFFSET = 10;

var STAT_WIDTH = 40;
var STAT_HEIGHT = 150;
var STAT_X = CLOUD_X;
var STAT_Y = CLOUD_Y + 85;
var STAT_OFFSET_X = 50;

var TEXT_TIME_OFFSET_Y = 10;
var TEXT_NAME_OFFSET_Y = 20;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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
  renderCloud(ctx, CLOUD_X + SHADOW_CLOUD_OFFSET, CLOUD_Y + SHADOW_CLOUD_OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var startStatX = STAT_X + STAT_WIDTH;
  var textResultOffsetY = 30;

  ctx.font = '16px "PT Mono"';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', startStatX, CLOUD_Y + textResultOffsetY);
  textResultOffsetY += 20;
  ctx.fillText('Список результатов:', startStatX, CLOUD_Y + textResultOffsetY);

  var pxRate = getMaxNumber(times) / 100;

  for (var i = 0; i < names.length; i++) {
    var columnColor = names[i] === 'Вы' ? 'red' : getRandomBlueColor();
    var columnHeight = (times[i] / pxRate) * (STAT_HEIGHT / 100);
    createStatRect(ctx, startStatX, STAT_Y + (STAT_HEIGHT - columnHeight), STAT_WIDTH, columnHeight, columnColor);

    printStatText(ctx, names[i], startStatX, STAT_Y + STAT_HEIGHT + TEXT_NAME_OFFSET_Y, columnColor);
    printStatText(ctx, Math.round(times[i]), startStatX, STAT_Y + (STAT_HEIGHT - columnHeight) - TEXT_TIME_OFFSET_Y, columnColor);

    startStatX += STAT_OFFSET_X + STAT_WIDTH;
  }
};
