const cross = document.querySelector('#cross')
const circle = document.querySelector('#circle')
const fields = document.querySelectorAll('.field')
const turn = document.querySelector('.turn')
const h3 = document.querySelector('h3')
const choice = document.querySelector('.choice')
const game = document.querySelector('.game')
const reset = document.querySelector('.reset')
const type = document.querySelector('.type')
const pvp = document.querySelector('#pvp')
const pve = document.querySelector('#pve')
let playerSign
let count = 0
let pcSign
let gameType

let array = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

pvp.addEventListener('click', () => {
    gameType = 'pvp'
    type.style.display = 'none'
    h3.style.display = 'block'
    choice.style.display = 'flex'
    game.style.display = 'flex'
})

pve.addEventListener('click', () => {
    gameType = 'pve'
    type.style.display = 'none'
    h3.style.display = 'block'
    choice.style.display = 'flex'
    game.style.display = 'flex'
})

cross.addEventListener('click', () => {

    startGame()
    h3.style.display = 'none'
    playerSign = 'X'
    pcSign = 'O'
    turn.style.display = 'flex'
    turn.innerHTML = `${playerSign} - turn`
    cross.disabled = true
    circle.disabled = true
    cross.classList.replace('cross', 'disabled')
    circle.classList.replace('circle', 'disabled')

})

circle.addEventListener('click', () => {

    startGame()
    playerSign = 'O'
    pcSign = 'X'
    turn.style.display = 'flex'
    turn.innerHTML = `${playerSign} - turn`
    cross.disabled = true
    circle.disabled = true
    cross.classList.replace('cross', 'disabled')
    circle.classList.replace('circle', 'disabled')

})

reset.addEventListener('click', () => {
    cross.disabled = false
    circle.disabled = false
    cross.classList.replace('disabled', 'cross')
    circle.classList.replace('disabled', 'circle')
    fields.forEach(element => {
        element.innerHTML = ''
        element.disabled = true
        element.style.color = '#fff'
        element.classList.toggle('disabled')
    })
    for (i = 0; i <= 2; i++) {
        for (j = 0; j <= 2; j++) {
            array[i][j] = 0
        }
    }
    reset.style.display = 'none'
    h3.style.display = 'block'
    turn.innerHTML = ''
    playerSign = ''
    count = 0
})

fields.forEach(function(el){
    el.addEventListener('click', () => {
        if(array[el.getAttribute('hpos')][el.getAttribute('vpos')] == 0) {
            playerSign == 'X' ? array[el.getAttribute('hpos')][el.getAttribute('vpos')] = 1 : array[el.getAttribute('hpos')][el.getAttribute('vpos')] = -1            
        }
            if(gameType == 'pvp') {
                el.innerHTML = playerSign
                playerSign == 'X' ? playerSign = 'O' : playerSign = 'X'
                turn.innerHTML = `${playerSign} - turn`
                count++
                checkWin(count)
            } else {
                el.innerHTML = playerSign
                turn.innerHTML = `${pcSign} - turn`
                count++                
                checkWin(count)
                step(pcSign)
                
            }
            // console.log(count)
    })
})

function startGame() {
    fields.forEach(function(element){
        element.classList.remove('disabled')
        element.disabled = false
})
    reset.style.display = 'none'
}

