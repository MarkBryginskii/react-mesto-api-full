import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Register = (props) => {

  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  }

  return (
    <section className="auth">
      <form className="auth auth__form">
        <h2 className="auth__title">Регистрация</h2>
        <input defaultValue='' ref={emailRef} className="auth__text-field" id="auth__user-email" type='email' name='email' placeholder="Email" required></input>
        <input defaultValue='' ref={passwordRef} className="auth__text-field" id="auth__user-password" type='password' name='password' placeholder="Пароль" required></input>
        <button onClick={handleSubmit} className="auth__submit-button" type='submit'>Зарегистрироваться</button>
        <Link className="auth__login-link" to='/sign-in'>Уже зарегистрированы? Войти</Link>
      </form>
    </section>
  );
}

export default withRouter(Register);
