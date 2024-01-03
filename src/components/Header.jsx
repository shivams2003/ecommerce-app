import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { StateProvider, useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="headerLogo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>
      <div className="headerSearch">
        <input className="headerSearchInput" type="text" />
        <SearchIcon className="searchIcon" />
      </div>
      <div className="headerNav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="headerOption">
            <span className="optionLineOne">
              Hello,{!user ? "Guest" : user.email}{" "}
            </span>
            <span className="optionLineTwo">
              {user ? "Sign out" : "Sign in"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="headerOption">
            <span className="optionLineOne">Returns</span>
            <span className="optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="headerOption">
          <span className="optionLineOne">Your</span>
          <span className="optionLineTwo">Prime</span>
        </div>
      </div>
      <Link to="/checkout">
        <div className="headerOptionBasket">
          <ShoppingBasketIcon />
          <span className="optionLineTwoheaderBasket">{basket?.length}</span>
        </div>
      </Link>
    </div>
  );
}

export default Header;
