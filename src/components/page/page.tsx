import * as React from "react";
import {PageType} from "../../common/constants";
import ErrorMessage from "../error-message/error-message";
import {Link} from "react-router-dom";
import Path from "../../common/path";

interface Props {
  type?: PageType,
  header?: React.ReactElement,
  content?: React.ReactElement,
  error?: string,
  onErrorClose?: () => void,
}

type CSSclass = {
  [name in PageType]: {
    wrapper: string,
    main: string,
  }
};

const CSSclass: CSSclass = {
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

const Page = (props: Props): React.ReactElement => {
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

export default Page;
