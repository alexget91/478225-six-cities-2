import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveItem from "./with-active-item";

Enzyme.configure({adapter: new Adapter()});

describe(`HOC withActiveItem`, () => {
  const MockComponent = () => <div/>;

  const MockComponentWrappedNoDefault = withActiveItem(MockComponent);
  const wrapperNoDefault = shallow(<MockComponentWrappedNoDefault/>);

  const MockComponentWrappedWithDefault = withActiveItem(MockComponent, `defaultActiveItem`);
  const wrapperWithDefault = shallow(<MockComponentWrappedWithDefault/>);

  it(`Correctly set default active item`, () => {
    expect(wrapperNoDefault.state().activeItem).toEqual(undefined);
    expect(wrapperWithDefault.state().activeItem).toEqual(`defaultActiveItem`);
  });

  it(`Correctly change active item`, () => {
    wrapperNoDefault.instance()._activeItemChangeHandler(`newActiveItem`);
    expect(wrapperNoDefault.state().activeItem).toEqual(`newActiveItem`);

    wrapperWithDefault.instance()._activeItemChangeHandler(`newActiveItem`);
    expect(wrapperWithDefault.state().activeItem).toEqual(`newActiveItem`);
  });
});
