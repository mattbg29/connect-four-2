import './App.css';
import { Game } from './Components/Game';
import NavBar from './Components/NavBar';

// need to add a sign-up button

function App() {

  return (
    <div style={{flexDirection: 'row', textAlign: 'center', alignItems: 'center'}}>
      <NavBar />
      <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', paddingTop: 100}}>
        <Game />
      </div>  
    </div>
  );
}

export default App;

