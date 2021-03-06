import * as React from "react";
import * as renderer from "react-test-renderer";
import ErrorMessage from "./error-message";

it(`Error message correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<ErrorMessage
      error={`error`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
