let Questions = [
  {
    question: "Who is the founder of Flappy Bird?",
    options: ["Helly Achnov", "Casa Yemiin", "Dong Nguyen"],
    correct: "Dong Nguyen",
  },
  {
    question: "Who is the founder of Pac-Man?",
    options: ["Loofilooof", "Hirushi Iban", "Toru Iwatani"],
    correct: "Toru Iwatani",
  },
  {
    question: "Who is the founder of Mario?",
    options: ["Tetriss", "Mario", "Shigeru Miyamoto"],
    correct: "Shigeru Miyamoto",
  },
  {
    question: "Who is the founder of 2048?",
    options: ["Gabriele Cirulli", "Jessy Rose", "Helton Mashan"],
    correct: "Gabriele Cirulli",
  },
  {
    question: "Who is the founder of Snake?",
    options: ["Glove Bently", "Kurian Bradelly", "Taneli Armanto"],
    correct: "Taneli Armanto",
  },
  {
    question: "Who is the founder of Tetris?",
    options: ["Gatuso Chimaev", "Magician Brenkly", "Alexey Pajitnov"],
    correct: "Alexey Pajitnov",
  },
];

let Change = false,
  Changes = false;
let index = 0;
let buttons = [];
let quizComplete = false;
let score = 0;
let header = [{ h: "home", l: "about", a: "Contact" }];

let bubble = 0;
let direction = 1;
let mySound, bac;
let my;
let btne;

function preload() {
  soundFormats("wav");
  mySound = loadSound("game");
  my = loadImage("yes.jpg");
  bac = loadSound("bac.mp3");
  soundFormats("mp3");
}

function setup() {
  createCanvas(400, 400);

  for (let x = 0; x < header.length; x++) {
    let btn = createButton(header[x].h);
    let btns = createButton(header[x].l);
    btn.position(200 + x * 80, 20);
    btns.position(300 + x * 80, 20);

    btn.style("background-color", "#4CAF50");
    btn.style("color", "white");
    btn.style("border", "none");
    btn.style("border-radius", "12px");
    btn.style("padding", "10px 24px");
    btn.style("cursor", "pointer");

    btns.style("background-color", "#008CBA");
    btns.style("color", "white");
    btns.style("border", "none");
    btns.style("border-radius", "12px");
    btns.style("padding", "10px 24px");
    btns.style("cursor", "pointer");

    btn.mousePressed(() => {
      if (header[x].h === "home") {
        Change = true;
        Changes = false;
        Goback();
        clearScreen();
      }
    });
    btns.mousePressed(() => {
      if (header[x].l === "about") {
        Changes = true;
        Change = false;
        clearScreen();
      }
    });
  }
  createQuestion();
}

function draw() {
 
  if (Change) {
    background(120, 120, 60);
    image(my, 50, 50);
  } else if (Changes) {
    background(15, 120, 120);
    textSize(10);
    rect(10, 180, 350, 50);
    text(
      "I am Ibrahim Bachiri and I am an ALX student.",
      20,
      200
    );
    text(
      "I like programming as a way to develop multiple skills.",
      20,
      220
    );
  } else {
    background(220);
  }

  ellipse(bubble, 40, 10, 10);
  bubble += direction;
  if (bubble >= 400 || bubble <= 0) {
    direction *= -1;
  }

  textSize(16);
  if (!quizComplete && !Change && !Changes) {
    if (index < Questions.length) {
      text(Questions[index].question, 50, 100);
    }
  } else if (quizComplete) {
    text("Quiz Complete!", 100, 200);
    if (score === Questions.length) {
      text("Congratulations! You scored " + score + "/" + Questions.length, 50, 250);
    } else {
      text("You lose! Your score: " + score + "/" + Questions.length, 50, 250);
    }
  }
}

function createQuestion() {
  buttons.forEach((button) => button.remove());
  buttons = [];

  if (index < Questions.length) {
    for (let i = 0; i < Questions[index].options.length; i++) {
      let btn = createButton(Questions[index].options[i]);
      btn.position(100, 150 + i * 30);

      btn.mousePressed(() => checkAnswer(Questions[index].options[i]));
      buttons.push(btn);

      btn.style("background-color", "#008CBA");
      btn.style("color", "white");
      btn.style("cursor", "pointer");
      btn.style("border-radius", "10px");
      btn.style("shadow", "10px");
    }
  }
}

function checkAnswer(selected) {
  if (selected === Questions[index].correct) {
    score++;
    mySound.play();
  }
  index++;
  if (index < Questions.length) {
    createQuestion();
  } else {
    buttons.forEach((button) => button.remove());
    buttons = [];
    quizComplete = true;
    bac.play();
  }
}

function clearScreen() {
  buttons.forEach((button) => button.remove());
  buttons = [];
  quizComplete = false;
  index = 0;
  score = 0;
  background(220);
}

function Goback() {
  btne = createButton("Go Back");
  btne.position(50, 20);

  btne.style("background-color", "#008CBA");
  btne.style("color", "white");
  btne.style("cursor", "pointer");
  btne.style("border-radius","15px");

  btne.mousePressed(() => {
    createQuestion();
    Change = false;
    Changes = false;
  });
}
