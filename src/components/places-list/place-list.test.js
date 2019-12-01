import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list";
import {MemoryRouter} from "react-router-dom";

it(`Place list correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<MemoryRouter><PlacesList
      offers={[{
        id: 0,
        priceByNight: 0,
        title: ``,
        type: `apartment`,
      }]}
      listType={`list`}
    /></MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
