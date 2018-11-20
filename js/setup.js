'use strict';

document.querySelector('.setup').classList.remove('hidden');

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

function getRandomWizardElement(element) {
  return {
    'coat-color': COAT_COLOR_LIST[Math.round(Math.random() * (COAT_COLOR_LIST.length - 1))],
    'eyes-color': EYES_COLOR_LIST[Math.round(Math.random() * (EYES_COLOR_LIST.length - 1))],
    'name': NAME_LIST[Math.round(Math.random() * (NAME_LIST.length - 1))] + ' ' +
      SUB_NAME_LIST[Math.round(Math.random() * (SUB_NAME_LIST.length - 1))]
  }[element];
}

function createWizardTemplateList(wizardList) {
  var wizardTemplateContainer = document.createDocumentFragment();
  var tmp = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  for (var i = 0; i < wizardList.length; i++) {
    var copyTmp = tmp.cloneNode(true);

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
      name: getRandomWizardElement('name'),
      coatColor: getRandomWizardElement('coat-color'),
      eyesColor: getRandomWizardElement('eyes-color')
    });
  }

  return wizardList;
}

document.querySelector('.setup-similar-list').appendChild(createWizardTemplateList(createWizardList()));
document.querySelector('.setup-similar').classList.remove('hidden');
