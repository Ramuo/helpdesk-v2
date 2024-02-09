import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import Header from './components/Header';
import UserEditPage from './pages/UserEditPage';

function App() {

  return (
    <BrowserRouter>
      <div className="container">
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/user/:id/edit' element={<UserEditPage/>}/>
        </Routes>
      </div>
      <ToastContainer className={'toast-position'}/>
    </BrowserRouter>
  )
}

export default App
