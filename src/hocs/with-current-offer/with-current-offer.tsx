import * as React from "react";
import {getOfferByID} from "../../reducer/data/selectors/selectors";
import {getNearPlaces} from "../../common/utils";
import {PlaceCard, PlaceList} from "../../common/types";

type Params = {
  id?: string,
  [propName: string]: any,
};

type Match = {
  params?: Params,
  [propName: string]: any,
};

interface Props {
  match?: Match,
  offers?: PlaceList,
}

interface State {
  offer: PlaceCard,
}

const withCurrentOffer = (Component) => {
  class WithCurrentOffer extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        offer: this._getOffer()
      };

      this._getOffer = this._getOffer.bind(this);
    }

    componentDidUpdate() {
      this.setState({
        offer: this._getOffer()
      });
    }

    render() {
      return <Component
        {...this.props}
        offer={this.state.offer}
        neighbourhood={getNearPlaces(this.props.offers, this.state.offer)}
      />;
    }

    _getOffer() {
      const {offers, match} = this.props;
      return getOfferByID(offers, parseInt(match.params.id, 10));
    }
  }

  return WithCurrentOffer;
};

export default withCurrentOffer;
