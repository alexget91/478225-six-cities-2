import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ErrorMessage from "./error-message";

Enzyme.configure({adapter: new Adapter()});

it(`Click on close button calls callback`, () => {
  const handleClick = jest.fn();
  const errorMessage = shallow(<ErrorMessage
    error={``}
    onCloseClick={handleClick}
  />);

  const closeButton = errorMessage.find(`.js-close`);
  expect(closeButton.length).toBe(1);

  closeButton.simulate(`click`);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
