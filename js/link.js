const dialog = [
  `Once upon a time, in a small quiet forest, there lived a rat and a cat .
They were very different — one small and quick, the other calm and graceful — but they shared everything: food, stories, and even dreams.`,
  `One morning, the rat grew weak from sickness. Its tiny body shivered under the blazing sun, and the cat’s heart filled with worry.`,
  `The cat remembered an ancient story: the Moonbloom, a magical flower that only blooms under the full moon, could heal any sickness — but it only grew in the heart of the desert.`,
  `the cat set off into the endless dunes to find the flower. Sandstorms and scorching winds could not stop it.`,
  // q1
  ` the cat had still not returned. The rat, despite being weak, knew it had to go after the cat. But when did the full moon rise?`,
  //q2
  `The rat crossed shifting sands, avoided venomous snakes, and navigated vast canyons. The desert was harsh, but its determination never faltered.\n She found petals that cure venom—what the flower’s petal was left on the ground? `,
  `Suddenly, a fierce sandstorm swept across the desert. The rat barely kept its balance, sand stinging its eyes. It had to find shelter under a rocky outcrop, waiting for the storm to pass.`,
  //q3
  `As the storm cleared, the desert seemed endless and empty. The rat saw a shimmering oasis in the distance, but when it ran toward it, it was just a mirage. Doubt and exhaustion threatened to stop it,\nBut something make her remember the first day they met?`,
  //q4
  `The rat approached a deep canyon, where shadows stretched like dark fingers. Strange sounds echoed from below. With a deep breath, the rat leaped across jagged rocks, narrowly avoiding a deadly fall.Suddenly,\n she stumbled upon something magical: it kept her warm when the air was biting, and dry when it wet?`,
  `Night came with freezing cold, and mirages tricked the rat’s eyes. But the thought of the cat might lost somewhere kept it moving forward.`,
];
const answer = ["today", "orchid", "03072024", "umbrella"];
const display = document.querySelector(".display");
const nextBtn = document.querySelector(".nextBtn");
const dialogLine = document.querySelector(".dialog");
const noti = document.querySelector(".noti");
const form = document.getElementById("myform");
const input = document.querySelectorAll(".input");
const submit = document.getElementById("submit");

const wrongPhrases = [
  "“Not yet... the path remains hidden.”",
  "“The riddle mocks your attempt.”",
  "“A whisper in the dark says, ‘Try again.’”",
  "“Your resolve wavers, but the truth lies ahead.”",
  "“The answer slips through your grasp like a dream.”",
  "“The seal resists your touch — think again.”",
  "“No... that is not the key to this mystery.”",
  "“The air grows still — something is missing.”",
];

let lineIndex = 0; // which dialog line
let charIndex = 0; // which character in line
let typingInterval;
let currentLine = 0;
let slideIndex = 0;

function disabledForm() {
  form.disabled = true;
  const elements = form.querySelectorAll(".input");
  elements.forEach((el) => (el.disabled = true));
}

function enabledForm() {
  form.disabled = true;
  const elements = form.querySelectorAll(".input");
  elements.forEach((el) => (el.disabled = false));
}
disabledForm();

function sildeImg() {
  display.style.opacity = 0;

  setTimeout(() => {
    slideIndex++;
    display.style.backgroundImage = `url("img/scene/${slideIndex}.PNG")`;
    display.style.opacity = 1;
  }, 500);
}

let puzzleIndex = 0;
let answerIndex = 0;
function puzzle(formAnswer) {
  const puzzleOrder = [5, 6, 8, 9];
  const lastOrder = dialog.length;

  console.log("current: ", lineIndex);
  console.log(formAnswer);
  console.log(answerIndex);
  if (puzzleOrder[puzzleIndex] === currentLine) {
    nextBtn.disabled = true;
    enabledForm();
    if (
      typeof formAnswer !== "undefined" &&
      formAnswer === answer[answerIndex]
    ) {
      noti.innerText = "...";

      nextBtn.disabled = false;
      disabledForm();
      answerIndex++;
      puzzleIndex++;

      formAnswer = "";
    } else if (
      typeof formAnswer !== "undefined" &&
      formAnswer != answer[answerIndex]
    ) {
      const randomWorngLine =
        wrongPhrases[Math.floor(Math.random() * wrongPhrases.length)];
      noti.innerText = randomWorngLine;
    } else if (typeof formAnswer === "undefined") {
      noti.innerText = "Please enter an answer.";
    }
  }
  if (lastOrder === currentLine) {
    nextBtn.innerText = "To the Middle of Desert";
    nextBtn.disabled = false;
    nextBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}
// Submit answer
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formAnswer = document.getElementById("answer").value;
  puzzle(formAnswer);
});

//Next button
nextBtn.addEventListener("click", () => {
  sildeImg();

  if (lineIndex < dialog.length) {
    charIndex = 0;
    dialogLine.innerText = ""; // clear previous text
    nextBtn.disabled = true;
    clearInterval(typingInterval);
    typingInterval = setInterval(() => {
      dialogLine.innerText += dialog[lineIndex][charIndex];
      charIndex++;
      if (charIndex === dialog[lineIndex].length) {
        nextBtn.disabled = false;
      }
      if (charIndex >= dialog[lineIndex].length) {
        clearInterval(typingInterval); // stop typing current line
        lineIndex++; // move to next line for next click
        currentLine++;
        puzzle();
      }
    }, 100); // adjust typing speed here (ms)
  }
});
