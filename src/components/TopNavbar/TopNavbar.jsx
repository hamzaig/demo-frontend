import React from 'react'
import Dropdown from '../Dropdown/Dropdown';
import "./topnavbar.css";
import notifications from "../../assests/JsonData/notification.json";
import { Link } from 'react-router-dom';
import userMenu from "../../assests/JsonData/user_menus.json";
import ThemeMenu from '../thememenu/ThemeMenu';
import store from '../../store/store';
import { logoutUser } from '../../store/actions/authActions';
import { useSelector } from 'react-redux';
import Loader from '../loader/Loader';
const userImage = `https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png`;
const currentUser = {
  name: "Hamza Ali Khalid",
  image: userImage,
}

const renderNotificationItems = (item, index) => (
  <div className="notfication-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
)

const renderUser = () => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={currentUser.image} alt={currentUser.name} />
    </div>
    <div className="topnav__right-user__name">
      {currentUser.name}
    </div>
  </div>
)

const renderUserMenu = (item, index) => (
  <div to={"/"} key={index}>
    <div className="notfication-item">
      <i className={item.icon}></i>
      <span style={{ cursor: "pointer" }} onClick={eval(item.onClick)}>{item.content}</span>
    </div>
  </div>
)


const changePinHandler = () => {
  alert("changePinHandler")
}


const logoutHandler = () => {
  store.dispatch(logoutUser())
}



const TopNavbar = () => {

  const userLogout = useSelector(state => state.userLogout);
  const { loading } = userLogout;


  return (
    <>
      {loading && <Loader />}
      <div className='topnav'>
        <div className="topnav__search">
          <input type={"text"} placeholder="Search here..." />
          <i className='bx bx-search'></i>
        </div>
        <div className="topnav__right">
          <div className="topnav__right-item">
            <Dropdown
              customToggle={renderUser}
              contentData={userMenu}
              renderItems={renderUserMenu}
            />
          </div>
          <div className="topnav__right-item">
            <Dropdown
              icon="bx bx-bell"
              badge={12}
              contentData={notifications}
              renderItems={renderNotificationItems}
              renderFooter={() => <Link to="/">View All</Link>}
            />
          </div>
          <div className="topnav__right-item">
            <ThemeMenu />
          </div>
        </div>
      </div>
    </>
  )
}

export default TopNavbar