import { useState, useEffect, useContext } from "react"
import tokenOpen from '../Assets/tokenOpen.png'
import tokenRed from '../Assets/tokenRed.png'
import tokenYellow from '../Assets/tokenYellow.png'
import tokenRedIcon from '../Assets/tokenRedIcon.png'
import tokenYellowIcon from '../Assets/tokenYellowIcon.png'
import { checkScore } from "./CheckScore"
import { startBot } from "./Bot"
import { updateScore, getScore } from './WriteScore';
import { UserContext } from "./SignUp";

// need to rearrange assets into different folders
// should add more to the game board outline
// need to add bot comments
// need to make it so user/bot score increments at end of game, not on 'new game' click
// need to hide user and bot scores when user is not logged in

// For filling the grid initially with empty tokens

export function Game() {
    const [grid, setGrid] = useState([])
    const [curPlayer, setCurPlayer] = useState("Red")
    const [invalid, setInvalid] = useState(false)
    const [winner, setWinner] = useState(0)
    const [curOpponent, setCurOpponent] = useState('Bot')
    const [scores, setScores] = useState({Red: 0, Yellow: 0})
    const [tieGame, setTieGame] = useState(0)
    const [userData, setUserData] = useState(false)
    const { user } = useContext(UserContext)
    

    // Fills the grid upon loading
    useEffect(() => {
        fillGrid()
        newGame()
    }, [user])

    function fillGrid() {
        
        let k = 0
        const newGrid = []
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                let gameToken = {
                    row: i,
                    col: j,
                    key: k++,
                    value: tokenOpen
                }
                newGrid.push(gameToken)
            }
        }
        setGrid([...newGrid])
    }

    // For selecting betw player choices; this might be unecessary
    const playerChoice ={
        Red: tokenRed,
        Yellow: tokenYellow
    }

    async function getUserData() {
        if (user.name !== '') {
            const userData = await getScore(user.name)
            setUserData(userData)
        } else {
            setUserData(false)
            console.log('set false')
        }

    }

    // When the player or bot clicks (player as represented by realPlayer === 1)
    const playerClicks = (row, col, playerNow, realPlayer) => {

        // check if the selected spot is open
        if (row === 5 || grid[(((row+1)*7)+col)].value !== tokenOpen) {

            // check if the selected spot is a win
            const winnerNow = checkScore(row, col, grid, playerChoice[playerNow])
            setWinner(winnerNow)
            if (winnerNow === 1) {
                if(user.name !== '') {
                    updateScore(user.name, realPlayer, 1-realPlayer)
                    const dataUpdate = {score: userData.score + realPlayer, botScore: userData.botScore + 1 - realPlayer}
                    setUserData(dataUpdate)
                }
                realPlayer = 0    
                setWinner(playerNow)
                setScores({...scores, [playerNow]: scores[playerNow]+1})
            }
            setGrid([...grid], grid[(row*7)+(col)].value = playerChoice[playerNow])
            setInvalid(false)
            setCurPlayer(playerNow === "Red" ? "Yellow" : "Red")

            if(grid.filter(token => token.value === tokenOpen).length === 0) {
                setTieGame(1)
                realPlayer = 0
            }


            // If next player is the bot, call startBot and retrieve the chosen column, 
            // then call playerClicks with the bot's choice and have the human go next by
            // setting realPlayer to 0
            if (curOpponent === 'Bot' && realPlayer === 1) {
                const colNow = startBot(playerChoice[playerNow === "Red" ? "Yellow" : "Red"], structuredClone(grid)) // need to clone the grid, else, the bot's first round of trials will alter tha board
                for (let rowNow = 5; rowNow > 0; rowNow--) {
                    if (grid[rowNow*7+colNow].value === tokenOpen) {
                        setTimeout(() => playerClicks(rowNow, colNow, playerNow === "Red" ? "Yellow" : "Red", 0), 500)
                        break
                    }
                }
            }
        } else {
            setInvalid(true)
        }
    }


    const newGame = () => {
        setWinner(0)
        setTieGame(0)
        fillGrid()
        getUserData()
    }

    return(
        <div style = {{flexDirection: 'row'}}>
            <div style={{textAlign: 'center'}}>Red: {scores['Red']} Yellow: {scores['Yellow']}</div>
            <ShowVisualGrid2 grid={grid} tokenOpen={tokenOpen} playerClicks={playerClicks} winner={winner} curPlayer={curPlayer} />
            <div><button style={{marginTop: 10, width: 210}} onClick={() => newGame()}>New Game</button></div>
            <div><button style={{marginTop: 10, width: 210}} onClick={() => setCurOpponent(curOpponent === 'Bot' ? 'Human' : 'Bot')}>Current Opponent: {curOpponent}</button></div>
            <div style={{paddingTop: 10, textAlign: 'center'}}>
                {curPlayer != 0 && <div style={{display: 'flex', justifyContent: 'center'}}> Current player: <img style={{marginLeft: 20, marginTop: 2}} className="tokenSmall" src={curPlayer === "Red" ? tokenRedIcon : tokenYellowIcon}/></div>}
                {invalid && <div> Invalid move</div>}
                {winner !== 0 && <div>{winner} wins!</div>}
                {tieGame !== 0 && <div>Tie game!</div>}
                {user.name !== '' && <div>User Score: {userData.score}</div>}
                {user.name !== '' && <div>Bot Score: {userData.botScore}</div>}
                
            </div>
        </div>
    )
}

    // Build the board with the selected tokens and functionality for future selects
function ShowVisualGrid2(props) {
    const newVisual = []
    let k = 0
    for (let i = 0; i < 6; i++) {
        const rowNow = props.grid.filter(token => token.row === i) 
        newVisual.push(
            <div key={i} style={{display: 'flex'}}>
                {rowNow.map(token => <img style={{cursor: 'pointer'}} 
                onClick={() => token.value === props.tokenOpen && props.winner === 0 ? props.playerClicks(token.row, token.col, props.curPlayer, 1) : ""} 
                className="token" key={k++} src={token.value}/>)}
            </div>)
    }
    return (
        newVisual
    )
}

  