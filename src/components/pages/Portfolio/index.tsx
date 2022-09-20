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
import { Menu, Spin } from 'antd';
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
  currentProject: string,
  readMe: string | undefined
};

class Portfolio extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      currentProject: 'None',
      readMe: undefined,
    };
  }

  componentDidMount(): void {
    this.setProject('0');
  }

  setProject = (key: string) => {
    this.setState({
      currentProject: key,
      readMe: undefined,
    });

    const readMeLocation = Projects.projects.find((element) => element.key === key)?.readMe;

    if (readMeLocation) {
      getFileAsString(readMeLocation,
        (result:string) => { this.setState({ readMe: result }); });
    }
  };

  onClick = (e: any) => {
    this.setProject(e.key);
  };

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

  getProjectDisplay = ():JSX.Element => {
    const { readMe, currentProject } = this.state;

    const project = Projects.projects.find((element) => element.key === currentProject);

    return (
      <div className="PortfolioDisplay">
        <div className="PortfolioDisplayTop">
          <div className="PortfolioDisplayTopTitle">
            { project?.title }
          </div>
          <a
            className="PortfolioDisplayTopLink"
            href={project?.github}
          >
            {project?.github}
          </a>
        </div>
        <div className="PortfolioDisplayBottom">
          <div className="PortfolioReadmeDisplay">
            {
              readMe
                ? <ReactMarkdown>{ readMe }</ReactMarkdown>
                : (
                  <div className="PortfolioReadmeDisplaySpin">
                    <Spin size="large" />
                  </div>
                )
            }
          </div>
        </div>
      </div>
    );
  };

  render(): React.ReactNode {
    const { width, height, menuWidth } = this.props;
    const { currentProject } = this.state;

    const appletWidth = width - menuWidth;
    const margin = 50;
    const projectMenuWidth = 200;

    return (
      <div
        className="Portfolio"
        style={{ width: appletWidth, height }}
      >
        {/* <ConstructionModal /> */}

        <div
          className="PortfolioCard"
          style={{ width: appletWidth - 2 * margin, height: height - 2 * margin }}
        >
          <div className="PortfolioDisplaySide">
            { this.getProjectDisplay() }
          </div>
          <div className="PortfolioMenuSide">
            <div
              className="PortfolioMenu"
              style={{ marginLeft: margin }}
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
                selectedKeys={[currentProject]}
                onClick={this.onClick}
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
