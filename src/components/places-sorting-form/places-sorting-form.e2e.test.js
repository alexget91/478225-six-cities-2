import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlacesSortingForm from "./places-sorting-form";

Enzyme.configure({adapter: new Adapter()});

it(`Clicking on a sorting option pass sorting id to callback`, () => {
  const handleClick = jest.fn();
  const placesSorting = shallow(<PlacesSortingForm
    onSortChange={handleClick}
    onVisibilityChange={jest.fn()}
  />);

  const sortingOption = placesSorting.find(`.js-sorting-option`).first();
  expect(sortingOption.length).toBe(1);

  sortingOption.simulate(`click`, {
    target: {
      dataset: {sort: `1`}
    }
  });
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick).toHaveBeenCalledWith(`1`);
});
