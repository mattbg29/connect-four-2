// updates the score and botscore for hte given user by deleting the score and re-writing with the
// original score plus 1 for whoever won (user vs bot), since direct updates are not allowed
export async function updateScore(score, botScore, token) {
    try {
        const response = await fetch("https://connect-4-backend.onrender.com/posts/score", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'token': token},
            body: JSON.stringify({
              'userScore': score,
              'botScore': botScore
          }),
        })        
    } catch (error) {
        console.log('error signing in:', error);
    }
  }

// gets the score data for the given user
export async function getScore(token) {
    try {
      const response = await fetch("https://connect-4-backend.onrender.com/posts/me", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'token': token},
    })
    const data = await response.json()
    console.log(data)
    //console.log(data)
    return data
    
  } catch (error) {
      console.log('error signing in:', error);
  }
}

export async function getAll(token) {
    try {
      const response = await fetch("https://connect-4-backend.onrender.com/posts/all", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'token': token},
    })
    const data = await response.json()
    //console.log(data)
    return data
    
  } catch (error) {
      console.log('error signing in:', error);
  }
}


export async function updatedLoggedIn(token) {
    try {
        const response = await fetch("https://connect-4-backend.onrender.com/logs/loggedIns", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'token': token},
            body: JSON.stringify({'score': 'hihi'}),
          })        
    } catch (error) {
        console.log('error signing in:', error);
    }
  }

  export async function getLoggedIn(token) {
    try {
        const response = await fetch("https://connect-4-backend.onrender.com/logs/loggedIns", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'token': token},
        })        
        const data = await response.json()
        //console.log(data)
        return data

    } catch (error) {
        console.log('error signing in:', error);
    }
  }

  export async function notifyUser(token, user, toNotify) {
    console.log(user+":"+toNotify)
    try {
        const response = await fetch("https://connect-4-backend.onrender.com/posts/notify", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'token': token},
            body: JSON.stringify({
                'user': user,
                'email': toNotify
            }),
          })        
    } catch (error) {
        console.log('error signing in:', error);
    }
  }

  export async function updateGrid(token, user, grid) {
    console.log('hee')
    console.log(user)
    try {
        const response = await fetch("https://connect-4-backend.onrender.com/posts/updateGrid", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'token': token},
            body: JSON.stringify({
                'user': user,
                'grid': grid
            }),
          })        
    } catch (error) {
        console.log('error signing in:', error);
    }
  }

  export async function getGrid(token) {
    try {
        const response = await fetch("https://connect-4-backend.onrender.com/posts/getGrid", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'token': token},
        })        
        const data = await response.json()
        //console.log(data)
        return data

    } catch (error) {
        console.log('error signing in:', error);
    }
  }
