import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const PropName = {
  ACTIVE_ITEM: `activeItem`,
  ON_ACTIVE_ITEM_CHANGE: `onActiveItemChange`,
};

const transformPropNames = (newItem, newCallback, props) => {
  const newProps = Object.assign({}, props, {
    [newItem]: props[PropName.ACTIVE_ITEM],
    [newCallback]: props[PropName.ON_ACTIVE_ITEM_CHANGE],
  });

  delete newProps[PropName.ACTIVE_ITEM];
  delete newProps[PropName.ON_ACTIVE_ITEM_CHANGE];

  return newProps;
};

const withActiveItem = (Component, defaultActiveItem) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        [PropName.ACTIVE_ITEM]: defaultActiveItem,
      };

      this._handleActiveItemChange = this._handleActiveItemChange.bind(this);
    }

    render() {
      const newProps = {
        [PropName.ACTIVE_ITEM]: this.state[PropName.ACTIVE_ITEM],
        [PropName.ON_ACTIVE_ITEM_CHANGE]: this._handleActiveItemChange,
      };

      return <Component
        {...this.props}
        {...newProps}
      />;
    }

    _handleActiveItemChange(activeItem) {
      this.setState({activeItem});
    }
  }

  WithActiveItem.propTypes = {
    defaultActiveItem: PropTypes.string
  };

  return WithActiveItem;
};

export {PropName, transformPropNames};

export default withActiveItem;
