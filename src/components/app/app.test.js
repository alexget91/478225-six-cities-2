import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App offers={[{
      id: 0,
      priceByNight: 0,
      title: ``,
      type: `apartment`,
    }]}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
