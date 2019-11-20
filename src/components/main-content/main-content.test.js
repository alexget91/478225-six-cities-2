import React from "react";
import renderer from "react-test-renderer";
import {createMapBlock} from "../../common/test-stubs";
import MainContent from "./main-content";

it(`Main content correctly renders after relaunch`, () => {
  createMapBlock();

  const tree = renderer
    .create(<MainContent
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
        type: `apartment`,
        location: {
          latitude: 0,
          longitude: 0,
        }
      }]}
      onSortChange={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

