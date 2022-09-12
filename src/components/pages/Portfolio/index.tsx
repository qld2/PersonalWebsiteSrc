import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';
import ReactMarkdown from 'react-markdown';

import 'antd/dist/antd.variable.css';
import './Portfolio.css';

import type {
  AppState, AppDispatch,
} from 'src/Root';

import { SIDEMENU_COLLAPSED_SIZE, SIDEMENU_EXPANDED_SIZE } from 'components/MenuBar';
import { Menu } from 'antd';
import ConstructionModal from '../../displays/ConstructionModal';

import Projects from './projects.json';
import getFileAsString from './parseMD';

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
  currentProject: number,
  ex: string
};

class Portfolio extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      currentProject: 0,
      ex: '',
    };
  }

  getMenuItems = ():JSX.Element[] => {
    const result:JSX.Element[] = [];

    Projects.projects.forEach((project) => result.push(
      <Menu.Item
        key={project.key}
      >
        {project.title}
      </Menu.Item>,
    ));

    return result;
  };

  getCurrentProject = ():JSX.Element => {
    getFileAsString('https://raw.githubusercontent.com/qld2/PersonalWebsiteSrc/main/README.md',
      (result:string) => { this.setState({ ex: result }); });

    const { ex } = this.state;

    return (
      <div className="PortfolioReadmeDisplay">
        <ReactMarkdown>{ ex }</ReactMarkdown>
      </div>
    );
  };

  render(): React.ReactNode {
    const { width, height, menuWidth } = this.props;

    const appletWidth = width - menuWidth;
    const margin = 50;
    const projectMenuWidth = 200;

    // console.log(Projects);

    return (
      <div
        className="Portfolio"
        style={{ width: appletWidth, height }}
      >
        {/* <ConstructionModal /> */}

        <div
          className="PortfolioCard"
          style={{ width: appletWidth - margin, height: height - margin }}
        >
          <div className="PortfolioDisplaySide">
            <div
              className="PortfolioDisplay"
            >
              { this.getCurrentProject() }
            </div>
          </div>
          <div className="PortfolioMenuSide">
            <div
              className="PortfolioMenu"
            >
              <div className="PortfolioMenuHeader">
                Projects
              </div>
              <div className="PortfolioMenuDivider" />
              <Menu
                className="PortfolioProjectMenu"
                style={{ backgroundColor: 'transparent' }}
                mode="inline"
                theme="dark"
              >
                { this.getMenuItems() }
              </Menu>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connector(Portfolio);
