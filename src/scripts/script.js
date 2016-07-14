(() => {
  'use strict';

  const panels = ['○', '△', '☆'];
  var timers = [];
  var results = [];
  var stopCount = 0;
  var isPlaying = false;

  const panel1 = document.getElementById('js-panel1');
  const panel2 = document.getElementById('js-panel2');
  const panel3 = document.getElementById('js-panel3');
  const panelArray = [panel1, panel2, panel3];
  const btn1 = document.getElementById('js-btn1');
  const btn2 = document.getElementById('js-btn2');
  const btn3 = document.getElementById('js-btn3');
  const btnArray = [btn1, btn2, btn3];
  const spinBtn = document.getElementById('js-spinBtn');

  spinBtn.addEventListener('click', function (e) {
    if (isPlaying) return;

    isPlaying = true;

    // スピンボタンをインアクティブにする
    this.classList.add('spinBtn--inactive');

    // ボタンをアクティブにする
    btnArray.forEach(btn => btn.classList.remove('btn--inactive'));

    // パネルをアクティブにする
    panelArray.forEach(panel => panel.classList.remove('panel--unmatched'));

    // スロットを回す
    panelArray.forEach((panel, i) => {
      runSlot(i, panel);
    });
  });

  function runSlot(n, panel) {
    panel.textContent = panels[Math.floor(Math.random() * panels.length)];
    timers[n] = setTimeout(() => {
      runSlot(n, panel);
    }, 50);
  }

  btnArray.forEach((btn, i) => {
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
      [timers, results, stopCount, isPlaying] = [[], [], 0, false];
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
