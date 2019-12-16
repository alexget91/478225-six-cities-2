import * as React from "react";
import * as renderer from "react-test-renderer";
import PlaceCard from "./place-card";
import {MemoryRouter} from "react-router-dom";
import {PlacesListView, PlaceType} from "../../common/constants";

it(`Place card correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<MemoryRouter><PlaceCard
      offer={{
        id: 0,
        isPremium: true,
        isFavorite: false,
        previewImage: ``,
        priceByNight: 0,
        rating: 0,
        title: ``,
        type: PlaceType.APARTMENT,
      }}
      cardType={PlacesListView.LIST}
    /></MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
