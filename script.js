console.log("Welcome to Tic Tac Toe!");
let music = new Audio("music.mp3");
let audioturn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
}
// check win
const checkwin = () => {
  let boxtexts = document.getElementsByClassName('boxtext');
  let wins = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8],  
    [2, 4, 6]  
  ];
  wins.forEach((e, index) => {
    if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) &&
      (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) &&
      (boxtexts[e[0]].innerText !== '')) {
      document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won";
      gameover.play();
      isgameover = true;
      document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
      const line = document.querySelector(".line");
      const board = document.querySelector(".container");
      const w = board.offsetWidth;
      const h = board.offsetHeight;
      let startX, startY, length, angle;
      const gapW = w * 0.1;
      const gapH = h * 0.1;
      const diagLength = Math.sqrt(w * w + h * h) * 0.8;
      switch (index) {
        case 0: startX = gapW; startY = h / 6; length = w * 0.8; angle = 0; break;  
        case 1: startX = gapW; startY = h / 2; length = w * 0.8; angle = 0; break; 
        case 2: startX = gapW; startY = 5 * h / 6; length = w * 0.8; angle = 0; break;  

        case 3: startX = w / 6; startY = gapH; length = h * 0.8; angle = 90; break; 
        case 4: startX = w / 2; startY = gapH; length = h * 0.8; angle = 90; break;
        case 5: startX = 5 * w / 6; startY = gapH; length = h * 0.8; angle = 90; break;

        case 6: startX = gapW; startY = gapH; length = diagLength; angle = Math.atan2(h, w) * (180 / Math.PI); break; 
        case 7: startX = gapW; startY = h - gapH; length = diagLength; angle = Math.atan2(-h, w) * (180 / Math.PI); break; 
      }

      line.style.width = `${length}px`;
      line.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg)`;
      line.style.opacity = "1";
    }
  })
}

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
  let boxtext = element.querySelector('.boxtext');
  element.addEventListener('click', (e) => {
    if (boxtext.innerText === '') {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioturn.play();
      checkwin();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText = "Turn for: " + turn;
      }
    }
  })
})

// Reset button logic
reset.addEventListener('click', () => {
  let boxtexts = document.querySelectorAll('.boxtext');
  Array.from(boxtexts).forEach(element => {
    element.innerText = ""
  });

  turn = "X";
  isgameover = false;
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";

  // Reset line styles safely
  const line = document.querySelector(".line");
  line.style.width = "0px";
  line.style.opacity = "0";
  line.style.transform = "translate(0,0) rotate(0deg)";
})