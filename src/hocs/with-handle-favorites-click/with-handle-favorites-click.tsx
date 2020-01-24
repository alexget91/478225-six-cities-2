import * as React from "react";
import {PlaceCard} from "../../common/types";

interface Props {
  offer: PlaceCard,
  onFavoritesClick?: (offerId: number, isFavorite: boolean) => void,
  [propName: string]: any,
}

const withHandleFavoritesClick = (Component) => {
  class WithHandleFavoritesClick extends React.PureComponent<Props, null> {
    constructor(props) {
      super(props);

      this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onFavoritesClick={this._handleFavoritesClick}
      />;
    }

    _handleFavoritesClick() {
      const {offer, onFavoritesClick} = this.props;
      onFavoritesClick(offer.id, offer.is_favorite);
    }
  }

  return WithHandleFavoritesClick;
};

export default withHandleFavoritesClick;
