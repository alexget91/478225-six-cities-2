import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";
import {createMapBlock} from "../../common/test-stubs";

it(`Main page correctly renders after relaunch`, () => {
  createMapBlock();

  const tree = renderer
    .create(<Main
      cities={[`1`, `2`]}
      activeCity={`1`}
      offers={[{
        id: 0,
        city: {
          name: ``,
          location: {
            latitude: 0,
            longitude: 0,
          }
        },
        priceByNight: 0,
        title: ``,
        type: `apartment`,
        location: {
          latitude: 0,
          longitude: 0,
        }
      }]}
      onCityClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
