import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import CitiesList from "./cities-list";

Enzyme.configure({adapter: new Adapter()});

it(`Clicking on a city pass city name to callback`, () => {
  const handleClick = jest.fn();
  const citiesList = Enzyme.shallow(<CitiesList
    cities={[`1`, `2`]}
    activeCity={`1`}
    onCityClick={handleClick}
  />);

  const cityElement = citiesList.find(`.js-city-item`).first();
  expect(cityElement.length).toBe(1);

  cityElement.simulate(`click`, {
    preventDefault: () => {},
    currentTarget: {textContent: `1`}
  });
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick).toHaveBeenCalledWith(`1`);
});
