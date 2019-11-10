import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlacesSorting from "./places-sorting";

Enzyme.configure({adapter: new Adapter()});

it(`Clicking on a sorting option pass sorting id to callback`, () => {
  const clickHandler = jest.fn();
  const placesSorting = shallow(<PlacesSorting sort={`popular`} onSortChange={clickHandler}/>);

  const sortingOption = placesSorting.find(`.js-sorting-option`).first();
  expect(sortingOption.length).toBe(1);

  sortingOption.simulate(`click`, {
    target: {
      dataset: {sort: `1`}
    }
  });
  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler).toHaveBeenCalledWith(`1`);
});
