import React from "react";
import renderer from "react-test-renderer";
import Index from "./index";

it(`Index correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<Index placeNames={[`0`]}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
