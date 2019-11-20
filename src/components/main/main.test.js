import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

it(`Main page correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<Main
      cities={[`1`, `2`]}
      activeCity={{
        name: `1`,
        location: {
          latitude: 0,
          longitude: 0,
        }
      }}
      onCityClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
