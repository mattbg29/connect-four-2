import { useState, useEffect, useContext } from "react"
import tokenOpen from '../Assets/tokenOpen.png'
import tokenRed from '../Assets/tokenRed.png'
import tokenYellow from '../Assets/tokenYellow.png'
import tokenRedIcon from '../Assets/tokenRedIcon.png'
import tokenYellowIcon from '../Assets/tokenYellowIcon.png'
import { checkScore } from "./CheckScore"
import { startBot } from "./Bot"
import { updateScore, getScore, notifyUser, updateGrid, getGrid } from './WriteScore';
import { UserContext } from "./SignUp";

// need to rearrange assets into different folders
// should add more to the game board outline
// need to add bot comments
// need to make it so user/bot score increments at end of game, not on 'new game' click
// need to hide user and bot scores when user is not logged in

// For filling the grid initially with empty tokens

function fillGrid({setGrid}) {
        
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
    return (
        setGrid([...newGrid])
    )
}

export function Game() {
    const [grid, setGrid] = useState([])
    const [curPlayer, setCurPlayer] = useState("Red")
    const [invalid, setInvalid] = useState(false)
    const [winner, setWinner] = useState(0)
    const [curOpponent, setCurOpponent] = useState('Bot')
    const [scores, setScores] = useState({Red: 0, Yellow: 0})
    const [tieGame, setTieGame] = useState(0)
    const [userData, setUserData] = useState(false)
    const [botDeciding, setBotDeciding] = useState(false)
    const { user, token, loggedIn } = useContext(UserContext)
    const [lastMove, setlastMove] = useState(1)
    

    // Fills the grid upon loading
    useEffect(() => {
        fillGrid({setGrid})
        getUserData()
    }, [user])

    // For selecting betw player choices
    const playerChoice ={
        Red: tokenRed,
        Yellow: tokenYellow
    }

    async function getUserData() {
        if (user.name !== '') {
            const userData = await getScore(token)
            console.log(userData)
            setUserData(userData)
            return userData
        } else {
            setUserData(false)
        }
    }

    async function multiplayerMove() {
        console.log('here')
        const userNow = await getScore(token)
        //getGrid(token)
        //console.log(userData)
        //console.log(lastMove['row']+":"+lastMove['col'])
        //console.log(userData.grid['row']+":"+userData.grid['col'])
        if (userNow.grid['row'] !== lastMove['row'] || userNow.grid['col'] !== lastMove['col']) {
            setBotDeciding(false)         
            playerClicks(userNow.grid['row'], userNow.grid['col'], curPlayer, 0)         
        }
    }

    // When the player or bot clicks (player as represented by realPlayer === 1)
    async function playerClicks(row, col, playerNow, realPlayer) {

        // check if the selected spot is open
        if (row === 5 || grid[(((row+1)*7)+col)].value !== tokenOpen) {

            // check if the selected spot is a win
            const winnerNow = checkScore(row, col, grid, playerChoice[playerNow])
            setWinner(winnerNow)
            if (winnerNow === 1) {
                if(user.name !== '') {
                    updateScore(userData.userScore + realPlayer,userData.botScore+ 1-realPlayer, token)
                    const dataUpdate = {userScore: userData.userScore + realPlayer, botScore: userData.botScore + 1 - realPlayer}
                    //console.log(dataUpdate)
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

            if (curOpponent === 'Multiplayer' && realPlayer === 1) {
                //console.log('heeee')
                setBotDeciding(true)
                let sendMove = {
                    'row': row,
                    'col': col,
                }
                setlastMove(sendMove)
                //console.log(userData.notify)
                const hihi = await getUserData()
                console.log(userData)
                updateGrid(token, userData.notify, sendMove)                
            }

            // If next player is the bot, call startBot and retrieve the chosen column, 
            // then call playerClicks with the bot's choice and have the human go next by
            // setting realPlayer to 0
            if (curOpponent === 'Bot' && realPlayer === 1) {
                setBotDeciding(true)
                const colNow = startBot(playerChoice[playerNow === "Red" ? "Yellow" : "Red"], structuredClone(grid)) // need to clone the grid, else, the bot's first round of trials will alter the board
                for (let rowNow = 5; rowNow > 0; rowNow--) {
                    if (grid[rowNow*7+colNow].value === tokenOpen) {
                        setTimeout(() => playerClicks(rowNow, colNow, playerNow === "Red" ? "Yellow" : "Red", 0), 500)
                        setTimeout(() => setBotDeciding(false), 500)
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
        fillGrid({setGrid})
        getUserData()
    }

    return(
        <div style = {{paddingBottom: 20}}>
            {user.name !== '' && <div style={{paddingBottom: 10}}>Welcome {userData.email}</div>}
            <div style={{textAlign: 'center'}}>Red: {scores['Red']} Yellow: {scores['Yellow']}</div>
            <ShowVisualGrid2 grid={grid} tokenOpen={tokenOpen} playerClicks={playerClicks} winner={winner} curPlayer={curPlayer} botDeciding={botDeciding} />
            <div><button style={{marginTop: 10, width: 210}} onClick={() => newGame()}>New Game</button></div>
            <div><button style={{marginTop: 10, width: 210}} onClick={() => setCurOpponent(curOpponent === 'Bot' ? 'Human' : 'Bot')}>Current Opponent: {curOpponent}</button></div>
            {curOpponent === 'Multiplayer' && <div><button style={{marginTop: 10, width: 210}} onClick={()=> multiplayerMove()}>Get Opponent's Move</button></div>}
            <div style={{paddingTop: 10, textAlign: 'center'}}>
                {curPlayer != 0 && <div style={{display: 'flex', justifyContent: 'center'}}> Current player: <img style={{marginLeft: 20, marginTop: 2}} className="tokenSmall" src={curPlayer === "Red" ? tokenRedIcon : tokenYellowIcon}/></div>}
                {invalid && <div> Invalid move</div>}
                {winner !== 0 && <div>{winner} wins!</div>}
                {tieGame !== 0 && <div>Tie game!</div>}
                {user.name !== '' && <div>User Score: {userData.userScore}</div>}
                {user.name !== '' && <div style={{}}>Bot Score: {userData.botScore}</div>}
                {userData.notify && <GoMultiplayer opponent={userData.notify} setCurOpponent={setCurOpponent} newGame={newGame} setBotDeciding={setBotDeciding} />}
                {user.name !== '' && <ShowloggedIn token={token} user={user} loggedIn={loggedIn} setCurOpponent={setCurOpponent} getUserData={getUserData} userData={userData} />}
                {curOpponent === 'Multiplayer' && <div><button onClick={()=> multiplayerMove()}>Get Opponent's Move</button></div>}
                
            </div>
        </div>
    )
}

function GoMultiplayer(props) {
    function handleMultiplayer() {
        props.setCurOpponent('Multiplayer')
        props.setBotDeciding(true)
        props.newGame()
    }

    return (
        <div style={{padding: 20}}>
            <button style={{marginRight: 5}} onClick={() => handleMultiplayer()}>Play</button>
            {props.opponent} wants to play
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
            <div key={i} style={{display: 'flex', justifyContent: 'center'}}>
                {rowNow.map(token => <img style={{cursor: 'pointer'}} 
                onClick={() => token.value === props.tokenOpen && props.winner === 0 && !props.botDeciding ? props.playerClicks(token.row, token.col, props.curPlayer, 1) : ""} 
                className="token" key={k++} src={token.value}/>)}
            </div>)
    }
    return (
        newVisual
    )
}


function ShowloggedIn(props) {
    async function handleClick(i) {
        props.setCurOpponent('Multiplayer')
        notifyUser(props.token, props.user["name"], props.loggedIn[i])
        notifyUser(props.token, props.loggedIn[i], props.user["name"])
    }
    
    const newVisual = ['Users logged in (click email to play):']
    for (let i = 0; i < props.loggedIn.length; i++) {
        if (props.loggedIn[i] !== props.userData.email)
        newVisual.push(
            <div key={i} style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{cursor: 'pointer'}} onClick={() => {handleClick(i)}}>{props.loggedIn[i]}</span>
            </div>)
    }
    return (
            newVisual
    )
}



