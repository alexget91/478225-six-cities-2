import React from "react";
import renderer from "react-test-renderer";
import MainEmpty from "./main-empty";

it(`Main empty correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<MainEmpty
      cityName={`1`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
