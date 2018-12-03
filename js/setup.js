'use strict';

(function () {
  var setupBlock = window.main.setupBlock;
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupClose = document.querySelector('.setup-close');
  var userNameField = document.querySelector('.setup-user-name');

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var NAME_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SUB_NAME_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

  var FIREBALL_COLOR_LIST = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];

  function setColorWizardEyes() {
    wizardEyes.style.fill = getRandomArrayElement(EYES_COLOR_LIST);
  }

  function setColorWizardCoat() {
    wizardCoat.style.fill = getRandomArrayElement(COAT_COLOR_LIST);
  }

  function setColorWizardFireball() {
    wizardFireball.style.background = getRandomArrayElement(FIREBALL_COLOR_LIST);
  }

  function keydownCloseSetupBlock(e) {
    if (e.keyCode === ESC_KEYCODE && document.activeElement !== userNameField) {
      closeSetupBlock();
    }
  }

  function openSetupBlock() {
    setupBlock.classList.remove('hidden');
    wizardEyes.addEventListener('click', setColorWizardEyes);
    wizardCoat.addEventListener('click', setColorWizardCoat);
    wizardFireball.addEventListener('click', setColorWizardFireball);
    document.addEventListener('keydown', keydownCloseSetupBlock);

    setupBlock.style.left = '';
    setupBlock.style.top = '';
  }

  function closeSetupBlock() {
    setupBlock.classList.add('hidden');
    wizardEyes.removeEventListener('click', setColorWizardEyes);
    wizardCoat.removeEventListener('click', setColorWizardCoat);
    wizardFireball.removeEventListener('click', setColorWizardFireball);
    document.removeEventListener('keydown', keydownCloseSetupBlock);
  }

  setupOpenIcon.addEventListener('click', function () {
    openSetupBlock();
  });

  setupClose.addEventListener('click', function () {
    closeSetupBlock();
  });

  setupOpenIcon.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      openSetupBlock();
    }
  });

  setupClose.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      closeSetupBlock();
    }
  });

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
}());
