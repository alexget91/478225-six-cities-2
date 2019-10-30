import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

it(`Main page correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<Main offers={[{
      id: 0,
      priceByNight: 0,
      title: ``,
      type: `apartment`,
    }]}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
