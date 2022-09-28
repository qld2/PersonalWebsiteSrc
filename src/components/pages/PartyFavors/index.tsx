import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

import 'antd/dist/antd.variable.css';
import './PartyFavors.css';

import { AppState, AppDispatch } from 'src/Root';
import {
  Button, Input, InputNumber, Menu, Spin,
} from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

import { SIDEMENU_COLLAPSED_SIZE, SIDEMENU_EXPANDED_SIZE } from 'components/MenuBar';
import ParametricCanvas from '../../displays/ParametricGrapher';

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
  currentApplet: number,
};

class PartyFavors extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      currentApplet: 1,
    };
  }

  getProjectDisplay = ():JSX.Element => (
    <div className="PartyFavorsDisplay">
      <div className="PartyFavorsDisplayTop">
        <div className="PartyFavorsDisplayTopTitle">
          afdasdasd
        </div>
        <a
          className="PartyFavorsDisplayTopLink"
          href="google.com"
        >
          google.com
        </a>
      </div>
      <div className="PartyFavorsDisplayBottom">
        <ParametricCanvas
          width={800}
          height={500}
        />
      </div>
    </div>
  );

  render(): React.ReactNode {
    const { width, height, menuWidth } = this.props;
    const { currentApplet } = this.state;

    const appletWidth = width - menuWidth;
    const margin = 50;
    const projectMenuWidth = 200;

    return (
      <div
        className="PartyFavors"
        style={{ width: appletWidth, height }}
      >
        {/* <ConstructionModal /> */}

        <div
          className="PartyFavorsCard"
          style={{ width: appletWidth - 2 * margin, height: height - 2 * margin }}
        >
          <div className="PartyFavorsDisplaySide">
            { this.getProjectDisplay() }
          </div>
          <div className="PartyFavorsMenuSide">
            <div
              className="PartyFavorsMenu"
              style={{ marginLeft: margin }}
            >
              <div className="PartyFavorsMenuHeader">
                Projects
              </div>
              <div className="PartyFavorsMenuDivider" />
              <Menu
                className="PartyFavorsAppletMenu"
                style={{ backgroundColor: 'transparent' }}
                mode="inline"
                theme="dark"
                // selectedKeys={[""]}
                // onClick={this.onClick}
              >
                {/* { this.getMenuItems() } */}
              </Menu>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connector(PartyFavors);
