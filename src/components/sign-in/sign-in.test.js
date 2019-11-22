import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in";

it(`Sign in screen correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<SignIn onFormSubmit={jest.fn()}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
