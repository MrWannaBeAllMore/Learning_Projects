document.addEventListener('DOMContentLoaded', () => {
    const start = document.querySelector('#start-btn')
    const textStarting = document.querySelector('.start-text-container')
    const game = document.querySelector('.game')
    const restartBtn = document.querySelector('.restart')
    

    function startGame () {
        textStarting.classList.toggle('hidden')
        game.classList.toggle('hidden')
        createBoard()
    }
    
    start.addEventListener('click', startGame)
    
    
    
    
    // card options
    const cardArray = [
        {
            name: 'Emperor',
            img: 'src/images/Emperor.jpg',
        },
        {
            name: 'Strength',
            img: 'src/images/Strength.webp',
        },
        {
            name: 'theFool',
            img: 'src/images/theFool.jpg',
        },
        {
            name: 'theMoon',
            img: 'src/images/theMoon.jpeg',
        },
        {
            name: 'theStars',
            img: 'src/images/theStars.jpg',
        },
        {
            name: 'theWorld',
            img: 'src/images/theWorld.jpg',
        },
        {
            name: 'Emperor',
            img: 'src/images/Emperor.jpg',
        },
        {
            name: 'Strength',
            img: 'src/images/Strength.webp',
        },
        {
            name: 'theFool',
            img: 'src/images/theFool.jpg',
        },
        {
            name: 'theMoon',
            img: 'src/images/theMoon.jpeg',
        },
        {
            name: 'theStars',
            img: 'src/images/theStars.jpg',
        },
        {
            name: 'theWorld',
            img: 'src/images/theWorld.jpg',
        },
    ] 
    cardArray.sort(() => 0.5 - Math.random())


    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []
    let cardsChosenIds = []
    let cardsWon = []

    function createBoard() {
        for(let i = 0; i < cardArray.length; i++){
            const card = document.createElement('img')
            card.setAttribute('src', 'src/images/tarotBack.jpg')
            card.setAttribute('data-id', i)
            card.setAttribute('style', 'width: 100%;')
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    

    function flipCard() {
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenIds.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 600)
        }
    }

    
    

    function checkForMatch() {
        const cards = document.querySelectorAll('img')
        const optionOne = cardsChosenIds[0]
        const optionTwo = cardsChosenIds[1]


        if (cardsChosenIds[0] == cardsChosenIds[1]) {
            cards[optionOne].setAttribute('src', 'src/images/tarotBack.jpg')
            cards[optionTwo].setAttribute('src', 'src/images/tarotBack.jpg')
        } else if (cardsChosen[0]=== cardsChosen[1]) {
            /* cards[optionOne].setAttribute('src', 'src/images/rockElement.png')
            cards[optionTwo].setAttribute('src', 'src/images/rockElement.png') */
            cards[optionOne].removeEventListener('click', flipCard)
            cards[optionTwo].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOne].setAttribute('src', 'src/images/tarotBack.jpg')
            cards[optionTwo].setAttribute('src', 'src/images/tarotBack.jpg')
        }
        cardsChosen = []
        cardsChosenIds = []
        resultDisplay.textContent = cardsWon.length
        if(cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = "Congratz You have won!!!"
        }
    }

    //Restart button

function restart () {
    const cards = document.querySelectorAll('img')
    resultDisplay.textContent = ''
    cardsWon = []
    cards.forEach(card => card.remove())
    cardArray.sort(() => 0.5 - Math.random())
    createBoard()
}
restartBtn.addEventListener('click', restart)


    
    
   
    






})