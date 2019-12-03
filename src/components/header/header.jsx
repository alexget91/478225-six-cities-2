import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Path from "../../common/path";

const Header = (props) => {
  const {email, isAuthorizationRequired} = props;

  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link header__logo-link--active" to={Path.INDEX}>
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile"
                to={isAuthorizationRequired ? Path.LOGIN : Path.FAVORITES}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                {isAuthorizationRequired
                  ? <span className="header__login">Sign in</span>
                  : <span className="header__user-name user__name">{email}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
};

Header.propTypes = {
  email: PropTypes.string,
  isAuthorizationRequired: PropTypes.bool,
};

export default Header;
