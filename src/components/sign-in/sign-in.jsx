import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  render() {
    return <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <form className="login__form form js-login-form" action="#" method="post" onSubmit={this._handleFormSubmit}>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <input className="login__input form__input js-email-input" type="email" name="email" placeholder="Email" required/>
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <input className="login__input form__input js-password-input" type="password" name="password" placeholder="Password" required/>
          </div>
          <button className="login__submit form__submit button" type="submit">Sign in</button>
        </form>
      </section>
      <section className="locations locations--login locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span>
          </a>
        </div>
      </section>
    </div>;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const email = formData.get(`email`);
    const password = formData.get(`password`);

    if (email && password) {
      this.props.onFormSubmit(email, password);
    }
  }
}

SignIn.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SignIn;
