'use strict';

window.renderStatistics = function (ctx, names, times) {
  var cloudWidth = 420;
  var cloudHeight = 270;
  var cloudX = 100;
  var cloudY = 10;

  var statWidth = 40;
  var statHeight = 150;
  var statX = cloudX;
  var statY = cloudY + 85;
  var statOffsetX = 50;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(cloudX + 10, cloudY + 10, cloudWidth, cloudHeight);
  ctx.fillStyle = '#fff';
  ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);

  ctx.font = '16px "PT Mono"';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', cloudX + 20, cloudY + 30);
  ctx.fillText('Список результатов:', cloudX + 20, cloudY + 50);

  var pxRate = Math.max.apply(null, times) / 100;
  var x = statX + 40;

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = names[i] === 'Вы' ? 'red' : 'rgb(0, 0, ' + (Math.random() * 255) + ')';

    var columnHeight = (times[i] / pxRate) * (statHeight / 100);
    ctx.fillRect(x, statY + (statHeight - columnHeight), statWidth, columnHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], x, statY + statHeight + 20);
    ctx.fillText(Math.round(times[i]), x, statY + (statHeight - columnHeight) - 10);

    x += statOffsetX + statWidth;
  }
};
