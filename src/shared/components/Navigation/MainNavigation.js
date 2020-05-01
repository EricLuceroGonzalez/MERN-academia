import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import Backdrop from '../UIElements/Backdrop'

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  // Function to handle openDrawer
  const openDrawer = () => {
    setDrawerIsOpen(true);
  };
  // Close the sideDrawer at click an backdrop
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  return (
    <React.Fragment>
    {drawerIsOpen && <Backdrop onClick={closeDrawer}> </Backdrop> }
      {drawerIsOpen && (
        <SideDrawer>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
