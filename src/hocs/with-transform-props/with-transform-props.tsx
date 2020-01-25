import * as React from "react";
import {AnyProps} from "../../common/types";

interface TransformFunc {
  (...props: any): AnyProps
}

const withTransformProps = (transformFunc: TransformFunc) =>
  (Component: React.ComponentType<AnyProps>): React.FunctionComponent<AnyProps> => {
    const WithTransformProps = (props: AnyProps) => {
      const newProps = transformFunc(props);
      return <Component {...newProps} />;
    };

    return WithTransformProps;
  };

export default withTransformProps;
