import './App.css';
import { Game } from './Components/Game';
import NavBar from './Components/NavBar';
import { useState } from 'react';
import { updateGrid } from './Components/WriteScore';

function App() {

  async function handleClick() {
    const curToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNjI5Nzg1NGNmYzY1MGU0OTU1NDYzIn0sImlhdCI6MTY3MTgzNDMyMSwiZXhwIjoxNjcxODM3OTIxfQ.ixBRSr7Nk70eiYTW11URIbOFeQvQqE-3SqgnmKdehz8'
    try {
      const response = await fetch("http://localhost:3031/posts/score", {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'token': curToken},
          body: JSON.stringify({
            'username': 'mattbg27@gmail.com',
            'userScore': 1,
            'botScore': 2
        }),
})

      const data = await response
      console.log(data)
    
  } catch (error) {
      console.log('error signing in:', error);
  }
}


  

  return (
    <div style={{flexDirection: 'row', textAlign: 'center', alignItems: 'center'}}>
      <NavBar />
      <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', paddingTop: 70}}>
        <Game />
      </div>  
    </div>
  );
}

export default App;


/*
  async function handleClick() {
    const response = await fetch("http://localhost:3031/posts/me", {
      method: 'GET',
      headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNDc5MjRmYWEzZGUzNjEwNGZlMDc0In0sImlhdCI6MTY3MTgyMTU3MiwiZXhwIjoxNjcxODI1MTcyfQ.7nJfguLYrYf6ZQqoFkTVArspjd2D0njwQwlZDuvjgJ8',
          'Content-Type': 'application/json'
      },
    })
    const data = await response.json()
    setUser(data)
    console.log(data)
  }

  */
