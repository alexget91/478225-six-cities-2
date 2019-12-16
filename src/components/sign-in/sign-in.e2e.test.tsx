import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in";

Enzyme.configure({adapter: new Adapter()});

it(`Sign-in form submitting calls callback with correct data`, () => {
  const handleFormSubmit = jest.fn();
  const signIn = Enzyme.mount(<SignIn onFormSubmit={handleFormSubmit}/>);

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

  expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  expect(handleFormSubmit).toHaveBeenCalledWith(`mockEmail`, `mockPassword`);
});
