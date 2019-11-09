import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CitiesList from "./cities-list";

Enzyme.configure({adapter: new Adapter()});

it(`Clicking on a city pass city name to callback`, () => {
  const clickHandler = jest.fn();
  const citiesList = shallow(<CitiesList
    cities={[`1`, `2`]}
    activeCity={`1`}
    onCityClick={clickHandler}
  />);

  const cityElement = citiesList.find(`.js-city-item`).first();
  expect(cityElement.length).toBe(1);

  cityElement.simulate(`click`, {
    preventDefault: () => {},
    currentTarget: {textContent: `1`}
  });
  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler).toHaveBeenCalledWith(`1`);
});
