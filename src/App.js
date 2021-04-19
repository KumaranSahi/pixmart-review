import './App.css';
import MainPage from './Containers/Mainpage/Mainpage'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './store/AuthContext'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <div>
        <MainPage/>
        <ToastContainer/>
      </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
