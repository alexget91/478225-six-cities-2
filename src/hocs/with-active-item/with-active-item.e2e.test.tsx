import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withActiveItem, {PropName, transformPropNames} from "./with-active-item";

Enzyme.configure({adapter: new Adapter()});

describe(`HOC withActiveItem`, () => {
  const MockComponent = () => <div/>;

  const MockComponentWrappedNoDefault: React.ComponentClass = withActiveItem(MockComponent);
  const wrapperNoDefault = Enzyme.shallow(<MockComponentWrappedNoDefault/>);

  const MockComponentWrappedWithDefault: React.ComponentClass = withActiveItem(MockComponent, `defaultActiveItem`);
  const wrapperWithDefault = Enzyme.shallow(<MockComponentWrappedWithDefault/>);

  it(`Correctly set default active item`, () => {
    expect(wrapperNoDefault.state().activeItem).toEqual(undefined);
    expect(wrapperWithDefault.state().activeItem).toEqual(`defaultActiveItem`);
  });

  it(`Correctly change active item`, () => {
    wrapperNoDefault.instance()._handleActiveItemChange(`newActiveItem`);
    expect(wrapperNoDefault.state().activeItem).toEqual(`newActiveItem`);

    wrapperWithDefault.instance()._handleActiveItemChange(`newActiveItem`);
    expect(wrapperWithDefault.state().activeItem).toEqual(`newActiveItem`);
  });

  it(`Correctly transform names of properties`, () => {
    expect(transformPropNames(`newActiveItem`, `newCallback`, {
      foo: `bar`,
      [PropName.ACTIVE_ITEM]: `activeItemValue`,
      [PropName.ON_ACTIVE_ITEM_CHANGE]: `callbackValue`,
    })).toEqual({
      foo: `bar`,
      newActiveItem: `activeItemValue`,
      newCallback: `callbackValue`,
    });
  });
});
