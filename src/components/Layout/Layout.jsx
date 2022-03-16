import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import ChangePin from '../../pages/change-pin/ChangePin';
import Customers from '../../pages/Customers/Customers';
import Dashboard from '../../pages/Dashboard/Dashboard';
import { setModeRedux, setColorRedux } from "../../store/actions/ThemeAction";
import Sidebar from '../Sidebar/Sidebar'
import TopNavbar from '../TopNavbar/TopNavbar';
import "./layout.css";

const Layout = (props) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  useEffect(() => {
    const themeClass = localStorage.getItem('themeMode', 'theme-mode-light');
    const colorClass = localStorage.getItem('colorMode', 'theme-mode-light');
    dispatch(setModeRedux(themeClass));
    dispatch(setColorRedux(colorClass));

  }, [dispatch])

  return (
    <div className={`layout ${theme.mode} ${theme.color}`}>
      {/* {console.log(`git layout ${theme.mode} ${theme.color}`)} */}
      <Sidebar {...props} />
      <div className="layout__content">
        <TopNavbar />
        <div className="layout__content-main">
          <Routes>
            <Route path='/' element={<Dashboard />} exect />
            <Route path='/customers' element={<Customers exect />} />
            <Route path='/change-pin' element={<ChangePin exect />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Layout