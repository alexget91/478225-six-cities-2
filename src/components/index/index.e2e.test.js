import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Index from "./index";

Enzyme.configure({adapter: new Adapter()});

it(`Clicking on a place name calls callback`, () => {
  const clickHandler = jest.fn();
  const indexPage = shallow(<Index
    placeNames={[`0`, `1`]}
    onPlaceNameClick={clickHandler}
  />);

  const placeNames = indexPage.find(`.js-place-name`);
  placeNames.forEach((name) => name.simulate(`click`));

  expect(clickHandler).toHaveBeenCalledTimes(2);
});
