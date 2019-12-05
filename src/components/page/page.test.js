import React from "react";
import renderer from "react-test-renderer";
import Page from "./page";
import {PageType} from "../../common/constants";

describe(`Page component correctly renders after relaunch`, () => {
  it(`Without data`, () => {
    const tree = renderer
      .create(<Page/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Without type`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With error message`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        error={`error message`}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type FAVORITES`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={PageType.FAVORITES}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type FAVORITES_EMPTY`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={PageType.FAVORITES_EMPTY}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type LOGIN`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={PageType.LOGIN}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type MAIN`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={PageType.MAIN}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type MAIN_EMPTY`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={PageType.MAIN_EMPTY}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type OFFER`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={PageType.OFFER}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
