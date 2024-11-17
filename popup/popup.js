(() => {
  const input = document.querySelector("input");
  const hand = document.querySelector("[data-id='hand']");
  const toggleBtn = document.querySelector("[data-id='toggle-btn']");
  const resetBtn = document.querySelector("[data-id='reset-btn']");
  const displayTimer = document.querySelector("h2");
  const stopwatch = document.querySelector(".stop-watch");

  let timer;
  let timeRemaining = getInputTimeInSeconds();
  let isRunning = false;
  const INITIAL_ROTATION = -90;
  const BASE_COLOR = "white";
  const ACTIVE_COLOR = "hsla(120, 100%, 25%, 0.5)";

  function getInputTimeInSeconds() {
    return input.value * 60 || 0;
  }

  function conicGrident(percenage) {
    return `conic-gradient(from 0deg, ${BASE_COLOR} ${percenage}%, ${ACTIVE_COLOR} ${percenage}% 100%)`;
  }

  function calculateTime(equation) {
    return String(Math.floor(equation)).padStart(2, "0");
  }

  function updateDisplay() {
    const minutes = calculateTime(timeRemaining / 60);
    const seconds = calculateTime(timeRemaining % 60);

    displayTimer.textContent = `${minutes}:${seconds}`;
  }

  function updateHandRotate() {
    const totalTime = getInputTimeInSeconds();
    const elapsedTime = totalTime - timeRemaining;
    const rotateDegree = (elapsedTime / totalTime) * 360;
    const percentage = (elapsedTime / totalTime) * 100;

    hand.style.transform = `rotate(${INITIAL_ROTATION + rotateDegree}deg)`;
    stopwatch.style.background = conicGrident(percentage);
  }

  function timeInterval() {
    timeRemaining--;

    if (timeRemaining <= 0) {
      clearInterval(timer);
      resetTimer();
    }

    updateDisplay();
    updateHandRotate();
  }

  function startTimer() {
    timer = setInterval(timeInterval, 1000);
    isRunning = true;
    toggleBtn.disabled = true;
  }

  function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    toggleBtn.disabled = false;
  }

  function toggleTimer() {
    isRunning ? stopTimer() : startTimer();
  }

  function resetTimer() {
    stopTimer();
    timeRemaining = getInputTimeInSeconds();
    updateDisplay();

    hand.style.transform = `rotate(${INITIAL_ROTATION}deg)`;
    stopwatch.style.background = conicGrident(0);
  }

  function onInputChange() {
    if (!isRunning) {
      timeRemaining = getInputTimeInSeconds();
      updateDisplay();
    }
  }

  input.addEventListener("input", onInputChange);
  toggleBtn.addEventListener("click", toggleTimer);
  resetBtn.addEventListener("click", resetTimer);

  updateDisplay();
})();
