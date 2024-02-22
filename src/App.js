import './App.css';
import { Link } from 'react-router-dom';

function Button() {
  return (
    <button>
      Click Me!
    </button>
  )
}

function App() {
  return (
    <div className="App">
      <Button></Button>
    </div>
  );
}

export default App;
