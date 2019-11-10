import renderer from "react-test-renderer";
import React from "react";
import PlacesSorting from "./places-sorting";

it(`Places sorting correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<PlacesSorting sort={`popular`} onSortChange={jest.fn()}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
