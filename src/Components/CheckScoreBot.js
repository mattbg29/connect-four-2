import tokenOpen from '../Assets/tokenOpen.png'

export function checkScoreBot(row, col, grid, target) {
    //check row for win
    let scoreOverall = 0;
    let score = 0
    let blanks = 0
    for (let i = col+1; i < 7; i++) {
        const checkNow = grid[row*7+i].value
        if (checkNow === target) {
            score++
        } else if (checkNow === tokenOpen) {
            blanks++
        } else {
            break
        }
    }
    for (let i = col-1; i>=0; i--) {
        const checkNow = grid[row*7+i].value
        if (checkNow === target) {
            score++
        } else if (checkNow === tokenOpen) {
            blanks++
        } else {
            break
        }
    }
    if ((score + blanks) > 3) {
        scoreOverall += score 
        if (score >= 4) {
            scoreOverall += 100
        }
    }
        
    //check col for win
    score = 0
    blanks = 0
    for (let i = row+1; i < 6; i++) {
        const checkNow = grid[i*7+col].value
        if (checkNow === target) {
            score++
        } else if (checkNow === tokenOpen) {
            blanks++
        } else {
            break
        }
    }
    for (let i = row-1; i>=0; i--) {
        const checkNow = grid[i*7+col].value
        if (checkNow === target) {
            score++
        } else if (checkNow === tokenOpen) {
            blanks++
        } else {
            break
        }
    }
    if ((score + blanks) > 3) {
        scoreOverall += score * 8
        if (score >= 4) {
            scoreOverall += 100
        }
    }
    // check right diag for win
    score = 0
    blanks = 0
    for (let i = row+1; i < 6; i++) {
        for (let j = col+1; j < 7; j++) {
            if (grid[i*7+j].value === target) {
                score++
                i++
                if (i > 5) {
                    break
                }
            } else if (grid[i*7+j].value === tokenOpen) {
                blanks++
                i++
                if (i > 5) {
                    break
                }
            } else {
                break
            }
        }
        break
    }

    for (let i = row-1; i >=0; i--) {
        for (let j = col-1; j >= 0; j--) {
            if (grid[i*7+j].value === target) {
                score++
                i--
                if (i < 0) {
                    break
                }
            } else if (grid[i*7+j].value === tokenOpen) {
                blanks++
                i--
                if (i < 0) {
                    break
                }
            } else {
                break
            }
        }
        break
    }

    if ((score + blanks) > 3) {
        scoreOverall += score * 8
        if (score >= 4) {
            scoreOverall += 100
        }
    }
    // check left diag for win
    score = 0
    blanks = 0
    for (let i = row+1; i < 6; i++) {
        for (let j = col-1; j >= 0; j--) {
            if (grid[i*7+j].value === target) {
                score++
                i++
                if (i > 5) {
                    break
                }
            } else if (grid[i*7+j].value === tokenOpen) {
                blanks++
                i++
                if (i > 5) {
                    break
                }
            } else {
                break
            }
        }
        break
    }

    for (let i = row-1; i >=0; i--) {
        for (let j = col+1; j < 7; j++) {
            if (grid[i*7+j].value === target) {
                score++
                i--
                if (i < 0) {
                    break
                }
            } else if (grid[i*7+j].value === tokenOpen) {
                blanks++
                i--
                if (i < 0) {
                    break
                }
            } else {
                break
            }
        }
        break
    }

    if ((score + blanks) > 3) {
        scoreOverall += score * 8
    }
    return scoreOverall
        
}
