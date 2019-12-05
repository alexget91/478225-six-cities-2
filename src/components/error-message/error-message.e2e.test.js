import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ErrorMessage from "./error-message";

Enzyme.configure({adapter: new Adapter()});

it(`Click on close button calls callback`, () => {
  const clickHandler = jest.fn();
  const errorMessage = shallow(<ErrorMessage
    error={``}
    onCloseClick={clickHandler}
  />);

  const closeButton = errorMessage.find(`.js-close`);
  expect(closeButton.length).toBe(1);

  closeButton.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
