import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';

import 'antd/dist/antd.variable.css';
import './ConstructionModal.css';

import { Modal } from 'antd';

import type {
  AppState, AppDispatch,
} from 'src/Root';

import { SIDEMENU_COLLAPSED_SIZE, SIDEMENU_EXPANDED_SIZE } from 'components/MenuBar';
import Icon from '@ant-design/icons';
import Cone from './cone.svg';

type Props = {
};

type State = {
  open: boolean,
};

class ConstructionModal extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      open: true,
    };
  }

  render() {
    const { open } = this.state;

    return (
      <div
        className="ConstructionModal"
      >
        <Modal
        //   className="ConstructionModalModal"
          style={{ backgroundColor: 'rgb(224, 221, 31)' }}
          title={(
            <div className="ConstructionModalTitle">
              <Icon style={{ fontSize: '30px', marginRight: '10px', color: 'rgb(216, 112, 15)' }} component={Cone} />
              Under Construction
            </div>
          )}
          centered
          open={open}
          footer={null}
          onCancel={() => this.setState({ open: false })}
        >
          This page is still under construction. Novel designs are in the works.
        </Modal>
      </div>
    );
  }
}

export default ConstructionModal;
