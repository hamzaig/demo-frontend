import React, { useEffect } from 'react'
import Dropdown from '../Dropdown/Dropdown';
import "./topnavbar.css";
import notifications from "../../assests/JsonData/notification.json";
import { Link, useNavigate } from 'react-router-dom';
import userMenu from "../../assests/JsonData/user_menus.json";
import ThemeMenu from '../thememenu/ThemeMenu';
import { logoutUser } from '../../store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import { getBusinesses } from '../../store/actions/businessActions';
const userImage = `https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png`;

const TopNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogout = useSelector(state => state.userLogout);
  const { loading } = userLogout;

  const userLogin = useSelector(state => state.userLogin);
  const { userData: { user } } = userLogin;

  const businesses = useSelector(state => state.businesses);
  const { businessData, loading: businessLoading } = businesses;

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch])

  const renderNotificationItems = (item, index) => (
    <div className="notfication-item" key={index}>
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  )

  const renderUser = () => (
    <div className="topnav__right-user">
      <div className="topnav__right-user__image">
        <img src={userImage} alt={user.phone} />
      </div>
      <div className="topnav__right-user__name">
        {user.phone}
      </div>
    </div>
  )

  const renderUserMenu = (item, index) => (
    <div key={index}>
      <div className="notfication-item">
        <i className={item.icon}></i>
        <span style={{ cursor: "pointer" }} onClick={eval(item.onClick)}>{item.content}</span>
      </div>
    </div>
  )

  const changePinHandler = () => {
    navigate("/khata/change-pin")
  }

  const logoutHandler = () => {
    dispatch(logoutUser())
    navigate("/login")
  }


  return (
    <>
      {(loading || businessLoading) && <Loader />}
      <div className='topnav'>
        <div className="topnav__search">
          <input type={"text"} placeholder="Search here..." />
          <i className='bx bx-search'></i>
        </div>
        <div className="topnav__right">
          <div className="topnav__right-item">
            <select name="cars" id="cars" className='topnav__right-item-select'>
              {businessData && businessData?.map(bussiness => (
                <option key={bussiness._id} value={bussiness._id}>{bussiness.name}</option>
              ))}
            </select>
          </div>
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