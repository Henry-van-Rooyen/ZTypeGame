"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let start = document.getElementById("startGame");
let menu = document.getElementById("menu");
let henryvanrooyen = document.getElementById("henryvanrooyen");
let ztype = document.getElementById("ztype");
let asteroid = document.getElementById("asteroid");
let gameOver = document.getElementById("gameOver");
let scoreVisible = document.getElementById("score");
let waveVisible = document.getElementById("wave");
let gameLoopInterval;
let spawnedAstNumber = 0;
let currentAstNumber = 0;
let maxAstNumber = 4;
let asteroidMemory = [];
let astList1 = [];
let astList2 = [];
let timeoutVar = 0;
let wordArray = ['justify', 'kitchen', 'knife', 'knee', 'knock', 'land', 'landscape', 'language', 'lap', 'large', 'manufacturing', 'many', 'map', 'margin', 'market', 'negotiation', 'neighbourhood', 'neither', 'nerve', 'objective', 'obligation', 'observe', 'opportunity', 'oppose', 'porch', 'port', 'portion', 'portrait', 'position', 'qualify', 'quality', 'quit', 'recipe', 'recognition', 'refugee', 'regard', 'science', 'scope', 'score', 'script', 'tactic', 'tail', 'take', 'talent', 'ultimately', 'unable', 'understand', 'victory', 'video', 'view', 'village', 'violence', 'weather', 'wedding', 'wear', 'week', 'yard', 'year', 'yellow', 'yes', 'yesterday', 'zone', 'adapt', 'administration', 'affect', 'effect', 'afford', 'analysis', 'apparently', 'background', 'balance', 'beside', 'beyond', 'borrow', 'robbery', 'budget', 'building', 'business', 'calculate', 'campaign', 'campus', 'capability', 'category', 'challenge', 'channel', 'civil', 'deal', 'defensive', 'democracy', 'description', 'dialogue', 'dimension', 'discrimination', 'distinguish', 'elementary', 'elite', 'else', 'elsewhere', 'mail', 'embrace', 'emergency', 'emotion', 'fewer', 'fancy', 'fiber', 'fiction', 'foreign', 'form', 'gaze', 'gender', 'generic', 'highlight', 'holiday', 'home', 'image', 'illustrate', 'implement', 'income', 'journalist', 'journey', 'joy', 'judge'];
let takenAsteroid = 0;
let randomWord;
let w = 1;
let score = 0;
let faktor;
ctx.canvas.height = 567;
ctx.canvas.width = 400;
menu.style.visibility = "hidden";
gameOver.style.visibility = "hidden";
scoreVisible.style.visibility = "hidden";
waveVisible.style.visibility = "hidden";
start.style.visibility = "visible";
asteroid.style.visibility = "hidden";


/**************************************************************************
 **************************************************************************/


function drawText(text, font, colour, x, y) {
  ctx.beginPath();
  ctx.font = font;
  ctx.fillStyle = colour;
  ctx.fillText(text, x, y);
  ctx.closePath();
}

function selectWord() {
  var index = Math.floor(Math.random() * wordArray.length);
  randomWord = wordArray[index];
  for (var i = 0; i < asteroidMemory.length; i++) {
    if (asteroidMemory[i].astText.charAt(0) === randomWord.charAt(0)) {
      index = Math.floor(Math.random() * wordArray.length);
      randomWord = wordArray[index];
    }
  }
  wordArray.splice(index, 1);
  return randomWord;
}

function checkShipCollision() {
  for (var i = 0; i < asteroidMemory.length; i++) {
    if (asteroidMemory[i].astY >= 401) {
      asteroidMemory.splice(i, 1);
      gameOverLoop();
    }
  }
}

function moveAsteroid(faktor) {
  for (var i = 0; i < asteroidMemory.length; i++) {
    asteroidMemory[i].astY += faktor;
    if (asteroidMemory[i].astX < 181) {
      asteroidMemory[i].astX += faktor * ((181 - asteroidMemory[i].startX) / 401);
    } else if (asteroidMemory[i].astX > 181) {
      asteroidMemory[i].astX -= faktor*((asteroidMemory[i].startX - 181) / 401);
    }
  }
}

function Asteroid(astX, astY, astText, astColour) {
  this.astX = astX;
  this.astY = astY;
  this.startX = astX;
  this.astText = astText;
  this.astColour = astColour;
}

function wave() {
  if (currentAstNumber === 0 && maxAstNumber === spawnedAstNumber) {
    switch (w) {
      case 1 :
        maxAstNumber = 5;
        faktor = 1;
        break;
      case 2 :
        maxAstNumber = 7;
        faktor = 2;
        break;
      case 3 :
        maxAstNumber = 9;
         faktor = 2.5;
        break;
      case 4 :
        maxAstNumber = 10;
        faktor = 4;
        break;
      case 5 :
        maxAstNumber = 11;
        faktor = 4.5;
        break;
      case 6 :
        maxAstNumber = 13;
        faktor = 5;
        break;
      case 7 :
        maxAstNumber = 15;
        faktor = 5.5;
        break;
      case 8 :
        maxAstNumber = 18;
        faktor = 6;
        break;
      case 9 :
        maxAstNumber = 22;
        faktor = 6.5;
        break;
    }
    w++;
    spawnedAstNumber = 0;
    timeoutVar = 0;
  }
}

function gameLoop() {
  start.style.visibility = "hidden";
  henryvanrooyen.style.visibility = "hidden";
  ztype.style.visibility = "hidden";
  clearCanvas();
  spawnWave();
  fillAsteroid();
  moveAsteroid(faktor);
  checkShipCollision();
  wave();
  timeoutVar++;
}

