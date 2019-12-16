import * as React from "react";
import * as renderer from "react-test-renderer";
import PlacesList from "./places-list";
import {MemoryRouter} from "react-router-dom";
import {PlacesListView, PlaceType} from "../../common/constants";

it(`Place list correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<MemoryRouter><PlacesList
      offers={[{
        id: 0,
        priceByNight: 0,
        title: ``,
        type: PlaceType.APARTMENT,
      }]}
      listType={PlacesListView.LIST}
    /></MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
