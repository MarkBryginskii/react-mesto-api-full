import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

const Header = (props) => {

  return (
  <header className="header">
    <a href="https://markbryginskii.github.io/react-mesto-auth/index.html"><img className="header__logo" src={props.logo} alt="Место" /></a>
    <div className="header__login-container">
      <Switch>
        <Route path="/sign-up">
          <Link className='header__link header__link_white' to='/sign-in'>Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link className='header__link header__link_white' to='/sign-up'>Регистрация</Link>
        </Route>
        <Route exact path="/">
          <p className='header__user-email'>{props.userInfo}</p>
          <Link onClick={props.onLogoff} className='header__link header__link_gray' to='/sign-in'>Выйти</Link>
        </Route>
      </Switch>
    </div>
  </header>);
}

export default Header;
