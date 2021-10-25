import figures from "./figures.js";

const grid = document.createElement('div');
document.body.prepend(grid);
grid.classList.add('grid');

const width = 8;
const squares = [];
let i = 0;
let score = 0;

function createBoard() {
    for (i = 0; i < width*width; i++) {
        const square = document.createElement('div');
        square.setAttribute('draggable', true);
        square.setAttribute('id', i);
        let randomFigure = Math.floor(Math.random() * figures.length);
        square.style.backgroundColor = figures[randomFigure];
        grid.appendChild(square);
        squares.push(square);
    }
}

createBoard();

let colorBeingDragged = null;
let colorBeingReplaced = null;
let squareIdBeingDragged = null;
let squareIdBeingReplaced = null;

squares.forEach((square) => square.addEventListener('dragstart', dragStart));
squares.forEach((square) => square.addEventListener('dragend', dragEnd));
squares.forEach((square) => square.addEventListener('dragover', dragOver));
squares.forEach((square) => square.addEventListener('dragenter', dragEnter));
squares.forEach((square) => square.addEventListener('dragleave', dragLeave));
squares.forEach((square) => square.addEventListener('drop', dragDrop));

function dragStart() {
    colorBeingDragged = this.style.backgroundColor;
    squareIdBeingDragged = parseInt(this.id);
    console.log(this.id, 'dragstart');
} 

function dragOver(e) { 
    e.preventDefault();
    console.log(this.id, 'dragover');
}

function dragEnter(e) {
    e.preventDefault();  
    console.log(this.id, 'dragenter');
}

function dragLeave() {
    console.log(this.id, 'dragleave');
}

function dragDrop() {
    console.log(this.id, 'dragdrop');
    colorBeingReplaced = this.style.backgroundColor;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundColor = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
}

function dragEnd() {
    let validMoves = [
        squareIdBeingDragged - 1, 
        squareIdBeingDragged - width,
        squareIdBeingDragged + 1,
        squareIdBeingDragged + width,
    ]
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    } else {
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
    }
    console.log(this.id, 'dragend');
}

function checkRowForThree() {
    for (i = 0; i < 61; i++) {
        let rowOfThree = [i, i+1, i+2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        if (rowOfThree.every((index) => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            rowOfThree.forEach((index) => {
                squares[index].style.backgroundColor = '' 
        })
        }   
    }
}
checkRowForThree();

function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
        let columnOfThree = [i, i+width, i+width*2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
        if (notValid.includes(i)) continue;

        if (columnOfThree.every((index) => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            columnOfThree.forEach((index) => {
                squares[index].style.backgroundColor = '' 
        })
        }   
    }
}
checkColumnForThree();

function checkRowForThree() {
    for (i = 0; i < 61; i++) {
        let rowOfThree = [i, i+1, i+2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        if (rowOfThree.every((index) => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            rowOfThree.forEach((index) => {
                squares[index].style.backgroundColor = '' 
        })
        }   
    }
}
checkRowForThree();

function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
        let columnOfThree = [i, i+width, i+width*2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
        if (notValid.includes(i)) continue;

        if (columnOfThree.every((index) => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            columnOfThree.forEach((index) => {
                squares[index].style.backgroundColor = '' 
        })
        }   
    }
}
checkColumnForThree();

window.setInterval(function(){
    checkRowForThree();
    checkColumnForThree();
}, 100)