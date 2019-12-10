import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withOpenable from "./with-openable";

Enzyme.configure({adapter: new Adapter()});

describe(`HOC withOpenable`, () => {
  const eventsMap = {};
  document.addEventListener = jest.fn((event, cb) => {
    eventsMap[event] = cb;
  });

  const MockComponent = () => <div/>;
  const MockComponentWrapped = withOpenable(MockComponent);
  const wrapper = mount(<MockComponentWrapped/>);

  it(`Correctly change visibility`, () => {
    expect(wrapper.state().isVisible).toEqual(false);
    wrapper.instance()._handleVisibilityChange();
    expect(wrapper.state().isVisible).toEqual(true);
    wrapper.instance()._handleVisibilityChange();
    expect(wrapper.state().isVisible).toEqual(false);
  });

  it(`Hides an item on a click outside of it`, () => {
    wrapper.setState({isVisible: true});
    eventsMap.click();
    expect(wrapper.state().isVisible).toEqual(false);
  });
});
