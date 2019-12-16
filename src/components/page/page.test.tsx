import * as React from "react";
import * as renderer from "react-test-renderer";
import Page from "./page";
import {PageType} from "../../common/constants";
import {MemoryRouter} from "react-router-dom";

describe(`Page component correctly renders after relaunch`, () => {
  it(`Without data`, () => {
    const tree = renderer
      .create(<Page/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Without type`, () => {
    const tree = renderer
      .create(<MemoryRouter><Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
      /></MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With error message`, () => {
    const tree = renderer
      .create(<MemoryRouter><Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        error={`error message`}
      /></MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type FAVORITES`, () => {
    const tree = renderer
      .create(<MemoryRouter><Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={PageType.FAVORITES}
      /></MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type FAVORITES_EMPTY`, () => {
    const tree = renderer
      .create(<MemoryRouter><Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={PageType.FAVORITES_EMPTY}
      /></MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type LOGIN`, () => {
    const tree = renderer
      .create(<MemoryRouter><Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={PageType.LOGIN}
      /></MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type MAIN`, () => {
    const tree = renderer
      .create(<MemoryRouter><Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={PageType.MAIN}
      /></MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type MAIN_EMPTY`, () => {
    const tree = renderer
      .create(<MemoryRouter><Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={PageType.MAIN_EMPTY}
      /></MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type OFFER`, () => {
    const tree = renderer
      .create(<MemoryRouter><Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={PageType.OFFER}
      /></MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
