'use strict';

(function () {
  var setupBlock = window.main.setupBlock;
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupClose = document.querySelector('.setup-close');
  var userNameField = document.querySelector('.setup-user-name');

  var wizardCoat = document.querySelector('.setup-player .wizard-coat');
  var wizardEyes = document.querySelector('.setup-player .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var wizardsList = [];

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

  var setupWizardForm = document.querySelector('.setup-wizard-form');

  var setupSimilarList = document.querySelector('.setup-similar-list');
  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');

  function createMessageElement(textError, type) {
    var errorBlock = document.createElement('div');
    var textColor = '#0d5ca1';
    var bgColor = '#bde5f8';

    if (type === 'error') {
      textColor = '#d6010e';
      bgColor = '#ffbaba';
    }

    errorBlock.style.cssText =
      'z-index: 10;' +
      'position: absolute;' +
      'right: 100px;' +
      'top: 150px;' +
      'width: 400px;' +
      'background: ' + bgColor + ';' +
      'color: ' + textColor + ';' +
      'padding: 10px;';

    errorBlock.textContent = textError;

    document.body.appendChild(errorBlock);
    setTimeout(function () {
      errorBlock.parentElement.removeChild(errorBlock);
    }, 5000);
  }

  function updateWizardsList() {
    setupSimilarList.innerHTML = '';
    setupSimilarList.appendChild(createWizardTemplateList(sortSimilarWizards(wizardsList)));
  }

  setupWizardForm.addEventListener('submit', function (e) {
    var onLoad = function () {
      closeSetupBlock();
    };
    var onError = function () {
      createMessageElement('Ошибка: не удалось отправить данные на сервер!', 'error');
    };

    window.backend.save(new FormData(setupWizardForm), onLoad, onError);

    e.preventDefault();
  });

  var wizardEyesColorField = document.querySelector('.setup-wizard-appearance [name="eyes-color"]');
  var wizardCoatColorField = document.querySelector('.setup-wizard-appearance [name="coat-color"]');
  var wizardFireballColorField = document.querySelector('.setup-fireball-wrap [name="fireball-color"]');

  function setWizardColor(e) {
    var elem = e.currentTarget;

    if (elem === wizardEyes) {
      wizardEyes.style.fill = wizardEyesColorField.value = getRandomArrayElement(EYES_COLOR_LIST);
    } else if (elem === wizardCoat) {
      wizardCoat.style.fill = wizardCoatColorField.value = getRandomArrayElement(COAT_COLOR_LIST);
    } else if (elem === wizardFireball) {
      wizardFireball.style.background = wizardFireballColorField.value = getRandomArrayElement(FIREBALL_COLOR_LIST);
    }

    // window.debounce(function (color) {
    //   console.log(1);
    //   updateWizardsList();
    // })();
  }

  function keydownCloseSetupBlock(e) {
    if (e.keyCode === ESC_KEYCODE && document.activeElement !== userNameField) {
      closeSetupBlock();
    }
  }

  function sortSimilarWizards (wizards) {
    return wizards.map(function (wizard) {
      wizard.priority = 0;

      if (wizardCoatColorField.value === wizard.colorCoat) {
        wizard.priority += 3;
      }
      if (wizardEyesColorField.value === wizard.colorEyes) {
        wizard.priority += 2;
      }

      return wizard;
    }).sort(function (a, b) {
      return b.priority - a.priority;
    });
  }

  function openSetupBlock() {
    setupBlock.classList.remove('hidden');
    wizardEyes.addEventListener('click', setWizardColor);
    wizardCoat.addEventListener('click', setWizardColor);
    wizardFireball.addEventListener('click', setWizardColor);

    wizardEyes.addEventListener('click', window.debounce(updateWizardsList));
    wizardCoat.addEventListener('click', window.debounce(updateWizardsList));
    wizardFireball.addEventListener('click', window.debounce(updateWizardsList));

    document.addEventListener('keydown', keydownCloseSetupBlock);

    var onLoad = function (result) {
      wizardsList = result;
      setupSimilarList.appendChild(createWizardTemplateList(sortSimilarWizards(wizardsList)));
    };

    var onError = function () {
      createMessageElement('Ошибка: не удалось загрузить данные с сервера!', 'error');
    };

    if (wizardsList.length === 0) {
      window.backend.load(onLoad, onError);
    } else {
      setupSimilarList.appendChild(createWizardTemplateList(sortSimilarWizards(wizardsList)));
    }

    setupBlock.style.left = '';
    setupBlock.style.top = '';
  }

  function closeSetupBlock() {
    setupBlock.classList.add('hidden');
    wizardEyes.removeEventListener('click', setWizardColor);
    wizardCoat.removeEventListener('click', setWizardColor);
    wizardFireball.removeEventListener('click', setWizardColor);
    document.removeEventListener('keydown', keydownCloseSetupBlock);

    setupSimilarList.innerHTML = '';
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

    for (var i = 0; i < 4; i++) {
      var copyTmp = wizardItemTmp.cloneNode(true);

      copyTmp.querySelector('.setup-similar-label').textContent = wizardList[i].name;
      copyTmp.querySelector('.wizard-coat').style.fill = wizardList[i].colorCoat;
      copyTmp.querySelector('.wizard-eyes').style.fill = wizardList[i].colorEyes;

      wizardTemplateContainer.appendChild(copyTmp);
    }

    return wizardTemplateContainer;
  }
}());
