import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';
import 'antd/dist/antd.variable.css';
import './MenuBar.css';

import { Menu, Button, Divider } from 'antd';
import type { MenuProps } from 'antd';
import Icon, {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BuildOutlined,
  CalendarOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  UserOutlined,
  AlignLeftOutlined,
} from '@ant-design/icons';

import { AppState, AppDispatch } from 'src/Root';
import { setCollapsed, setDesireCollapsed } from 'reducer/menuBar/menuBarSlice';
import SVG from 'resources/Q.svg';
import { increment } from '../reducer/blog/blogSlice';

export const SIDEMENU_COLLAPSED_SIZE = 90;
export const SIDEMENU_EXPANDED_SIZE = 200;
const Q_ICON_MARGIN = 20;

const mapStateToProps = (state: AppState) => ({
  pathname: state.router.location.pathname,
  collapsed: state.menuBar.collapsed,
});

function mapDispatchToProps(dispatch : AppDispatch) {
  return {
    dispatch,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  windowHeight: number
};

type State = {
  depric: boolean,
};

class MenuBar extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      depric: false,
    };
  }

  getMenuItem = (
    label: React.ReactNode,
    key: React.Key,
    icon: React.ReactNode,
    children?: React.ReactNode[],
  ) => (
    <Menu.Item
      key={key}
      icon={icon}
    >
      { label }
    </Menu.Item>
  );

  toggleCollapsed = () => {
    const { dispatch, collapsed } = this.props;

    const result = !collapsed;

    dispatch(increment({}));
    dispatch(setCollapsed({ collapsed: result }));
    dispatch(setDesireCollapsed({ desireCollapsed: result }));

    // dispatch(setMenuBarState(!collapsed
    //   ? { collapsed: true, desireCollapsed: true }
    //   : { collapsed: false, desireCollapsed: false }));
  };

  openLinkInNewTab = (key: string) => {
    if (key === 'github') {
      window.open('https://github.com/qld2');
    } else if (key === 'linkedin') {
      window.open('https://www.linkedin.com/in/qld2/');
    } else if (key === 'mail') {
      window.open('mailto:qdonovan6@gmail.com');
    }
  };

  handleLinkClick = (e: any) => {
    // const id = e.target.id !== '' ? e.target.id : e.target.datamap.icon;
    let id;

    if (e.target.id) id = e.target.id;
    else if (e.target.dataset.icon) id = e.target.dataset.icon;
    else if (e.target.parentNode.dataset.icon) id = e.target.parentNode.dataset.icon;

    this.openLinkInNewTab(id);
  };

  handleLinkKey = (e: any) => {
    if (e.key === 'Enter') this.openLinkInNewTab(e.target.id);
  };

  onClick = (e: any) => {
    const { dispatch } = this.props;
    dispatch(push(`/${e.key}`));
  };

  getLinkIconSize = () => {
    const { windowHeight } = this.props;

    if (windowHeight < 560) return 25;

    return 50;
  };

  render(): React.ReactNode {
    const { pathname, collapsed } = this.props;

    const fontSizeQ = collapsed
      ? SIDEMENU_COLLAPSED_SIZE - 2 * Q_ICON_MARGIN
      : SIDEMENU_EXPANDED_SIZE - 2 * Q_ICON_MARGIN;
    const width = collapsed ? SIDEMENU_COLLAPSED_SIZE : SIDEMENU_EXPANDED_SIZE;
    const fontSizeButtons = this.getLinkIconSize();

    return (
      <div className="MenuBar" style={{ width }}>
        <div className="MenuBarIconHolder">
          <Icon
            className="MenuBarIcon"
            style={{ fontSize: fontSizeQ, color: '#001529', fillOpacity: 1 }}
            component={SVG}
          />

        </div>
        <div className="MenuBarBottom">
          <div className="MenuBarMenu">
            <Button
              className="Button"
              type="primary"
              onClick={this.toggleCollapsed}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <div className="MenuBarDivider" />
            <Menu
              className="Menu"
              style={{ width, backgroundColor: 'transparent' }}
              theme="dark"
              mode="inline"
              selectedKeys={[pathname.substring(1)]}
              inlineCollapsed={collapsed}
              onClick={this.onClick}
            >
              { this.getMenuItem('Introduction', 'Introduction', <UserOutlined />) }
              { this.getMenuItem('Portfolio', 'Portfolio', <BuildOutlined />) }
              { this.getMenuItem('Blog', 'Blog', <AlignLeftOutlined />) }
              { this.getMenuItem('Contact', 'Contact', <CalendarOutlined />) }
            </Menu>
          </div>

          <div
            className="Links"
          >
            <div
              className="MenuBarLink"
              style={{ marginBottom: '5px' }}
              onClick={this.handleLinkClick}
              onKeyPress={this.handleLinkKey}
              role="link"
              id="github"
              tabIndex={0}
            >
              <GithubOutlined
                style={{ fontSize: fontSizeButtons, color: '#001529' }}
                // style={{ fontSize: fontSizeButtons, color: '#001529' }}
              />
            </div>

            <div
              className="MenuBarLink"
              onClick={this.handleLinkClick}
              onKeyPress={this.handleLinkKey}
              role="link"
              id="linkedin"
              tabIndex={0}
            >
              <LinkedinOutlined
                style={{ fontSize: fontSizeButtons + 4, color: '#001529' }}
              />
            </div>

            <div
              className="MenuBarLink"
              onClick={this.handleLinkClick}
              onKeyPress={this.handleLinkKey}
              role="link"
              id="mail"
              tabIndex={0}
            >
              <MailOutlined
                style={{ fontSize: fontSizeButtons + 4, color: '#001529' }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connector(MenuBar);
