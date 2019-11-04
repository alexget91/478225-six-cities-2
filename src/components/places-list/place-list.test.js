import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list";

it(`Place list correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<PlacesList
      offers={[{
        id: 0,
        priceByNight: 0,
        title: ``,
        type: `apartment`,
      }]}
      listType={`list`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