function checkWin(count) {
    
    if(count < 9) {
        if(array[0][0] == 1 && array[1][1] == 1 && array[2][2] == 1) {
            showWinner('X')
        }
        if(array[0][2] == 1 && array[1][1] == 1 && array[2][0] == 1) {
            showWinner('X')
        }
        if(array[0][0] == 1 && array[0][1] == 1 && array[0][2] == 1) {
            showWinner('X')
        }
        if(array[1][0] == 1 && array[1][1] == 1 && array[1][2] == 1) {
            showWinner('X')
        }
        if(array[2][0] == 1 && array[2][1] == 1 && array[2][2] == 1) {
            showWinner('X')
        }
        if(array[0][0] == 1 && array[1][0] == 1 && array[2][0] == 1) {
            showWinner('X')
        }
        if(array[0][1] == 1 && array[1][1] == 1 && array[2][1] == 1) {
            showWinner('X')
        }
        if(array[0][2] == 1 && array[1][2] == 1 && array[2][2] == 1) {
            showWinner('X')
        }
        if(array[0][0] == -1 && array[1][1] == -1 && array[2][2] == -1) {
            showWinner('O')
        }
        if(array[0][2] == -1 && array[1][1] == -1 && array[2][0] == -1) {
            showWinner('O')
        }
        if(array[0][0] == -1 && array[0][1] == -1 && array[0][2] == -1) {
            showWinner('O')
        }
        if(array[1][0] == -1 && array[1][1] == -1 && array[1][2] == -1) {
            showWinner('O')
        }
        if(array[2][0] == -1 && array[2][1] == -1 && array[2][2] == -1) {
            showWinner('O')
        }
        if(array[0][0] == -1 && array[1][0] == -1 && array[2][0] == -1) {
            showWinner('O')
        }
        if(array[0][1] == -1 && array[1][1] == -1 && array[2][1] == -1) {
            showWinner('O')
        }
        if(array[0][2] == -1 && array[1][2] == -1 && array[2][2] == -1) {
            showWinner('O')
        }
    } else if(count == 9) {

        let array_sum = [(array[0][0]+array[0][1]+array[0][2]), (array[1][0]+array[1][1]+array[1][2]),
        (array[2][0]+array[2][1]+array[2][2]), (array[0][0]+array[1][0]+array[2][0]),
        (array[0][1]+array[1][1]+array[2][1]), (array[0][2]+array[1][2]+array[2][2]),
        (array[0][0]+array[1][1]+array[2][2]), (array[0][2]+array[1][1]+array[2][0])]

        console.log(array_sum)

        if((array_sum.indexOf(3) > -1) || (array_sum.indexOf(-3) > -1)) {

            if((array[0][0]+array[0][1]+array[0][2]) == 3) {showWinner('X')}
            if((array[1][0]+array[1][1]+array[1][2]) == 3) {showWinner('X')}
            if((array[2][0]+array[2][1]+array[2][2]) == 3) {showWinner('X')}
            if((array[0][0]+array[1][0]+array[2][0]) == 3) {showWinner('X')}
            if((array[0][1]+array[1][1]+array[2][1]) == 3) {showWinner('X')}
            if((array[0][2]+array[1][2]+array[2][2]) == 3) {showWinner('X')}
            if((array[0][0]+array[1][1]+array[2][2]) == 3) {showWinner('X')}
            if((array[0][2]+array[1][1]+array[2][0]) == 3) {showWinner('X')}
            if((array[0][0]+array[0][1]+array[0][2]) == -3) {showWinner('O')}
            if((array[1][0]+array[1][1]+array[1][2]) == -3) {showWinner('O')}
            if((array[2][0]+array[2][1]+array[2][2]) == -3) {showWinner('O')}
            if((array[0][0]+array[1][0]+array[2][0]) == -3) {showWinner('O')}
            if((array[0][1]+array[1][1]+array[2][1]) == -3) {showWinner('O')}
            if((array[0][2]+array[1][2]+array[2][2]) == -3) {showWinner('O')}
            if((array[0][0]+array[1][1]+array[2][2]) == -3) {showWinner('O')}
            if((array[0][2]+array[1][1]+array[2][0]) == -3) {showWinner('O')}

        } else {

            showWinner('draw')

        }

    }
}

function showWinner(winner) {
    if (winner != 'draw') {
        turn.innerHTML = `${winner} - winner`
            fields.forEach(element => {
                element.innerHTML == `${winner}` ? element.style.color = '#0f0': element.style.color = '#f00'
                element.disabled = true
            })
        reset.style.display = 'inline'
    } 
    
    else {
        turn.innerHTML = `It's ${winner}`
        fields.forEach(element => {
            element.style.color = '#fff27a'
            element.disabled = true
        })
        reset.style.display = 'inline'
    }
}

function step(sign) {
    let freeFields = []
    fields.forEach(element => {
        if(element.innerHTML == '' && element.disabled != true) freeFields.push(element)
    })
    if(freeFields.length > 0) {
        let field = freeFields[getRandomInt(0, freeFields.length)]
        field.innerHTML = sign
        field.disabled = true
        sign == 'X' ? array[field.getAttribute('hpos')][field.getAttribute('vpos')] = 1 :array[field.getAttribute('hpos')][field.getAttribute('vpos')] = -1
        count++
        sign == 'X' ? turn.innerHTML = 'O - turn' : turn.innerHTML = 'X - turn'
        checkWin(count)
    } else {
        return
    }

}

function getRandomInt(max,min) {
   return Math.floor(Math.random() * (max - min + 1) + min)
}