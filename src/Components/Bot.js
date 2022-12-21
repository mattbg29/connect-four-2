import tokenOpen from '../Assets/tokenOpen.png'
import tokenRed from '../Assets/tokenRed.png'
import tokenYellow from '../Assets/tokenYellow.png'
import { checkScoreBot } from "./CheckScoreBot.js"
import { checkScore } from "./CheckScore.js"

//Bot currently has the following poor judgement: 
// It doesn't account enough for if it's own move gives the other player a win on their next move
// It doesn't account for if there are empty holes betw pieces in a row
// It double counts the value when two different paths lead to the same winning move
// That being said, the goal is not to have an all-perfect bot. This is more of an 
// intermediate bot. So perhaps these issues are ok to leave.

export function startBot(playerNow, gridNew) {
    const otherPlayer = playerNow === tokenRed ? tokenYellow : tokenRed
    let topMove = 0
    let topScore = -9999999
    let score = 0
    for (let colNow = 0; colNow < 7; colNow++) {
        for (let rowCheck = 5; rowCheck > 0; rowCheck--) {
            if (gridNew[rowCheck*7+colNow].value === tokenOpen) {
                if (checkScore(rowCheck, colNow, gridNew, playerNow) !== 0 || checkScore(rowCheck, colNow, gridNew, otherPlayer) !== 0) {
                    return colNow
                }
                gridNew[rowCheck*7+colNow].value = playerNow
                score = playBot(otherPlayer, 1, gridNew)
                gridNew[rowCheck*7+colNow].value = tokenOpen
                if (score > topScore) {
                    topMove = colNow
                    topScore = score
                }
                break
            }
        }
    }
    return topMove
}

export function playBot(playerNow, moveNow, gridNew) {
    const otherPlayer = playerNow === tokenRed ? tokenYellow : tokenRed
    let score = 0
    
    if (moveNow === 2) {
        let scoreNow = 0
        for (let colNow = 0; colNow < 7; colNow++) {
            for (let rowNow = 0; rowNow < 6; rowNow++) {
                if (gridNew[rowNow*7+colNow].value === playerNow) {
                    scoreNow = scoreNow + checkScoreBot(rowNow, colNow, gridNew, playerNow) 
                } else if (gridNew[rowNow*7+colNow].value === otherPlayer) {
                    scoreNow = scoreNow - checkScoreBot(rowNow, colNow, gridNew, otherPlayer) 
                }
            }
        }
        return scoreNow
    } else {
        for (let colNow = 0; colNow < 7; colNow++) {
            for (let rowCheck = 5; rowCheck > 0; rowCheck--) {
                if (gridNew[rowCheck*7+colNow].value === tokenOpen) {
                    gridNew[rowCheck*7+colNow].value = playerNow
                    moveNow = moveNow+1
                    score = score + playBot(otherPlayer, moveNow, gridNew)
                    moveNow = moveNow - 1
                    gridNew[rowCheck*7+colNow].value = tokenOpen
                    break
                }
            }
        }
        return score
    }
}

