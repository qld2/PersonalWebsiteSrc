import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import 'antd/dist/antd.variable.css';
import './Broadcast.css';

import Icon from '@ant-design/icons';
import { PageHeader, Menu, Button } from 'antd';

import { AppState, AppDispatch } from 'src/Root';

const mapStateToProps = (state: AppState) => ({});

function mapDispatchToProps(dispatch : AppDispatch) {
  return {
    dispatch,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  message: string;
};

type State = {
  collapsed: boolean,
};

class Broadcast extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  render(): React.ReactNode {
    const { collapsed } = this.state;
    const { message } = this.props;

    return (
      <div className="Broadcast">
        <div className="BroadcastMessage">
          {message}
        </div>
      </div>
    );
  }
}

export default connector(Broadcast);
