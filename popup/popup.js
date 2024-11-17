(() => {
  const input = document.querySelector("input");
  const hand = document.querySelector("[data-id='hand']");
  const toggleBtn = document.querySelector("[data-id='toggle-btn']");
  const resetBtn = document.querySelector("[data-id='reset-btn']");
  const displayTimer = document.querySelector("h2");
  const stopwatch = document.querySelector(".stop-watch");

  let timer;
  let timeRemaining = input.value * 60;
  let isRunning = false;

  function updateDisplay() {
    const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, "0");
    const seconds = String(Math.floor(timeRemaining % 60)).padStart(2, "0");

    displayTimer.textContent = `${minutes}:${seconds}`;
  }

  function updateHandRotate() {
    const totalTime = input.value * 60;
    const elapsedTime = totalTime - timeRemaining;
    const rotateDegree = (elapsedTime / totalTime) * 360;
    const percentage = (elapsedTime / totalTime) * 100;

    hand.style.transform = `rotate(${-90 + rotateDegree}deg)`;
    stopwatch.style.background = `conic-gradient(from 0deg, white ${percentage}%, hsla(120, 100%, 25%, 0.5) ${percentage}% 100%)`;
  }

  function timeInterval() {
    timeRemaining--;
    updateDisplay();
    updateHandRotate();

    if (timeRemaining <= 0) {
      clearInterval(timer);

      isRunning = false;
    }
  }

  function toggleTimer() {
    if (isRunning) {
      clearInterval(timer);
      isRunning = false;
    } else {
      timer = setInterval(timeInterval, 1000);
      isRunning = false;
    }
  }

  function resetTimer() {
    clearInterval(timer);
    timeRemaining = input.value * 60;
    updateDisplay();
    hand.style.transform = "rotate(-90deg)";
    stopwatch.style.background =
      "conic-gradient(from 0deg, white 0%, hsla(120, 100%, 25%, 0.5) 0% 100%)";
    isRunning = false;
  }

  function typingInput() {
    if (!isRunning) {
      timeRemaining = input.value * 60 || 0;
      updateDisplay();
    }
  }

  if (timeRemaining === 0) {
    resetTimer();
  }

  input.addEventListener("input", typingInput);
  toggleBtn.addEventListener("click", toggleTimer);
  resetBtn.addEventListener("click", resetTimer);

  updateDisplay();
})();
