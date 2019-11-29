import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
import {createMapBlock} from "../../common/test-stubs";
import {MemoryRouter} from "react-router-dom";

it(`App correctly renders after relaunch`, () => {
  createMapBlock();

  const tree = renderer
    .create(<MemoryRouter><App
      activeCity={`1`}
      offers={{
        1: {
          city: {
            name: `1`,
            location: {
              latitude: 0,
              longitude: 0,
            }
          },
          offers: [{
            id: 0,
            priceByNight: 0,
            title: ``,
            type: `apartment`,
            location: {
              latitude: 0,
              longitude: 0,
            }
          }]
        },
        2: {}
      }}
      onCityClick={jest.fn()}
      onSignIn={jest.fn()}
    /></MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
