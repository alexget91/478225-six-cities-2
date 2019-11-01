import React from "react";
import renderer from "react-test-renderer";
import App from "./app";
import {createMapBlock} from "../../common/test-stubs";

it(`App correctly renders after relaunch`, () => {
  createMapBlock();

  const tree = renderer
    .create(<App offers={[{
      id: 0,
      priceByNight: 0,
      title: ``,
      type: `apartment`,
      location: {
        latitude: 0,
        longitude: 0,
      }
    }]}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
