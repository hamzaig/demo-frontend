import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import AuthenticationPage from './pages/Authentication/AuthenticationPage';
import WelcomePage from './pages/Welcomepage/WelcomePage';

import "./assests/boxicons-2.0.7/css/boxicons.min.css";
import "./assests/css/grid.css";
import "./assests/css/index.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage />} exect />
        <Route path='/login' element={<AuthenticationPage />} exect />
        <Route path='/register' element={<AuthenticationPage />} exect />
        <Route path='/khata/*' element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