function gameOverLoop() {
  clearCanvas();
  clearInterval(gameLoopInterval);
  menu.style.visibility = "visible";
  gameOver.style.visibility = "visible";
  waveVisible.style.visibility = "visible";
  scoreVisible.style.visibility = "visible";
  drawText("" + score, "25px Century Gothic", "antiquewhite", 111, 212);
  drawText("" + w, "25px Century Gothic", "antiquewhite", 111, 180);
}

function spawnWave() {
  if (spawnedAstNumber !== maxAstNumber && timeoutVar === 28) {
    timeoutVar = 0;
    asteroidMemory.push(new Asteroid(getRandomNumber(0, 365), 0, selectWord(), "antiquewhite"));
    currentAstNumber++;
    spawnedAstNumber++;
  }
}

start.addEventListener("mouseenter", () => {
  start.style.cursor = "pointer";
  start.style.color = "orange";
}, false);

start.addEventListener("mouseout", () => {
  start.style.color = "antiquewhite";
}, false);

start.addEventListener("mousedown", () => {
  start.style.color = "lightgreen";
  currentAstNumber = 0;
  maxAstNumber = 5;
  asteroidMemory = [];
  timeoutVar = 0;
}, false);

start.addEventListener("mouseup", () => {
  gameLoopInterval = setInterval(gameLoop, 90);
  faktor = 1;
}, false);

menu.addEventListener("click", () => {
  clearInterval(gameLoopInterval);
  clearCanvas();
  waveVisible.style.visibility = "hidden";
  menu.style.visibility = "hidden";
  gameOver.style.visibility = "hidden";
  scoreVisible.style.visibility = "hidden";
  start.style.visibility = "visible";
  henryvanrooyen.style.visibility = "visible";
  ztype.style.visibility = "visible";
}, false);

menu.addEventListener("mouseenter", () => {
  menu.style.cursor = "pointer";
  menu.style.color = "orange";
}, false);

menu.addEventListener("mouseout", () => {
  menu.style.color = "antiquewhite";
}, false);

menu.addEventListener("mousedown", () => {
  menu.style.color = "lightgreen";
}, false);


/**************************************************************************
 **************************************************************************/


function clearCanvas() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function fillAsteroid() {
  for (var i = 0; i < asteroidMemory.length; i++) {
    ctx.drawImage(asteroid, asteroidMemory[i].astX, asteroidMemory[i].astY);
    drawText(asteroidMemory[i].astText, "15px Century Gothic", asteroidMemory[i].astColour, asteroidMemory[i].astX, asteroidMemory[i].astY);
  }
}

function getRandomNumber(start, end) {
  return Math.floor(Math.random() * (end - start));
}

function destroyAst() {
  if (takenAsteroid > 0) {
    astList2 = asteroidMemory.slice(takenAsteroid, currentAstNumber);
    astList1 = [];
  }
  if (takenAsteroid > 1) {
    astList1 = asteroidMemory.slice(0, takenAsteroid - 1);
  }
  asteroidMemory = [];
  asteroidMemory = astList1.concat(astList2);
  astList1 = [];
  astList2 = [];
  currentAstNumber -= 1;
  takenAsteroid = 0;
  score += 5;

}

function wordChange(char) {
  if (takenAsteroid === 0) {
    for (var i = 0; i < asteroidMemory.length; i++) {
      if (char === asteroidMemory[i].astText[0].toLowerCase()) {
        score += 1;
        asteroidMemory[i].astColour = "orange";
        asteroidMemory[i].astText = asteroidMemory[i].astText.slice(1);
        takenAsteroid = i + 1;
      }
    }
  } else if (takenAsteroid > 0) {
    if (char === asteroidMemory[takenAsteroid - 1].astText[0].toLowerCase()) {
      asteroidMemory[takenAsteroid - 1].astText = asteroidMemory[takenAsteroid - 1].astText.slice(1);
      if (asteroidMemory[takenAsteroid - 1].astText.length === 0) {
        asteroidMemory[takenAsteroid - 1].astColour = "white";
        destroyAst();
        takenAsteroid = 0;
      }
    }
  }
}

document.addEventListener("keydown", keyPressed);

function keyPressed(event) {
  switch (event.key) {
    case "a":
      wordChange("a");
      break;
    case "b":
      wordChange("b");
      break;
    case "c":
      wordChange("c");
      break;
    case "d":
      wordChange("d");
      break;
    case "e":
      wordChange("e");
      break;
    case "f":
      wordChange("f");
      break;
    case "g":
      wordChange("g");
      break;
    case "h":
      wordChange("h")
      break;
    case "i":
      wordChange("i");
      break;
    case "j":
      wordChange("j");
      break;
    case "k":
      wordChange("k");
      break;
    case "l":
      wordChange("l");
      break;
    case "m":
      wordChange("m");
      break;
    case "n":
      wordChange("n");
      break;
    case "o":
      wordChange("o");
      break;
    case "p":
      wordChange("p");
      break;
    case "q":
      wordChange("q");
      break;
    case "r":
      wordChange("r");
      break;
    case "s":
      wordChange("s");
      break;
    case "t":
      wordChange("t");
      break;
    case "u":
      wordChange("u");
      break;
    case "v":
      wordChange("v");
      break;
    case "w":
      wordChange("w");
      break;
    case "x":
      wordChange("x");
      break;
    case "y":
      wordChange("y");
      break;
    case "z":
      wordChange("z");
      break;
    default:
      break;
  }
}

