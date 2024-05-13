import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Auth from './Pages/Auth';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Auth/>} />
      <Route path='/register' element={<Auth register />} />
      <Route path='/Home' element={<Home/>} />

    </Routes>
  );
}

export default App;
