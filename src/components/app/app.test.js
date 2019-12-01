import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
import {createMapBlock, getMockOffer} from "../../common/test-stubs";
import {MemoryRouter} from "react-router-dom";

const mockOffer = getMockOffer(1, `city1`);

it(`App correctly renders after relaunch`, () => {
  createMapBlock();

  const tree = renderer
    .create(<MemoryRouter><App
      activeCity={`city1`}
      offers={{
        allOffers: {
          1: mockOffer
        },
        offersByCities: {
          city1: [mockOffer],
          city2: []
        },
      }}
      cities={[`city1`, `city2`]}
      onCityClick={jest.fn()}
      onSignIn={jest.fn()}
    /></MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
