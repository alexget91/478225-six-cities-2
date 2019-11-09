import renderer from "react-test-renderer";
import React from "react";
import Map from "./map";
import {createMapBlock} from "../../common/test-stubs";

it(`Map correctly renders after relaunch`, () => {
  createMapBlock();

  const tree = renderer
    .create(<Map offerCords={[]} mapType={`list`} city={{
      name: ``,
      location: {
        latitude: 0,
        longitude: 0,
      }
    }}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
