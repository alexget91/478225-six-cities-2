import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {placeList} from "../../common/global-prop-types";
import {getOfferByID} from "../../reducer/data/selectors/selectors";
import {getNearPlaces} from "../../common/utils";

const withCurrentOffer = (Component) => {
  class WithCurrentOffer extends PureComponent {
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

  WithCurrentOffer.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    }),
    offers: placeList,
  };

  return WithCurrentOffer;
};

export default withCurrentOffer;
