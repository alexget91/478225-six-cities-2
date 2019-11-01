import renderer from "react-test-renderer";
import React from "react";
import Map from "./map";
import {createMapBlock} from "../../common/test-stubs";

it(`Map correctly renders after relaunch`, () => {
  createMapBlock();

  const tree = renderer
    .create(<Map offerCords={[]}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
