import React from "react";
import PropTypes from "prop-types";
import {pageTypes} from "../../common/constants";

const cssClass = {
  [pageTypes.FAVORITES]: {
    wrapper: ``,
    main: ` page__main--favorites`,
  },
  [pageTypes.FAVORITES_EMPTY]: {
    wrapper: ` page--favorites-empty`,
    main: ` page__main--favorites page__main--favorites-empty`,
  },
  [pageTypes.LOGIN]: {
    wrapper: ` page--gray page--login`,
    main: ` page__main--login`,
  },
  [pageTypes.MAIN]: {
    wrapper: ` page--gray page--main`,
    main: ` page__main--index`,
  },
  [pageTypes.MAIN_EMPTY]: {
    wrapper: ` page--gray page--main`,
    main: ` page__main--index page__main--index-empty`,
  },
  [pageTypes.OFFER]: {
    wrapper: ``,
    main: ` page__main--property`,
  },
};

const Page = (props) => {
  const {type, header, content} = props;

  return <div className={`page${type ? cssClass[type].wrapper : ``}`}>
    {header}
    <main className={`page__main${type ? cssClass[type].main : ``}`}>
      {content}
    </main>
  </div>;
};

Page.propTypes = {
  type: PropTypes.oneOf(Object.keys(pageTypes)),
  header: PropTypes.element,
  content: PropTypes.element,
};

export default Page;
