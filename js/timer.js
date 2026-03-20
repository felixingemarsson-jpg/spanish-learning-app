/*
 * Timer — Countdown bar for timed exercises
 * Modes: off (default), relaxed (30s), challenge (15s)
 */

const Timer = (() => {
  const SETTINGS_KEY = 'timer-mode';
  let interval = null;
  let remaining = 0;
  let total = 0;
  let barEl = null;
  let onTimeoutCallback = null;

  function getMode() {
    return localStorage.getItem(SETTINGS_KEY) || 'off';
  }

  function setMode(mode) {
    localStorage.setItem(SETTINGS_KEY, mode);
  }

  function getSeconds() {
    const mode = getMode();
    if (mode === 'relaxed') return 30;
    if (mode === 'challenge') return 15;
    return 0;
  }

  function isActive() {
    return getMode() !== 'off';
  }

  function start(seconds, onTimeout) {
    stop();
    if (!seconds) return;

    remaining = seconds;
    total = seconds;
    onTimeoutCallback = onTimeout;

    interval = setInterval(() => {
      remaining -= 0.1;
      if (remaining <= 0) {
        remaining = 0;
        stop();
        if (onTimeoutCallback) onTimeoutCallback();
      }
      updateBar();
    }, 100);

    updateBar();
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function render(container) {
    if (!isActive()) return null;

    barEl = document.createElement('div');
    barEl.className = 'timer-bar-container';
    barEl.innerHTML = '<div class="timer-bar-fill"></div>';
    container.prepend(barEl);
    return barEl;
  }

  function updateBar() {
    if (!barEl) return;
    const fill = barEl.querySelector('.timer-bar-fill');
    if (!fill) return;

    const pct = total > 0 ? (remaining / total) * 100 : 0;
    fill.style.width = pct + '%';

    if (remaining <= 5) {
      fill.className = 'timer-bar-fill timer-red';
    } else if (remaining <= 10) {
      fill.className = 'timer-bar-fill timer-amber';
    } else {
      fill.className = 'timer-bar-fill';
    }
  }

  function destroy() {
    stop();
    if (barEl && barEl.parentNode) {
      barEl.parentNode.removeChild(barEl);
    }
    barEl = null;
    onTimeoutCallback = null;
  }

  return { getMode, setMode, getSeconds, isActive, start, stop, render, destroy };
})();
