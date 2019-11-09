import renderer from "react-test-renderer";
import React from "react";
import CitiesList from "./cities-list";

it(`Cities list correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<CitiesList
      cities={[`1`, `2`]}
      activeCity={`1`}
      onCityClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
