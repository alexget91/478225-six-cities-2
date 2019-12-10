import React from "react";
import PropTypes from "prop-types";
import {PageType} from "../../common/constants";
import ErrorMessage from "../error-message/error-message";
import {Link} from "react-router-dom";
import Path from "../../common/path";

const CSSclass = {
  [PageType.FAVORITES]: {
    wrapper: ``,
    main: ` page__main--favorites`,
  },
  [PageType.FAVORITES_EMPTY]: {
    wrapper: ` page--favorites-empty`,
    main: ` page__main--favorites page__main--favorites-empty`,
  },
  [PageType.LOGIN]: {
    wrapper: ` page--gray page--login`,
    main: ` page__main--login`,
  },
  [PageType.MAIN]: {
    wrapper: ` page--gray page--main`,
    main: ` page__main--index`,
  },
  [PageType.MAIN_EMPTY]: {
    wrapper: ` page--gray page--main`,
    main: ` page__main--index page__main--index-empty`,
  },
  [PageType.OFFER]: {
    wrapper: ``,
    main: ` page__main--property`,
  },
};

const Page = (props) => {
  const {type, header, content, error, onErrorClose} = props;

  return <div className={`page${type ? CSSclass[type].wrapper : ``}`}>
    {header}
    {error ? <ErrorMessage error={error} onCloseClick={onErrorClose}/> : null}
    <main className={`page__main${type ? CSSclass[type].main : ``}`}>
      {content}
    </main>
    {type === PageType.FAVORITES || type === PageType.FAVORITES_EMPTY ?
      <footer className="footer container">
        <Link className="footer__logo-link js-link-index" to={Path.INDEX}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer> : null}
  </div>;
};

Page.propTypes = {
  type: PropTypes.oneOf(Object.keys(PageType)),
  header: PropTypes.element,
  content: PropTypes.element,
  error: PropTypes.string,
  onErrorClose: PropTypes.func,
};

export default Page;
