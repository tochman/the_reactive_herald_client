import React, { useState } from "react";
import { connect } from "react-redux";
import auth from "../modules/auth";

const Login = props => {
  const [displayLoginButton, setDisplayLoginButton] = useState(true);
  const [loginMessage, setLoginMessage] = useState("");

  const onLogin = event => {
    event.preventDefault();
    auth
      .signIn(event.target.email.value, event.target.password.value)
      .then(userDatas => {
        props.changeAuth(true);
        setLoginMessage(`Logged in as: ${userDatas.data.email}`);
      })
      .catch(error => {
        setLoginMessage(`Invalid login credentials. Try again.`)
      });
  };

  const onLogout = () => {
    auth
      .signOut()
      .then(() => {
        props.changeAuth(false);
        setDisplayLoginButton(true);
      })
      .catch(error => {
        setLoginMessage(error);
      });
  };

  let loginFunction;

  switch (true) {
    case displayLoginButton && !props.authenticated:
      loginFunction = (
        <button id="loginButton" onClick={() => setDisplayLoginButton(false)}>
          Login
        </button>
      );
      break;
    case !displayLoginButton && !props.authenticated:
      loginFunction = (
        <>
        <form id="login-form" onSubmit={onLogin}>
          <label>Email:</label>
          <input name="email" type="email" id="email"></input>

          <label>Password:</label>
          <input name="password" type="password" id="password"></input>

          <button id="submit">Submit</button>
        </form>
        {loginMessage}
        </>
      );
      break;
    case props.authenticated:
      loginFunction = (
        <>
          {loginMessage}
          <button id="logoutButton" onClick={onLogout}>
            Logout
          </button>
        </>
      );
      break;
  }

  return <div id="login">{loginFunction}</div>;
};

const mapStateToProps = state => ({
  authenticated: state.authenticated
});

const mapDispatchToProps = dispatch => {
  return {
    changeAuth: auth => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
