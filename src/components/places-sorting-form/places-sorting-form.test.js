import renderer from "react-test-renderer";
import React from "react";
import PlacesSortingForm from "./places-sorting-form";

it(`Places sorting form correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<PlacesSortingForm
      onSortChange={jest.fn()}
      onVisibilityChange={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
