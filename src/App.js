import './App.css';
import MainPage from './Containers/Mainpage/Mainpage'
import {BrowserRouter} from 'react-router-dom'

import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <BrowserRouter>
      <div>
        <MainPage/>
        <ToastContainer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
