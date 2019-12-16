import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import ErrorMessage from "./error-message";

Enzyme.configure({adapter: new Adapter()});

it(`Click on close button calls callback`, () => {
  const handleClick = jest.fn();
  const errorMessage = Enzyme.shallow(<ErrorMessage
    error={``}
    onCloseClick={handleClick}
  />);

  const closeButton = errorMessage.find(`.js-close`);
  expect(closeButton.length).toBe(1);

  closeButton.simulate(`click`);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
