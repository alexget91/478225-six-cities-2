import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list";
import {MemoryRouter} from "react-router-dom";
import {PlacesListView} from "../../common/constants";

it(`Place list correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<MemoryRouter><PlacesList
      offers={[{
        id: 0,
        priceByNight: 0,
        title: ``,
        type: `apartment`,
      }]}
      listType={PlacesListView.LIST}
    /></MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
