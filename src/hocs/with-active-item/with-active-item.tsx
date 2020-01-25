import * as React from "react";
import {AnyProps} from "../../common/types";

enum PropName {
  ACTIVE_ITEM = `activeItem`,
  ON_ACTIVE_ITEM_CHANGE = `onActiveItemChange`,
}

interface Props {
  defaultActiveItem?: string,
}

interface State {
  [PropName.ACTIVE_ITEM]: string,
}


const transformPropNames = (newItem: string, newCallback: string, props: AnyProps): AnyProps => {
  const newProps: AnyProps = Object.assign({}, props, {
    [newItem]: props[PropName.ACTIVE_ITEM],
    [newCallback]: props[PropName.ON_ACTIVE_ITEM_CHANGE],
  });

  delete newProps[PropName.ACTIVE_ITEM];
  delete newProps[PropName.ON_ACTIVE_ITEM_CHANGE];

  return newProps;
};

const withActiveItem = (Component: React.FunctionComponent, defaultActiveItem?): React.ComponentClass => {
  class WithActiveItem extends React.PureComponent<Props, State> {
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

  return WithActiveItem;
};

export {PropName, transformPropNames};

export default withActiveItem;
