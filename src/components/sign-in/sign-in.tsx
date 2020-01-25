import * as React from "react";

interface Props {
  onFormSubmit: (email: string, password: string) => void,
}

class SignIn extends React.PureComponent<Props, null> {
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

    const formData: FormData = new FormData(evt.target);
    const email: string = formData.get(`email`).toString();
    const password: string = formData.get(`password`).toString();

    if (email && password) {
      this.props.onFormSubmit(email, password);
    }
  }
}

export default SignIn;
