import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list";

it(`Place list correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<PlacesList offers={[{
      id: 0,
      priceByNight: 0,
      name: ``,
      type: `apartment`,
    }]}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
