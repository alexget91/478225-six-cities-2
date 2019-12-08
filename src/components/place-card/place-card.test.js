import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card";
import {MemoryRouter} from "react-router-dom";
import {PlacesListView} from "../../common/constants";

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
        type: `apartment`,
      }}
      cardType={PlacesListView.LIST}
    /></MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
