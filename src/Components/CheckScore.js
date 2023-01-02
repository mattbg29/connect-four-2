export function checkScore(row, col, grid, target) {
    //check row for win
    let score = 1
    for (let i = col+1; i < 7; i++) {
        if (grid[row*7+i].value === target) {
            score++
        } else {
            break
        }
    }
    for (let i = col-1; i>=0; i--) {
        if (grid[row*7+i].value === target) {
            score++
        } else {
            break
        }
    }
    if (score === 4) {
        return 1
        
    } 
    //check col for win
    score = 1
    for (let i = row+1; i < 6; i++) {
        if (grid[i*7+col].value === target) {
            score++
        } else {
            break
        }
    }
    for (let i = row-1; i>=0; i--) {
        if (grid[i*7+col].value === target) {
            score++
        } else {
            break
        }
    }
    if (score === 4) {
        return 1
        
    } 
    // check right diag for win
    score = 1
    let rowNow = row + 1
    if (rowNow <= 5) {
        for (let j = col+1; j < 7; j++) {
            if (grid[rowNow*7+j].value === target) {
                score++
                rowNow++
                if (rowNow > 5) {
                    break
                }
            } else {
                break
            }
        }    
    }

    rowNow = row - 1
    if (rowNow >= 0) {
        for (let j = col-1; j >=0; j--) {
            if (grid[rowNow*7+j].value === target) {
                score++
                rowNow--
                if (rowNow < 0) {
                    break
                }
            } else {
                break
            }
        }
    }
    if (score === 4) {
        return 1        
    } 

    // check left diag for win
    score = 1
    rowNow = row + 1
    if (rowNow <= 5) {
        for (let j = col-1; j >= 0; j--) {
            if (grid[rowNow*7+j].value === target) {
                score++
                rowNow++
                if (rowNow > 5) {
                    break
                }
            } else {
                break
            }
        }
    }
    rowNow = row - 1
    if (rowNow >= 0) {
            for (let j = col+1; j <7; j++) {
            if (grid[rowNow*7+j].value === target) {
                score++
                rowNow--
                if (rowNow < 0) {
                    break
                }
            } else {
                break
            }
        }
    }
    if (score === 4) {
        return 1       
    } 
return 0
}