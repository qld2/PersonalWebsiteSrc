import React from 'react';
import 'antd/dist/antd.variable.css';
import './MenuBar.css';

import { Menu, Button } from 'antd';
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
} from '@ant-design/icons';

import SVG from 'resources/Q.svg';

export const SIDEMENU_COLLAPSED_SIZE = 90;
export const SIDEMENU_EXPANDED_SIZE = 200;
const Q_ICON_MARGIN = 20;

type Props = {};

type State = {
  collapsed: boolean,
};

class MenuBar extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      collapsed: false,
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
    const { collapsed } = this.state;

    this.setState({
      collapsed: !collapsed,
    });
  };

  render(): React.ReactNode {
    const { collapsed } = this.state;

    const fontSizeQ = collapsed
      ? SIDEMENU_COLLAPSED_SIZE - 2 * Q_ICON_MARGIN
      : SIDEMENU_EXPANDED_SIZE - 2 * Q_ICON_MARGIN;
    const width = collapsed ? SIDEMENU_COLLAPSED_SIZE : SIDEMENU_EXPANDED_SIZE;
    const fontSizeButtons = collapsed ? '50px' : '40px';
    const flexDirection = collapsed ? 'column' : 'row';

    const colorA = 'rgba(255, 0, 0, 1)';

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
            <Menu
              className="Menu"
              style={{ width, backgroundColor: 'transparent' }}
              theme="dark"
              mode="inline"
              inlineCollapsed={collapsed}
            >
              { this.getMenuItem('Introduction', 0, <UserOutlined />) }
              { this.getMenuItem('Portfolio', 1, <BuildOutlined />) }
              { this.getMenuItem('Contact', 2, <CalendarOutlined />) }
            </Menu>
          </div>

          <div
            className="Links"
          >
            <GithubOutlined
              className="Link"
              style={{ fontSize: fontSizeButtons, color: '#001529' }}
              onClick={this.toggleCollapsed}
            />
            <LinkedinOutlined
              className="Link"
              style={{ fontSize: fontSizeButtons, color: '#001529' }}
              onClick={this.toggleCollapsed}
            />
            <MailOutlined
              className="Link"
              style={{ fontSize: fontSizeButtons, color: '#001529' }}
              onClick={this.toggleCollapsed}
            />
          </div>

        </div>
      </div>
    );
  }
}

export default MenuBar;
