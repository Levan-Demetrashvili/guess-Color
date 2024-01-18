const header = document.querySelector('header');
const btnReset = document.querySelector('.reset-btn');
const message = document.getElementById('message');
const btnEasy = document.querySelector('.easy');
const btnHard = document.querySelector('.hard');
const correctColor = document.getElementById('correct-color');
const squares = document.querySelectorAll('.color');

//* Starting conditions
let randomNumber;

function reset() {
  btnReset.textContent = 'new colors';
  message.textContent = '';
  header.style.backgroundColor = '#2c8e99';
  correctColor.textContent = squares[randomNumber].style.backgroundColor.toUpperCase();
}
//* Generate new colors
function generateRandomColors(start, end) {
  for (let i = start; i < end; i++) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    squares[i].style.backgroundColor = '#' + randomColor;
  }
  randomNumber = Math.trunc(Math.random() * (end - start));
  reset();
}

//* if correct square add correct color
function setSquareColors(start, end) {
  for (let i = start; i < end; i++) {
    squares[i].style.backgroundColor = correctColor.textContent;
  }
}

//* Buttons behaviour
function updateDifficulty(btnActive, btnPassive, numSquares) {
  if (!btnActive.classList.contains('btn--active')) {
    btnActive.classList.add('btn--active');
    btnPassive.classList.remove('btn--active');

    generateRandomColors(0, numSquares);

    for (let i = numSquares; i < squares.length; i++) {
      squares[i].style.backgroundColor = 'transparent';
    }
  }
}

//* init
generateRandomColors(0, squares.length);

btnReset.addEventListener('click', function () {
  btnEasy.classList.contains('btn--active') ? generateRandomColors(0, 3) : generateRandomColors(0, squares.length);
});

for (let square of squares) {
  square.addEventListener('click', function () {
    if (square.style.backgroundColor === correctColor.textContent.toLowerCase()) {
      //* if selectes square = h1 Element text content
      header.style.backgroundColor = square.style.backgroundColor;
      message.textContent = 'correct';
      btnReset.textContent = 'play again';
      btnEasy.classList.contains('btn--active') ? setSquareColors(0, 3) : setSquareColors(0, squares.length);
    } else {
      square.style.backgroundColor = 'transparent';
      message.textContent ||= message.textContent = 'try again';
    }
  });
}

//* Difficulty
btnEasy.addEventListener('click', updateDifficulty.bind('_', btnEasy, btnHard, 3));
btnHard.addEventListener('click', updateDifficulty.bind('_', btnHard, btnEasy, 6));
