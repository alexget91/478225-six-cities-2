import React from "react";
import renderer from "react-test-renderer";
import ErrorMessage from "./error-message";

it(`Error message correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<ErrorMessage
      error={`error`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
