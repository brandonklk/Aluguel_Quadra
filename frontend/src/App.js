import React, {Fragment} from 'react';
import Routes from './routes';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 

toast.configure()
function App() {
  
  return (
    <Routes></Routes>
  );
}

export default App;
