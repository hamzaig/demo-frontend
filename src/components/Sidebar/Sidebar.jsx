import React from 'react'
import "./sidebar.css"
import logo from "../../assests/images/logo1.png";
import sidebarItems from "../../assests/JsonData/sidebar_routes.json";
import { Link, useLocation } from 'react-router-dom';

function SidebarItem(props) {
  const active = props.active ? "active" : "";
  // console.log(active);
  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>
          {props.title}
        </span>
      </div>
    </div>
  );
};


const Sidebar = () => {
  const { pathname } = useLocation();
  // console.log(pathname);
  const activeItem = sidebarItems.findIndex(item => `/khata${item.route}` === pathname)
  // console.log(activeItem);
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img style={{ backgroundColor: "#1864AB", padding: "10px", borderRadius: "10%" }} src={logo} alt="Mobi Khata by hamzaig" />
      </div>
      {
        sidebarItems.map((item, index) => (
          <Link to={`/khata${item.route}`} key={index}>
            <SidebarItem
              title={item.display_name}
              icon={item.icon}
              active={index === activeItem}
            />
          </Link>
        ))
      }
    </div>
  )
}

export default Sidebar