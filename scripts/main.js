'use strict';

(function () {
  'use strict';

  var panels = ['○', '△', '☆'];
  var timers = [];
  var results = [];
  var stopCount = 0;
  var isPlaying = false;

  var panel1 = document.getElementById('js-panel1');
  var panel2 = document.getElementById('js-panel2');
  var panel3 = document.getElementById('js-panel3');
  var panelArray = [panel1, panel2, panel3];
  var btn1 = document.getElementById('js-btn1');
  var btn2 = document.getElementById('js-btn2');
  var btn3 = document.getElementById('js-btn3');
  var btnArray = [btn1, btn2, btn3];
  var spinBtn = document.getElementById('js-spinBtn');

  spinBtn.addEventListener('click', function (e) {
    if (isPlaying) return;

    isPlaying = true;

    // スピンボタンをインアクティブにする
    this.classList.add('spinBtn--inactive');

    // ボタンをアクティブにする
    btnArray.forEach(function (btn) {
      return btn.classList.remove('btn--inactive');
    });

    // パネルをアクティブにする
    panelArray.forEach(function (panel) {
      return panel.classList.remove('panel--unmatched');
    });

    // スロットを回す
    panelArray.forEach(function (panel, i) {
      runSlot(i, panel);
    });
  });

  function runSlot(n, panel) {
    panel.textContent = panels[Math.floor(Math.random() * panels.length)];
    timers[n] = setTimeout(function () {
      runSlot(n, panel);
    }, 50);
  }

  btnArray.forEach(function (btn, i) {
    btn.addEventListener('click', function (e) {
      stopSlot(i, panelArray[i], this);
    });
  });

  function stopSlot(n, panel, btn) {
    if (!isPlaying || results[n] !== undefined) return;

    btn.classList.add('btn--inactive');
    clearTimeout(timers[n]);
    results[n] = panel.textContent;
    stopCount++;

    // 全てのスロットが止まったら結果をチェック
    if (stopCount === 3) {
      checkResults();

      // リプレイのための初期化処理
      timers = [];
      results = [];
      stopCount = 0;
      isPlaying = false;

      spinBtn.classList.remove('spinBtn--inactive');
    }
  }

  function checkResults() {
    if (results[0] !== results[1] && results[0] !== results[2]) {
      panel1.classList.add('panel--unmatched');
    }
    if (results[1] !== results[0] && results[1] !== results[2]) {
      panel2.classList.add('panel--unmatched');
    }
    if (results[2] !== results[0] && results[2] !== results[1]) {
      panel3.classList.add('panel--unmatched');
    }
  }
})();