import { Header } from './components/Header.js'
import { Main } from './components/Main.js'
import './styles/App.css';

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='main'>
        <Main />
      </div> 
    </div>
  );
}

export default App;
