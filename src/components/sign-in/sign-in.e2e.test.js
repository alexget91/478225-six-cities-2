import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in";

Enzyme.configure({adapter: new Adapter()});

it(`Sign-in form submitting calls callback with correct data`, () => {
  const formSubmitHandler = jest.fn();
  const signIn = mount(<SignIn onFormSubmit={formSubmitHandler}/>);

  const loginForm = signIn.find(`.js-login-form`);
  expect(loginForm.length).toBe(1);

  const emailInput = signIn.find(`.js-email-input`);
  expect(emailInput.length).toBe(1);

  const passwordInput = signIn.find(`.js-password-input`);
  expect(passwordInput.length).toBe(1);

  emailInput.instance().value = `mockEmail`;
  passwordInput.instance().value = `mockPassword`;

  loginForm.simulate(`submit`, {
    preventDefault: () => {},
    target: loginForm.instance(),
  });

  expect(formSubmitHandler).toHaveBeenCalledTimes(1);
  expect(formSubmitHandler).toHaveBeenCalledWith(`mockEmail`, `mockPassword`);
});
