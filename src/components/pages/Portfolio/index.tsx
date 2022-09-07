import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';

import 'antd/dist/antd.variable.css';
import './Portfolio.css';

import type {
  AppState, AppDispatch,
} from 'src/Root';

import { SIDEMENU_COLLAPSED_SIZE, SIDEMENU_EXPANDED_SIZE } from 'components/MenuBar';
import ConstructionModal from '../../displays/ConstructionModal';

const mapStateToProps = (state: AppState) => ({
  width: state.applet.width,
  height: state.applet.height,
  menuWidth: state.menuBar.collapsed
    ? SIDEMENU_COLLAPSED_SIZE : SIDEMENU_EXPANDED_SIZE,
});

function mapDispatchToProps(dispatch : AppDispatch) {
  return {
    dispatch,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
};

type State = {
  counter: number,
};

class Portfolio extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  render(): React.ReactNode {
    const { width, height } = this.props;

    return (
      <div
        className="Portfolio"
        style={{ width, height }}
      >
        <ConstructionModal />
      </div>
    );
  }
}

export default connector(Portfolio);
