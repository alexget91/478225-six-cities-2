import React from "react";
import renderer from "react-test-renderer";
import {createMapBlock} from "../../common/test-stubs";
import MainContent from "./main-content";
import {MemoryRouter} from "react-router-dom";
import {PlaceType} from "../../common/constants";

it(`Main content correctly renders after relaunch`, () => {
  createMapBlock();

  const tree = renderer
    .create(<MemoryRouter><MainContent
      activeCity={{
        name: `1`,
        location: {
          latitude: 0,
          longitude: 0,
        }
      }}
      offers={[{
        id: 0,
        priceByNight: 0,
        title: ``,
        type: PlaceType.APARTMENT,
        location: {
          latitude: 0,
          longitude: 0,
        }
      }]}
      onSortChange={jest.fn()}
    /></MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

