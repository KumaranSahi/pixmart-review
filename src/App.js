import './App.css';
import MainPage from './Containers/Mainpage/Mainpage'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <MainPage/>
      </div>
    </BrowserRouter>
  );
}

export default App;
