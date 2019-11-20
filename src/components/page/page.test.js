import React from "react";
import renderer from "react-test-renderer";
import Page from "./page";
import {pageTypes} from "../../common/constants";

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

  it(`With type FAVORITES`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={pageTypes.FAVORITES}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type FAVORITES_EMPTY`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={pageTypes.FAVORITES_EMPTY}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type LOGIN`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={pageTypes.LOGIN}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type MAIN`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={pageTypes.MAIN}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type MAIN_EMPTY`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={pageTypes.MAIN_EMPTY}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With type OFFER`, () => {
    const tree = renderer
      .create(<Page
        header={<div className="header"></div>}
        content={<div className="content"></div>}
        type={pageTypes.OFFER}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
