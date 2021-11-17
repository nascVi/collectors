import logo from './logo.svg';
import './App.css';
import Nav from './components/nav/Nav';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
	  <h1>The Collectors Hang Out</h1>
	  <img src={logo} className="App-logo" alt="logo" />
        <p>
          what's up doc collectors?!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
