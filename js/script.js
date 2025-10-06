document.addEventListener("DOMContentLoaded", function () {
  const rat = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const umbrella = document.querySelector(".umbrella");
  const popUP = document.querySelector(".gameOver_container");
  const desert = document.getElementById("desert");
  const alert = document.getElementById("alert");
  const btn = document.getElementById("reloadBtn");
  const mainbtn = document.querySelector(".mainBtn");
  const dialogLine = document.querySelector(".dialog");
  const modal = document.querySelector(".modal");
  let seconds = 30;
  let gravity = 0.9;
  let isJumping = false;
  let isGameOver = false;

  function control(e) {
    if (e.code === "Space") {
      if (!isJumping) {
        jump();
      }
    }
  }
  //Loading page transition
  window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
  });
  // Play
  document.addEventListener("keydown", control);
  // Game over Refresh
  btn.addEventListener("click", function () {
    smoothReload();
  });
  //test
  function timer() {
    let interval;
    let timerText = document.querySelector(".timer");

    interval = setInterval(() => {
      // stop timer if game over
      if (isGameOver) {
        clearInterval(interval);
        popUP.style.display = "flex";
        timerText.innerText = "try again";
        return;
      }

      timerText.innerText = seconds;
      seconds--;

      // when time runs out
      if (seconds < 0) {
        clearInterval(interval);
        win(); // show modal
      }
    }, 1000);
  }

  let position = 0;
  function jump() {
    umbrella.classList.remove("umbrella");
    isJumping = true;
    let count = 0;
    let timerId = setInterval(function () {
      //move down
      if (count === 15) {
        //float
        clearInterval(timerId);
        let downTimerId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 5;
          count--;
          position = position * gravity;
          rat.style.bottom = position + "px";
        }, 20);
      }
      //move up
      position += 15;
      count++;
      position = position * gravity;
      rat.style.bottom = position + "px";
    }, 20);
  }
  // test
  function generateObstacles() {
    if (!isGameOver) {
      let randomTime = Math.random() * 3000 + 1000;
      let obstaclePosition = 1500;
      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + "px";

      let timerId = setInterval(function () {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 50) {
          clearInterval(timerId);
          isGameOver = true;
          //remove all children
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
          }
        } else if (seconds <= 0) {
          grid.removeChild(grid.lastChild);
          clearInterval(timerId);
          clearTimeout(createObstacles);
          obstacle.remove;
          //remove all children
        }
        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + "px";
      }, 20);
      let createObstacles = setTimeout(generateObstacles, randomTime);
    }
  }

  function ending() {
    const dialog = [
      `At last, the rat found the cat standing in a middle of desert near the Moonlit Hill. 
    Both were relieved to see each other. Above them, the Moonbloom shone under the full moon and glowed softly.`,
      `The cat whispered, “The Moonbloom can only be cut by the teeth of a rat.” 
    The rat carefully gnawed the stem, and together they retrieved the glowing petals.`,
    ];
    let lineIndex = 0;
    let charIndex = 0;
    dialogLine.innerText = "";
    function typeLine() {
      if (lineIndex >= dialog.length) return; // stop if all lines done

      dialogLine.innerText += dialog[lineIndex][charIndex];
      charIndex++;
      console.log(charIndex);
      if (charIndex < dialog[lineIndex].length) {
        setTimeout(typeLine, 100); // type next character
      } else {
        lineIndex++;
        charIndex = 0;
        if (lineIndex < dialog.length) {
          // Add newline AFTER finishing the line
          dialogLine.innerText += "\n";
          // Start next line after a short delay
          setTimeout(typeLine, 500);
        }
      }
    }

    typeLine();
    setTimeout(() => {
      modal.style.display = "block";
    }, 45000);
  }
  // if played more than 30s show alert!
  function win() {
    alert.innerText = "We met !!";
    ending();
    // alert.innerHTML = "Game Over";
    let duration = 600;
    let ratPosition = 0;
    let catPosition = 0;

    let slowDown = setInterval(() => {
      duration += 600;
      desert.style.animationDuration = `${duration}s`;

      if (duration >= 6000) {
        duration = 6000;
        clearInterval(slowDown);
        desert.classList.remove("slideright");
        showCat();
        ratRun();
      }
      console.log(duration);
    }, 1000);

    function ratRun() {
      let run = setInterval(() => {
        ratPosition += 1;
        rat.style.left = ratPosition + "%";
        if (ratPosition >= 75) {
          clearInterval(run);
        }
      }, 100);
    }

    function showCat() {
      const cat = document.createElement("div");
      cat.classList.add("cat");
      grid.appendChild(cat);
      let run = setInterval(() => {
        catPosition += 0.5;
        cat.style.right = ratPosition + "%";
        if (ratPosition >= 15) {
          clearInterval(run);
        }
      }, 100);
    }

    function showModal() {
      modal.style.display = "block";
    }
  }

  function smoothReload() {
    document.body.classList.remove("fade-in");
    document.body.classList.add("fade-out");

    setTimeout(() => {
      location.reload();
    }, 1000); // match transition time
  }

  timer();
  generateObstacles();
});
