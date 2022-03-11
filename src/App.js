import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthenticationPage from './pages/AuthenticationPage';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage />} exect />
        <Route path='/login' element={<AuthenticationPage />} exect />
        <Route path='/register' element={<AuthenticationPage />} exect />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
