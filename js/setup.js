'use strict';

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

var NAME_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SUB_NAME_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLOR_LIST = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLOR_LIST = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

function getRandomArrayElement(array) {
  return array[Math.round(Math.random() * (array.length - 1))];
}

function createWizardTemplateList(wizardList) {
  var wizardTemplateContainer = document.createDocumentFragment();
  var tmp = document.querySelector('#similar-wizard-template');
  var wizardItemTmp = tmp.content.querySelector('.setup-similar-item');

  for (var i = 0; i < wizardList.length; i++) {
    var copyTmp = wizardItemTmp.cloneNode(true);

    copyTmp.querySelector('.setup-similar-label').textContent = wizardList[i].name;
    copyTmp.querySelector('.wizard-coat').style.fill = wizardList[i].coatColor;
    copyTmp.querySelector('.wizard-eyes').style.fill = wizardList[i].eyesColor;

    wizardTemplateContainer.appendChild(copyTmp);
  }

  return wizardTemplateContainer;
}

function createWizardList() {
  var wizardList = [];

  for (var i = 0; i < 4; i++) {
    wizardList[i] = ({
      name: getRandomArrayElement(NAME_LIST) + ' ' + getRandomArrayElement(SUB_NAME_LIST),
      coatColor: getRandomArrayElement(COAT_COLOR_LIST),
      eyesColor: getRandomArrayElement(EYES_COLOR_LIST)
    });
  }

  return wizardList;
}

var setupSimilarList = document.querySelector('.setup-similar-list');
setupSimilarList.appendChild(createWizardTemplateList(createWizardList()));

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');
