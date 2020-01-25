import * as React from "react";
import {SortingOption} from "../../common/constants";

interface Props {
  sort?: SortingOption,
  isVisible?: boolean,
  onSortChange: (sort: string) => void,
  onVisibilityChange: () => void,
}

type Option = {
  [name in SortingOption]: string
};


const Option: Option = {
  [SortingOption.POPULAR]: `Popular`,
  [SortingOption.TO_HIGH]: `Price: low to high`,
  [SortingOption.TO_LOW]: `Price: high to low`,
  [SortingOption.TOP_RATED]: `Top rated first`,
};

class PlacesSortingForm extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);

    this._handleSortItemClick = this._handleSortItemClick.bind(this);
  }

  render() {
    const {isVisible, onVisibilityChange} = this.props;

    const sortKeys = Object.keys(Option);
    const sort = this.props.sort || sortKeys[0];

    return <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>&nbsp;
      <span className="places__sorting-type" tabIndex={0} onClick={onVisibilityChange}>
        {Option[sort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isVisible ? ` places__options--opened` : ``}`}>
        {sortKeys.map((key: string, i: number): React.ReactElement => <li key={i} tabIndex={0} data-sort={key}
          className={`places__option${key === sort ? ` places__option--active` : ``} js-sorting-option`}
          onClick={this._handleSortItemClick}>
          {Option[key]}
        </li>)}
      </ul>
    </form>;
  }

  _handleSortItemClick(evt) {
    this.props.onSortChange(evt.target.dataset.sort);
  }
}

export default PlacesSortingForm;
