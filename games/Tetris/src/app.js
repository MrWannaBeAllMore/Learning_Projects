document.addEventListener('DOMContentLoaded', () => {
const textStarting = document.querySelector('.start-text-container')
const game = document.querySelector('.game')
const scoreDisplay = document.querySelector('#score')
const startBtn = document.querySelector('#start-btn')
const startBtnGame = document.querySelector('#start-btn-game')
const restartBtn = document.querySelector('.restart')
const grid = document.querySelector('#grid')
const width = 10
const miniGrid = document.querySelector('.mini-grid')
let timerId
let score = 0

function startGame () {
    textStarting.classList.toggle('hidden')
    game.classList.toggle('hidden')
    startPause()
}
startBtnGame.addEventListener('click', startGame)


function genMiniGrid () {
    for (let a = 0; a < 16; a++) {
        const square2 = document.createElement('div')
        miniGrid.appendChild(square2)
    }
}
genMiniGrid()
const displaySquares = Array.from(document.querySelectorAll('.mini-grid div'))
const displayWidth = 4
let displayIndex = 0


function genGrid () {
    for (let i = 0; i < 210; i++) {
        if(i >= 200){
            const square = document.createElement('div')
            square.classList.add('taken')
            grid.appendChild(square)
        } else {
            const square = document.createElement('div')
            grid.appendChild(square)
        }
    }
}
genGrid()
let squares = Array.from(document.querySelectorAll('.grid div'))

//The tetriminoes
const lTetrimino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width*2, width*2+1, width*2+2, width]
]
const sTetrimino = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
]
const tTetrimino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
]
const oTetrimino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
]
const iTetrimino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
]
const zTetrimino = [
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2],
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2]
]

const theTetriminoes = [lTetrimino, sTetrimino, tTetrimino, oTetrimino, iTetrimino, zTetrimino]

const upNextTetriminoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], // L
    [displayWidth+1, displayWidth+2, displayWidth*2, displayWidth*2+1], //S
    [1, displayWidth, displayWidth+1, displayWidth+2], // T
    [0, 1, displayWidth, displayWidth+1], //O
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], //I
    [displayWidth, displayWidth+1, displayWidth*2+1, displayWidth*2+2], //Z
]

const colors = [
    'rgb(255, 0, 0)', //red
    'rgb(0, 255, 255)', //cyan
    'rgb(0, 255, 0)', //green
    'rgb(255, 0, 255)', //pink
    'rgb(255, 255, 0)', //Yellow
    'linear-gradient(140deg, rgb(13, 13, 218) 20%, rgb(0, 17, 255) 50%, rgb(13, 13, 218) 80%)'
]

console.log(colors)

let currentPosition = 3


//Random tetrimino
let random = Math.floor(Math.random()*theTetriminoes.length)
let nextRandom = Math.floor(Math.random()*theTetriminoes.length)
console.log(random)
let currentRotation = 0
let current = theTetriminoes[random][currentRotation]
console.log(current)




//draw tetrimino
function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetrimino')
        squares[currentPosition + index].style.background = colors[random]
    })
}



//undraw terimino
function unDraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetrimino')
        squares[currentPosition + index].style.background = ''
    })
}


//tetrimino movement 
/* timerId = setInterval(moveDown, 1000) */

function moveDown () {
    unDraw()
    currentPosition += width
    draw()
    freeze()
}

function moveLeft () {
    unDraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition +index].classList.contains('taken'))) {
        currentPosition +=1
    }
    draw()
}

function moveRight () {
    unDraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
    if(!isAtRightEdge) currentPosition +=1
    if(current.some(index => squares[currentPosition +index].classList.contains('taken'))) {
        currentPosition -=1
    }
    draw()
}

function  rotate () {
    unDraw()
    currentRotation ++
    if(currentRotation === current.length) {
        currentRotation = 0
    }
    current = theTetriminoes[random][currentRotation]
    draw()
}

function control (e) {
    if (e.keyCode === 37) {
        moveLeft()
    } else if (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode === 38) {
        rotate()
    } else if (e.key === 'ArrowDown') {
        moveDown()
    }
}

function masterControl (e) {
    if (e.keyCode === 80) {
        startPause()
    } else if (e.key === 'r') {
        restart()
    }
}

document.addEventListener('keydown', control)
document.addEventListener('keydown', masterControl)

// stop tetriminoes at the bottom
function freeze () {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        random = nextRandom
        current = theTetriminoes[random][currentRotation]
        currentPosition = 4
        setTimeout(draw, 100)
        nextRandom = Math.floor(Math.random()*theTetriminoes.length)
        displayShape() 
        addScore()
        /* levelUp() */
        gameOver()
    }
}


// Next up tetrimino display
function displayShape() {
    displaySquares.forEach(square => {
        square.classList.remove('tetrimino')
        square.style.background =''
    })
    upNextTetriminoes[nextRandom].forEach (index => {
        displaySquares[displayIndex + index].classList.add('tetrimino')
        displaySquares[displayIndex + index].style.background = colors[nextRandom]
    })
}


// Start and pause function
function startPause () {
    if (timerId) {
        clearInterval(timerId)
        timerId = null
        document.removeEventListener('keydown', control)
     } else {
        draw()
        document.addEventListener('keydown', control)
        timerId = setInterval(moveDown, 1000)
        displayShape()
     }
}
startBtn.addEventListener('click', startPause)

// Add score
function addScore () {
    for(let b = 0; b < 199; b += width) {
        const row = [b, b+1, b+2, b+3, b+4, b+5, b+6, b+7, b+8, b+9]
        if(row.every(index => squares[index].classList.contains('taken'))) {
            score += 10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetrimino')
                squares[index].style.background = ''
            })
            const squaresRemoved = squares.splice(b, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }  
}

// Game over
function gameOver () {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        alert('Game over')
        document.removeEventListener('keydown', control)
        clearInterval(timerId)
    }
}

// Restart the game
function restart () {
    score = 0
    scoreDisplay.innerHTML = score
    clearInterval(timerId)
    unDraw()
    for (c = 0; c < 200; c++) {
        squares[c].removeAttribute('class')
        squares[c].style.background = ''
    }
    random = Math.floor(Math.random()*theTetriminoes.length)
    current = theTetriminoes[random][currentRotation]
    currentPosition = 3
    draw()
    nextRandom = Math.floor(Math.random()*theTetriminoes.length)
    displayShape()
    timerId = setInterval(moveDown, 1000)
    document.addEventListener('keydown', control)
}
restartBtn.addEventListener('click', restart)

// Next level
function levelUp () {
    if (score >= 240) {
        clearInterval(timerId)
        timerId = setInterval(moveDown, 400)
    } else if (score >= 160) {
        clearInterval(timerId)
        timerId = setInterval(moveDown, 600)
    } else if (score >= 80) {
        clearInterval(timerId)
        timerId = setInterval(moveDown, 800)
    }
}


})